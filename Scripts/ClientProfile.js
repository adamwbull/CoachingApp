import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Image, Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { clientProfileStyles } from '../Scripts/Styles.js';
import { NavProfileBack } from './TopNav.js';
import { ListItem, Icon } from 'react-native-elements'

export default class ClientProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    this.setState({client:client,refreshing:false});
  }

  render() {

    var client = this.state.client;

    const list = [
      {
        title: 'Update Avatar',
        icon: 'image',
        function: this.props.navigation.navigate('UpdateAvatar');
      },
      {
        title: 'Change Password',
        icon: 'lock-closed',
        function: this.props.navigation.navigate('ChangePassword');
      },
      {
        title: 'Delete Account',
        icon: 'trash',
        function: this.props.navigation.navigate('DeleteAccount');
      }
    ];

    return (<View style={clientProfileStyles.container}>
      <NavProfileBack goBack={() => this.props.navigation.navigate('Prompts')} />
      <View style={clientProfileStyles.avatarContainer}></View>
      <View style={clientProfileStyles.listItems}>
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => item.function}>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      </View>
    </View>);
  }

}
