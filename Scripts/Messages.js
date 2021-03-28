import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, TouchableOpacity, AsyncStorage, ScrollView, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, messagesStyles } from './Styles.js';
import { getConversations, sqlToJsDate, getTimeSince } from './API.js';
import { NavProfileRight } from './TopNav.js';
const io = require('socket.io-client');

//
export default class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      opacity: new Animated.Value(0),
      conversations: [],
      socket: null,
      client: {}
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  componentDidMount() {
    this.refreshConversations();
    console.log('Mounting socket...');
    this.configureSocket();
  }

  async refreshConversations() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var conversations = await getConversations(coach.Id, client.Id, client.Token);
    this.setState({refreshing:false,conversations:conversations,client:client});
  }

  configureSocket = () => {
    var socket = io("https://messages.coachsync.me/");
    socket.on('get-conversations', () => {
      this.refreshConversations();
    });
  }

  render() {

    var { refreshing, conversations, client } = this.state;

    if (conversations.length === 0) {
      return (<View style={messagesStyles.container}>
        <NavProfileRight navRight={() => this.props.navigation.navigate('ClientProfile')} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </View>);
    } else {
      return (<View style={messagesStyles.container}>
        <NavProfileRight navRight={() => this.props.navigation.navigate('ClientProfile')} />
        <ScrollView contentContainerStyle={messagesStyles.scrollView}>
          {conversations.map((convo, i) => {
            // Build info for conversation.
            var lastSenderId = (convo.LastSenderId == 0 || convo.LastSenderId == client.Id) ? convo.CoachId : convo.LastSenderId;
            var lastSender = convo.Users[0].filter((lastSenderId) => { return function (response) { return response.Id === lastSenderId}});
            lastSender = lastSender[0];
            var lastSenderMessage = (convo.LastSenderMessage == '') ? 'No messages yet.' : lastSender.FirstName + ': ' + convo.LastSenderMessage.substring(0,10) + '...';
            var lastSenderName = lastSender.FirstName + ' ' + lastSender.LastName;
            var totalMembers = convo.Users.length;
            if (totalMembers > 2) {
              lastSenderName = convo.Users[0][0].FirstName + ', ' + convo.Users[1][0].FirstName;
              var iterator = 0;
              var usersFound = 0;
              var otherMembers = totalMembers - 3;
              while (iterator < totalMembers) {
                if (convo.Users[iterator][0].Id != client.Id) {
                  if (usersFound == 0) {
                    lastSenderName = convo.Users[iterator][0].FirstName + ', ';
                  } else {
                    // How many extra people are there?
                    if (usersFound == 1) {
                      lastSenderName = lastSenderName + convo.Users[iterator][0].FirstName;
                    } else {
                      lastSenderName = lastSenderName + ', ' + otherMembers + ' more';
                      iterator = totalMembers;
                    }
                  }
                  iterator++;
                  usersFound++;
                } else {
                  iterator++;
                }
              }
            }
            // Calculate time since last message.
            var cur = new Date();
            var created =sqlToJsDate(convo.LastSenderCreated);
            var convoTime = getTimeSince(Math.abs(cur - created));

            return(<TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewMessageThread', { conversation: convo })}style={messagesStyles.convo}>
              <View style={messagesStyles.convoAvatar}>
                <Animated.Image
                  onLoad={this.onLoad}
                  source={{ uri: lastSender.Avatar }}
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
              <View style={messagesStyles.convoInfo}>
                <View style={messagesStyles.convoInfoTop}>
                  <Text style={messagesStyles.lastSender}>{lastSenderName}</Text>
                  <Text style={messagesStyles.convoTime}>{convoTime}</Text>
                </View>
                <Text style={messagesStyles.lastMessage}>{lastSenderMessage}</Text>
              </View>
            </TouchableOpacity>);
          })}
        </ScrollView>
      </View>);
    }
  }

}
