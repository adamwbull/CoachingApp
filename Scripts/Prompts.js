import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//
export default class Prompts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false
    };
  }

  render() {

    return (<View style={styles.container}>
      <Text>Test!</Text>
    </View>);
  }

}
