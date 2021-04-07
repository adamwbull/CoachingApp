import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableHighlight, TouchableOpacity, Modal, Alert, Animated, Platform, KeyboardAvoidingView, TextInput, ScrollView, ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { colors, btnColors, messageThreadStyles, windowHeight, windowWidth } from './Styles.js';
const io = require('socket.io-client');
import { NavBackCenterText } from './TopNav.js';
import { insertReaction, deleteReaction, getMessages, sqlToJsDate, createMessage, uploadMessageImage, parseTime, parseDateText } from './API.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ListItem, Icon, BottomSheet, Button } from 'react-native-elements';
import * as ImageManipulatorOG from 'expo-image-manipulator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiSelector from 'react-native-emoji-selector';

const withHooksHOC = (Component: any) => {
 return (props: any) => {
   const insets = useSafeAreaInsets();

   return <Component insets={insets} {...props} />;
 };
};

interface IHooksHOCProps {
  insets: Object;
}

function AddBorderTop() {
  const insets = useSafeAreaInsets();
  return (<View style={{width:'100%',height:insets.top,backgroundColor:colors.clouds}}></View>)
}

class ViewMessageThread extends React.Component<IHooksHOCProps> {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      conversation: [],
      opacity: new Animated.Value(0),
      messages: [],
      client: {},
      input: '',
      uri: '',
      title:this.props.route.params.title,
      imageWidth:0,
      imageHeight:0,
      bsVisible: false,
      longPressOptionsVisible:false,
      fullImageVisible:false,
      emojiSelectorVisible:null,
      fullImageUri: 'https://coachsync.me/assets/img/logo.png',
      charsLeft:500,
      charsLeftStyle:[messageThreadStyles.countdown,{color:btnColors.success}],
      firstTimeInDay:'',
      borderHeight:0
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  async refreshMessages() {
    var { conversation, client } = this.state;
    var messages = await getMessages(conversation.Id, client.Token);
    this.setState({messages:messages});
  }

  async componentDidMount() {
    var conversation = this.props.route.params.conversation;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var messages = await getMessages(conversation.Id, client.Token);
    this.setState({conversation:conversation,messages:messages,client:client,refreshing:false});
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = io("https://messages.coachsync.me/");
    socket.on('incoming-message', (data) => {
      this.refreshMessages();
    });
  }

  onChangeInput(newText) {
    var left = 0;
    var charsLeftStyle = [messageThreadStyles.countdown,{color:btnColors.success}];
    var { input, charsLeft } = this.state;
    // Set chars left.
    left = 500 - newText.length;
    // Set style.
    if (left <= 10) {
      charsLeftStyle = [messageThreadStyles.countdown,{color:btnColors.danger}];
    } else if (left <= 100) {
      charsLeftStyle = [messageThreadStyles.countdown,{color:btnColors.caution}];
    }
    this.setState({input:newText,charsLeft:left,charsLeftStyle:charsLeftStyle});
  }

  async sendMessage() {
    var { input, client, conversation, uri, messages } = this.state;
    if (input.length > 0 || uri != '') {
      var created = await createMessage(client.Token, conversation.Id, client.Id, input);
      if (created > 1) {
        // Check if image needs to be uploaded and associated.
        if (uri != '') {
          var upload = await uploadMessageImage(uri, client.Token, created);
        }
        // Let everyone know a new message came in.
        var socket = io("https://messages.coachsync.me/");
        var recepients = conversation.Clients.split(',');
        recepients.push(conversation.CoachId.toString());
        socket.emit('sent-message', { recepients:recepients, conversationId:conversation.Id });
        this.setState({input:'',charsLeft:500,uri:'',charsLeftStyle:[messageThreadStyles.countdown,{color:btnColors.success}]});
        this.refreshMessages();
      } else {
        Alert.alert(
          "Server Error",
          "Lost connection to CoachSync. Make sure you are connected to the Internet and try again.",
          [
            {
              text: "OK",
              style: "OK",
            },
          ]
        );
      }
    } else {
      Alert.alert(
        "Incomplete Message",
        "Type something before hitting send!",
        [
          {
            text: "OK",
            style: "OK",
          },
        ]
      );
    }
  }

