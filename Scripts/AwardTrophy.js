import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//
export default class AwardTrophy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      client: client,
      trophy: trophy
    };
  }

  async componentDidMount() {
    var { trophyId, next, client } = this.props.route.params;
    var userUpdate = await updateTrophyAssoc(client.Id, trophyId);
    var trophy = await getTrophy(trophyId);
    if (userUpdate) {
      this.setState({client:client,trophy:trophy,refreshing:false});
    } else {
      this.props.navigation.navigate(next);
    }
  }

  render() {

    var { refreshing, client, trophy } = this.state;
    if (refreshing) {
      return (<SafeAreaView style={styles.container}>
      </SafeAreaView>);
    } else {
      return (<SafeAreaView style={styles.container}>
      </SafeAreaView>);
    }
  }

}
