import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, messageThreadStyles } from './Styles.js';
const io = require('socket.io-client');
import { NavBack } from './TopNav.js';
import { getMessages, sqlToJsDate } from './API.js';


export default class ViewMessageThread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      conversation: [],
      messages: [],
      client: {},
      socket: ''
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  async componentDidMount() {
    var conversation = this.props.route.params.conversation;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var messages = await getMessages(conversation.Id, client.Token);
    this.configureSocket();
    console.log("Convo:",conversation);
    console.log("Messages:",messages);
    this.setState({conversation:conversation,messages:messages,client:client})
  }

  configureSocket = () => {
    var socket = io("https://messages.coachsync.me/");
    socket.on('incoming-message', () => {
      this.refreshConversations();
    });
    this.setState({socket:socket});
  }

  showInput() {
    return (<View></View>);
  }

  filterUser = (id) => {
    return function (response) {
      return response.Id === id
    }
  }

  render() {

    var { conversation, messages, client } = this.state;

    if (this.state.refreshing == true) {
      return (<View style={messageThreadStyles.container}>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </View>);
    } else {
      if (messages == false) {
        return (<View style={messageThreadStyles.container}>
          <NavBack goBack={() => this.props.navigation.goBack()} />
          <ScrollView>
            <Text style={messageThreadStyles.noMessagesText}>No messages to display.</Text>
          </ScrollView>
          <View>
            {this.showInput()}
          </View>
        </View>);
      } else {
        return (<View style={messageThreadStyles.container}>
          <NavBack goBack={() => this.props.navigation.goBack()} />
          <ScrollView>
            {messages.map((message, i) => {
              var messageUser = conversation.Users[0].filter(this.filterUser(message.UserId));
              if (message.UserId == client.Id) {
                return (<TouchableOpacity key={i} onLongPress={this.showLongPressOptions()}>
                  <View></View>
                </TouchableOpacity>);
              } else {
                return (<TouchableOpacity key={i} style={messageThreadStyles.myMessageGroup} onLongPress={this.showLongPressOptions()}>
                  <View style={messageThreadStyles.myMessage}>
                    {message.Text}
                  </View>
                  <View style={messageThreadStyles.myAvatar}>
                    <Animated.Image
                      onLoad={this.onLoad}
                      source={{ uri: messageUser.Avatar }}
                      resizeMode="cover"
                      style={{
                        opacity: this.state.opacity,
                        flex:1,
                        width:60,
                        height:60,
                        borderRadius:100,
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
                  </View>
                </TouchableOpacity>);
              }
            })}
          </ScrollView>
          <View>
            {this.showInput()}
          </View>
        </View>);
      }
    }

  }

}