  showSelectedImage() {
    var { uri, imageWidth, imageHeight } = this.state;
    if (uri == '') {
      return (<View></View>);
    } else {
      var height = windowHeight*0.3;
      var width = (height/imageHeight)*imageWidth;
      if (width > windowWidth) {
        width = windowWidth-90;
        height = (width/imageWidth)*imageHeight;
      }
      return (<View style={[messageThreadStyles.selectedImageContainer,{width:width+50,height:height+10}]}>
        <View style={messageThreadStyles.removeImage}>
          <Icon
            type='ionicon'
            color={btnColors.danger}
            size={30}
            name='close'
            onPress={() => this.setState({uri:''})}/>
        </View>
          <Animated.Image
            onLoad={this.onLoad}
            source={{ uri: uri }}
            resizeMode="cover"
            style={{
              opacity: this.state.opacity,
              flex:1,
              width:width,
              height:height,
              borderRadius:10,
              padding:5,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            }}
          />
        </View>);
    }
  }

  showInput() {
    var { charsLeftStyle, charsLeft, input } = this.state;
    return (<View style={messageThreadStyles.userInput}>
      {this.showSelectedImage()}
      <View style={messageThreadStyles.messageInputContainer}>
          <View style={messageThreadStyles.messageInput}>
            <Icon
              name='image'
              type='ionicon'
              color={colors.darkGray}
              onPress={() => this.setState({bsVisible:true})}
              size={30}
              containerStyle={messageThreadStyles.imageIcon} />
            <TextInput
              style={messageThreadStyles.messageTextInput}
              onChangeText={text => this.onChangeInput(text)}
              value={input}
              placeholder='Enter message...'
              multiline={true}
              maxLength={500}
              textAlignVertical={'top'}
            />
            <Text style={charsLeftStyle}>{charsLeft}</Text>
          </View>
          <TouchableOpacity style={messageThreadStyles.messageInputSend} onPress={() => this.sendMessage()}>
            <Text style={messageThreadStyles.messageInputSendText}>Send</Text>
          </TouchableOpacity>
        </View>
    </View>);
  }

