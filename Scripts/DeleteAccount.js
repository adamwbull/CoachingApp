import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import { NavBack } from './TopNav.js';
import { loginCheck, deleteUser } from '../Scripts/API.js';
import { deleteAccountStyles, colors, windowHeight } from '../Scripts/Styles.js';
import * as Crypto from 'expo-crypto';

//
export default class DeleteAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      password:'',
      client: {},
      errorText: ''
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    this.setState({refreshing:false,client:client});
  }

  onChange(text) {
    this.setState({errorText:'',password:text});
  }

  async handlePress() {
    var { password, client } = this.state;

    password = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    if (password === client.Password) {
      Alert.alert(
        "Last chance...",
        'Tap Delete if you are 100% sure you want to delete your account. This cannot be undone!',
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate('ClientProfile'),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => this.delete(password, client),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.props.navigation.navigate('ClientProfile'),
        }
      );
    } else {
      this.setState({errorText:'Incorrect password supplied!'});
    }
  }

  async delete(password, client) {
    var deleted = await deleteUser(client.Id, client.Token, password);
    if (deleted == true) {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Welcome');
    } else {
      Alert.alert(
        "Deletion Failed",
        "There was an error connecting to the CoachSync servers. Please try again later, or reach out to support if this issue continues.",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate('ClientProfile'),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.props.navigation.navigate('ClientProfile'),
        }
      );
    }
  }

  render() {

    if (this.state.refreshing === true) {

      return (<View style={deleteAccountStyles.container}>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </View>);

    } else {

      var { password, errorText } = this.state;

      return (<View style={deleteAccountStyles.container}>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{height:windowHeight}}>
          <View style={deleteAccountStyles.form}>
            <Text style={deleteAccountStyles.title}>Delete Account</Text>
            <Text style={deleteAccountStyles.lastUpdatedText}>Once your account is deleted, this action cannot be undone. You will no longer have access to your account and any submitted data will be deleted within 30 days.</Text>
            <Text style={deleteAccountStyles.errorText}>{errorText}</Text>
            <Input
              onChangeText={text => this.onChange(text)}
              value={password}
              keyboardType='default'
              secureTextEntry={true}
              placeholder='Enter current password to confirm...'
              leftIcon={{ type: 'font-awesome', name: 'lock', color:colors.darkGray, size:20 }}
              leftIconContainerStyle={deleteAccountStyles.iconStyle}
            />
            <Button
            title='Delete Account'
            buttonStyle={deleteAccountStyles.submitButton}
            containerStyle={deleteAccountStyles.submitButtonContainer}
            onPress={() => this.handlePress()}/>
          </View>
        </ScrollView>
      </View>);

    }

  }

}
