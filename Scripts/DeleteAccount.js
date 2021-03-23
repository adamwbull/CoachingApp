import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import { NavBack } from './TopNav.js';
import { loginCheck, deleteUser } from '../Scripts/API.js';
import { deleteAccount, colors, windowHeight } from '../Scripts/Styles.js';
import * as Crypto from 'expo-crypto';

//
export default class DeleteAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true
    };
  }

  render() {

    return (<View style={styles.container}>
      <Text>Test!</Text>
    </View>);
  }

}