  async scaleImage(imageHeight, imageWidth, uri) {
      var newWidth = 800;
      var newHeight = parseInt((newWidth/imageWidth)*imageHeight);
      var res = await ImageManipulatorOG.manipulateAsync(uri, [{resize:{width:newWidth,height:newHeight}}]);
      this.setState({ uri:res.uri, imageHeight:res.height, imageWidth:res.width, bsVisible:false })
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.scaleImage(result.height, result.width, result.uri);
      }
    }
  };

  pickCameraImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.scaleImage(result.height, result.width, result.uri);
      }
    }
  };

  bottomSheet(bsVisible) {
    var list = [
      {
        title:'Select Image From Gallery',
        onPress: () => this.pickImage(),
        icon: 'image',
        iconColor:colors.darkGray,
        titleStyle:{ color:colors.darkGray },
      },
      {
        title:'Take Photo',
        onPress: () => this.pickCameraImage(),
        icon: 'camera',
        iconColor:colors.darkGray,
        titleStyle:{ color:colors.darkGray }
      },
      {
        title: 'Cancel',
        containerStyle: { backgroundColor: btnColors.danger },
        titleStyle: { color: 'white' },
        iconColor:'white',
        icon:'close',
        onPress: () => this.setState({bsVisible:false}),
      },
    ];

    return (<BottomSheet
      isVisible={bsVisible}
      containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <Icon name={l.icon} type='ionicon' color={l.iconColor} />
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>)
  }

  async createReaction(emoji) {
    var { client, reactionMessageId } = this.state;
    var created = await insertReaction(reactionMessageId, client.Id, emoji, client.Token);
    this.setState({emojiSelectorVisible:false,reactionMessageId:0});
    this.refreshMessages();
  }

  showEmojiSelector(emojiSelectorVisible, top) {
    if (emojiSelectorVisible == true) {
      console.log('made it!~')
      return(<View style={{height:windowHeight*0.5}}>
        <Button
        title='Cancel Reaction'
        buttonStyle={{width:'100%',color:'white',backgroundColor:btnColors.danger}}
        onPress={() => this.setState({emojiSelectorVisible:false})}/>
        <EmojiSelector
            onEmojiSelected={emoji => this.createReaction(emoji)}
            showSearchBar={true}
            showTabs={false}
            showHistory={true}
            showSectionTitles={true}
          />
      </View>);
    }
  }

  longPressOptions(longPressOptionsVisible) {

    var list = [
      {
        title:'Add Reaction',
        onPress: () => this.pickCameraImage(),
        icon: 'happy',
        iconColor:colors.darkGray,
        titleStyle:{ color:colors.darkGray },
        onPress: () => this.setState({emojiSelectorVisible:true,longPressOptionsVisible:false})
      },
      {
        title: 'Cancel',
        containerStyle: { backgroundColor: btnColors.danger },
        titleStyle: { color: 'white' },
        iconColor:'white',
        icon:'close',
        onPress: () => this.setState({longPressOptionsVisible:false}),
      },
    ];

    return (<BottomSheet
      isVisible={longPressOptionsVisible}
      containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <Icon name={l.icon} type='ionicon' color={l.iconColor} />
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>);
  }

  setTimeInfo(firstTimeInDay, cur, prev) {
    var print = false;
    var text = '';
    var textStyle = { width:0, height:0 };
    cur = sqlToJsDate(cur);

    // Determine if anything needs to be printed.
    if (prev == '') {
      print = true;
      firstTimeInDay = cur;
      text = parseDateText(cur);
    } else {
      prev = sqlToJsDate(prev);
      var diffFromPrev = Math.abs(cur - prev);
      var diffFromFirstTime = Math.abs(cur - firstTimeInDay);
      var secondsPrev = parseInt(diffFromPrev/1000);
      var secondsFirstTime = parseInt(diffFromFirstTime/1000);
      if (secondsFirstTime >= 86400) {
        text = parseDateText(cur);
        print = true;
        firstTimeInDay = cur;
      } else if (secondsPrev >= 3600) {
        text = parseTime(cur);
        print = true;
      }
    }


    return { firstTimeInDay, print, text };

  }

  showTime(timeInfo) {
    var { print, text } = timeInfo;
    if (print) {
      return (<View>
        <Text style={messageThreadStyles.time}>{text}</Text>
      </View>);
    } else {
      return (<View></View>);
    }
  }

  findUser(id) {
    return function (response) {
      return response[0].Id === id;
    };
  }

  // Show image in-chat.
  showImage(showImage, isMe, messageId, image, imageStyle) {
    if (showImage) {
      if (isMe) {
        return (<TouchableOpacity style={{flex:1}} activeOpacity={0.7} onPress={() => this.setState({fullImageVisible:true,fullImageUri:image})}>
            <Animated.Image
              onLoad={this.onLoad}
              source={{ uri: image }}
              resizeMode="cover"
              style={[{
                opacity: this.state.opacity,
                flex:1,
                backgroundColor:colors.darkGray,
                transform: [
                  {
                    scale: this.state.opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    })
                  },
                ],
              },imageStyle]}
            />
          </TouchableOpacity>);
      } else {
        return (<TouchableOpacity style={{flex:1}} activeOpacity={0.7} onPress={() => this.setState({fullImageVisible:true,fullImageUri:image})} onLongPress={() => this.setState({longPressOptionsVisible:true, reactionMessageId:messageId})}>
            <Animated.Image
              onLoad={this.onLoad}
              source={{ uri: image }}
              resizeMode="cover"
              style={[{
                opacity: this.state.opacity,
                flex:1,
                backgroundColor:colors.darkGray,
                transform: [
                  {
                    scale: this.state.opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    })
                  },
                ],
              },imageStyle]}
            />
          </TouchableOpacity>);
      }
    } else {
      return (<View></View>);
    }
  }

  // Show fullscreen image.
  displayFullImage(fullImageVisible, fullImageUri) {

    if (fullImageVisible) {
      return(<Modal
        animationType="slide"
        visible={fullImageVisible}
        onRequestClose={() => this.setState({fullImageVisible:false,fullImageUri:'https://coachsync.me/assets/img/logo.png'})}>
        <TouchableOpacity onPress={() => this.setState({fullImageVisible:false,fullImageUri:'https://coachsync.me/assets/img/logo.png'})} activeOpacity={0.7} style={{flex:1}}>
          <Animated.Image
            onLoad={this.onLoad}
            source={{ uri: fullImageUri }}
            resizeMode="cover"
            style={[{
              opacity: this.state.opacity,
              flex:1,
              resizeMode:'contain',
              backgroundColor:colors.darkGray,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            }]}
          />
        </TouchableOpacity>
      </Modal>);
    } else {
      return (<View></View>);
    }

  }

  removeReaction(id, userId, token) {
    console.log('removeReaction');
    Alert.alert(
      "Remove Reaction",
      'Remove your reaction to this message?',
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            var removed = await deleteReaction(id, userId, token);
            if (removed) {
              this.refreshMessages();
            }
          },
          style: "OK",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => this.props.navigation.navigate('ClientProfile'),
      }
    );
  }

  findMatch(emoji) {
    return function (response) {
      return response.Emoji === emoji;
    };
  }

  findUserReaction(userId) {
    return function (response) {
      return response.UserId === userId;
    };
  }

  showReactions(reactions) {
    var len = reactions.length;
    var { client } = this.state;
    if (len > 0) {
      // Item: { Emoji: '', Reactions:[reaction, reaction] }
      var reactionGroups = [];
      for (var i = 0; i < reactions.length; i++) {
        var match = reactionGroups.filter(this.findMatch(reactions[i].Emoji));
        if (match.length > 0) {
          for (var j = 0; j < reactionGroups.length; j++) {
            if (reactionGroups[j].Emoji == reactions[i].Emoji) {
              console.log('made it here');
              reactionGroups[j].Reactions.push(reactions[i]);
            }
          }
        } else {
          reactionGroups.push({ Emoji:reactions[i].Emoji, Reactions:[reactions[i]] });
        }
      }

      return (<View style={messageThreadStyles.reactions}>
        {reactionGroups.map((reactionItem, i) => {
          var key = reactionItem.Emoji;
          var reaction = reactionItem.Reactions.filter(this.findUserReaction(client.Id));
          if (reaction.length > 0) {
            reaction = reaction[0];
            return (<TouchableHighlight onPress={() => this.removeReaction(reaction.Id, client.Id, client.Token)} key={key} style={messageThreadStyles.reactionBox}>
              <View style={messageThreadStyles.reactionBoxInternal}>
                <Text style={messageThreadStyles.reaction}>{reactionItem.Emoji}</Text>
                <Text style={messageThreadStyles.reactionCounter}>{reactionItem.Reactions.length}</Text>
              </View>
            </TouchableHighlight>);
          } else {
            return (<View key={key} style={messageThreadStyles.reactionBox}>
              <View style={messageThreadStyles.reactionBoxInternal}>
                <Text style={messageThreadStyles.reaction}>{reactionItem.Emoji}</Text>
                <Text style={messageThreadStyles.reactionCounter}>{reactionItem.Reactions.length}</Text>
              </View>
            </View>);
          }
        })}
      </View>);
    } else {
      return (<View></View>);
    }
  }

  render() {

    var { title, conversation, messages, client, uri, bsVisible, longPressOptionsVisible, emojiSelectorVisible, fullImageVisible, fullImageUri } = this.state;
    var top = this.props.insets.top;
    var scrollViewStyle = (uri == '') ? {height:windowHeight-120-top} : {height:windowHeight-120-top};
    var lastCreated = '';
    var firstTimeInDay = '';
    var lastMessage = {};
    if (this.state.refreshing == true) {
      return (<View style={messageThreadStyles.container}>
        <NavBackCenterText text={title} goBack={() => this.props.navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </View>);
    } else {
      if (messages == false) {
        return (<SafeAreaView>
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={messageThreadStyles.container}
            >
          <NavBackCenterText text={title} goBack={() => this.props.navigation.goBack()} />
          <ScrollView contentContainerStyle={[scrollViewStyle]}>
            <Text style={messageThreadStyles.noMessagesText}>No messages to display.</Text>
          </ScrollView>
          {this.showInput()}
          {this.bottomSheet(bsVisible)}
        </KeyboardAvoidingView>
      </SafeAreaView>);
      } else {
        return (<SafeAreaView>
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={messageThreadStyles.container}>
          <AddBorderTop />
          <NavBackCenterText text={title} goBack={() => this.props.navigation.goBack()} />
          <View style={[scrollViewStyle]}>
            <ScrollView
              ref={ref => {this.scrollView = ref}}
              onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
              contentContainerStyle={messageThreadStyles.scrollViewStyle}>
              <View style={messageThreadStyles.messagesView}>
                {messages.map((message, i) => {
                  var prevLastMessage = lastMessage;
                  lastMessage = message;
                  var mId = message.UserId;
                  var filt = JSON.parse(JSON.stringify(conversation.Users));
                  var messageUser = filt.filter(this.findUser(mId));
                  var messageTime = parseTime(sqlToJsDate(message.Created));
                  var prevLastCreated = lastCreated;
                  lastCreated = message.Created;
                  var timeInfo = this.setTimeInfo(firstTimeInDay, message.Created, prevLastCreated);
                  firstTimeInDay = timeInfo.firstTimeInDay;
                  var showUserDetails = null;
                  var paddingTopCalc = {};
                  if (timeInfo.print == true || prevLastMessage.UserId != message.UserId || message.Reactions.length > 0) {
                    showUserDetails = true;
                    paddingTopCalc = {paddingTop:20};
                  }

                  // Text/Image calculations.
                  var isMe = (message.UserId == client.Id) ? true : false;
                  var showImage = false;
                  var showText = true;
                  var messageStyle = (isMe) ? messageThreadStyles.myMessage : messageThreadStyles.theirMessage;
                  var messageTextStyle = (isMe) ? messageThreadStyles.myMessageText : messageThreadStyles.theirMessageText;
                  var imageStyle = {};
                  // Determine if there's an image.
                  if (message.Image != '') {
                    // Styling for if there is related Text.
                    showImage = true;
                    imageStyle = (isMe) ? messageThreadStyles.myMessageAnImage : messageThreadStyles.theirMessageAnImage;
                    messageStyle = (isMe) ? messageThreadStyles.myMessageImage : messageThreadStyles.theirMessageImage;
                    messageTextStyle = (isMe) ? messageThreadStyles.myMessageTextImage : messageThreadStyles.theirMessageTextImage;
                    if (message.Text == '') {
                      // Styling for if there isn't related Text.
                      showText = null;
                      imageStyle = (isMe) ? messageThreadStyles.myMessageAnImageSolo : messageThreadStyles.theirMessageAnImageSolo;
                    }
                  }

                  if (isMe) {
                    return (<View key={i}>
                      {this.showTime(timeInfo)}
                      <View style={[messageThreadStyles.myMessageGroup]}>
                        <View style={[messageThreadStyles.myMessageSection,,paddingTopCalc]}>
                          {
                            showText &&
                            (<View style={messageStyle}>
                              <Text style={messageTextStyle}>{message.Text}</Text>
                            </View>)
                          }
                          {this.showImage(showImage, isMe, message.Id, message.Image, imageStyle)}
                          {this.showReactions(message.Reactions)}
                        </View>
                      </View>
                    </View>);
                  } else {
                    console.log()
                    return (<View key={i}>
                      <View style={[messageThreadStyles.theirMessageGroup,paddingTopCalc]}>
                        <View style={messageThreadStyles.theirAvatar}>
                          {
                            showUserDetails &&
                            (<Animated.Image
                              onLoad={this.onLoad}
                              source={{ uri: messageUser[0][0].Avatar }}
                              resizeMode="cover"
                              style={{
                                opacity: this.state.opacity,
                                flex:1,
                                width:50,
                                height:50,
                                borderRadius:100,
                                backgroundColor:colors.darkGray,
                                transform: [
                                  {
                                    scale: this.state.opacity.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [0.85, 1],
                                    })
                                  },
                                ],
                              }}
                            />)
                          }
                        </View>
                        <View style={messageThreadStyles.theirMessageSection}>
                          { showUserDetails &&
                          (<Text style={messageThreadStyles.theirName}>{messageUser[0][0].FirstName + ' ' + messageUser[0][0].LastName}</Text>)}
                          <TouchableOpacity activeOpacity={0.7} style={messageStyle} onLongPress={() => this.setState({longPressOptionsVisible:true, reactionMessageId:message.Id})}>
                            {
                              showText &&
                              (<Text style={messageTextStyle}>{message.Text}</Text>)
                            }
                          </TouchableOpacity>
                          {this.showImage(showImage, isMe, message.Id, message.Image, imageStyle)}
                          {this.showReactions(message.Reactions)}
                        </View>
                      </View>
                    </View>);
                  }
                })}
              </View>
            </ScrollView>
          </View>
          {this.showInput()}
          {this.bottomSheet(bsVisible)}
          {this.longPressOptions(longPressOptionsVisible)}
          {this.showEmojiSelector(emojiSelectorVisible, top)}
          {this.displayFullImage(fullImageVisible, fullImageUri)}
        </KeyboardAvoidingView>
      </SafeAreaView>);
      }
    }

  }

}

export default withHooksHOC(ViewMessageThread);
