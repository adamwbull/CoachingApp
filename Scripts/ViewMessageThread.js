import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Platform, KeyboardAvoidingView, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { colors, btnColors, messageThreadStyles, windowHeight, windowWidth } from './Styles.js';
const io = require('socket.io-client');
import { NavBackCenterText } from './TopNav.js';
import { getMessages, sqlToJsDate, createMessage, parseTime, parseDateText } from './API.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ListItem, Icon, BottomSheet } from 'react-native-elements';
import * as ImageManipulatorOG from 'expo-image-manipulator';

export default class ViewMessageThread extends React.Component {
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
      charsLeft:500,
      charsLeftStyle:[messageThreadStyles.countdown,{color:btnColors.success}],
      firstTimeInDay:''
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
    socket.on('incoming-message', (recepients) => {
      console.log('Socket bounced back');
      var { client } = this.state;
      if (recepients.includes(client.Id)) {
        this.refreshMessages();
      }
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
    if (input.length > 0) {
      var created = await createMessage(client.Token, conversation.Id, client.Id, input);
      if (created == 1) {
        // Check if image needs to be uploaded and associated.
        if (uri != '') {
          var upload = await uploadMessageImage(uri, client.Token);
        }
        // Let everyone know a new message came in.
        var socket = io("https://messages.coachsync.me/");
        var recepients = conversation.Clients.split(',');
        recepients.push(conversation.CoachId);
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
    }
  }

  showSelectedImage() {
    var { uri, imageWidth, imageHeight } = this.state;
    if (uri == '') {
      return (<View></View>);
    } else {
      console.log(windowHeight);
      console.log(imageHeight);
      console.log(imageWidth);
      var height = windowHeight*0.3;
      var width = (height/imageHeight)*imageWidth;
      return (<View style={[messageThreadStyles.selectedImageContainer,{width:width+50,height:height+10}]}>
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
          <View style={messageThreadStyles.removeImage}>
            <Icon
              type='ionicon'
              color={btnColors.danger}
              size={30}
              name='close'
              onPress={() => this.setState({uri:''})}/>
          </View>
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
        titleStyle:{ color:colors.darkGray }
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

  longPressOptions(longPressOptionsVisible) {
    var list = [
      {
        title:'Add Reaction',
        onPress: () => this.pickCameraImage(),
        icon: 'happy',
        iconColor:colors.darkGray,
        titleStyle:{ color:colors.darkGray }
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

  render() {

    var { title, conversation, messages, client, uri, bsVisible, longPressOptionsVisible } = this.state;
    var scrollViewStyle = (uri == '') ? messageThreadStyles.scrollView : messageThreadStyles.scrollViewImagePicked;
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
        return (<KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={messageThreadStyles.container}
            >
          <NavBackCenterText text={title} goBack={() => this.props.navigation.goBack()} />
          <ScrollView contentContainerStyle={scrollViewStyle}>
            <Text style={messageThreadStyles.noMessagesText}>No messages to display.</Text>
          </ScrollView>
          {this.showInput()}
          {this.bottomSheet(bsVisible)}
          {this.longPressOptions(longPressOptionsVisible)}
        </KeyboardAvoidingView>);
      } else {
        return (<KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={messageThreadStyles.container}
            >
          <NavBackCenterText text={title} goBack={() => this.props.navigation.goBack()} />
          <View style={scrollViewStyle}>
            <ScrollView ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
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
                  if (timeInfo.print == true || prevLastMessage.UserId != message.UserId) {
                    showUserDetails = true;
                    paddingTopCalc = {paddingTop:20};
                  }
                  if (message.UserId == client.Id) {
                    return (<View key={i}>
                      {this.showTime(timeInfo)}
                      <View style={[messageThreadStyles.myMessageGroup,paddingTopCalc]}>
                        <View style={messageThreadStyles.myMessageSection}>
                          <View style={messageThreadStyles.myMessage}>
                            <Text style={messageThreadStyles.myMessageText}>{message.Text}</Text>
                          </View>
                        </View>
                      </View>
                    </View>);
                  } else {
                    return (<View key={i}>
                      {this.showTime(timeInfo)}
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
                          <View style={messageThreadStyles.theirMessage}>
                            <Text style={messageThreadStyles.theirMessageText}>{message.Text}</Text>
                          </View>
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
        </KeyboardAvoidingView>);
      }
    }

  }

}
