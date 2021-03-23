import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, ActivityIndicator, ScrollView, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import { NavBack } from './TopNav.js';
import { sqlToJsDate, parseSimpleDateText, updatePassword, loginCheck, containsSpecialCharacters, hasUpperCase } from '../Scripts/API.js';
import { changePassword, colors, windowHeight } from '../Scripts/Styles.js';
import * as Crypto from 'expo-crypto';

//
export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      email: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      errorText: '',
      lastUpdated: ''
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var date = parseSimpleDateText(sqlToJsDate(client.PasswordLastUpdated));
    this.setState({email:client.Email,refreshing:false,lastUpdated:date});
  }

  onChange(stateItem, text) {
    var state = {};
    state[stateItem] = text;
    state['errorText'] = '';
    this.setState(state);
  }

  async handlePress() {
    var { oldPassword, newPassword, newPasswordConfirm } = this.state;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));

    if (newPassword === newPasswordConfirm) {

      if (newPassword.length >= 10 && containsSpecialCharacters(newPassword) && hasUpperCase(newPassword)) {

        oldPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          oldPassword
        );
        newPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          newPassword
        );
        newPasswordConfirm = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          newPasswordConfirm
        );

        var check = await loginCheck(client.Email, oldPassword);

        if (check === null) {
          this.setState({errorText:'Incorrect current password.'});
        } else {
          var upload = await updatePassword(client.Id, client.Token, newPassword);
          if (upload === true) {
            Alert.alert(
              "Password updated!",
              'Your current password has been changed.',
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
          } else {
            Alert.alert(
              "Update Failed",
              "There was an error connecting to the CoachSync servers. Please try again later.",
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

      } else {
        this.setState({errorText:'New password must be 10+ characters in length, contain at least one special character, and one uppercase character.'});
      }

    } else {
      this.setState({errorText:'New passwords did not match.'});
    }
  }

  render() {

    if (this.state.refreshing === true) {
      return (<View>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </View>);
    } else {

      var { refreshing, oldPassword, newPassword, newPasswordConfirm, errorText, lastUpdated } = this.state;
      var inputs = [
        {
          title: 'Old Password',
          value: oldPassword,
          stateItem: 'oldPassword',
          placeholder: 'Enter current password...',
          icon: 'history'
        },
        {
          title: 'New Password',
          value: newPassword,
          stateItem: 'newPassword',
          placeholder: 'Enter new password...',
          icon: 'lock'
        },
        {
          title: 'Confirm New Password',
          value: newPasswordConfirm,
          stateItem: 'newPasswordConfirm',
          placeholder: 'Confirm new password...',
          icon: 'lock'
        },
      ];

      return (<View>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{height:windowHeight}}>
          <View style={changePassword.form}>
            <Text style={changePassword.title}>Change Password</Text>
            <Text style={changePassword.lastUpdatedText}>Last updated {lastUpdated}</Text>
            <Text style={changePassword.errorText}>{errorText}</Text>
            {inputs.map((item, index) => {
              return (<View key={index} style={changePassword.item}>
                <Input
                  onChangeText={text => this.onChange(item.stateItem, text)}
                  value={item.value}
                  keyboardType='default'
                  secureTextEntry={true}
                  placeholder={item.placeholder}
                  leftIcon={{ type: 'font-awesome', name: item.icon, color:colors.darkGray, size:20 }}
                  leftIconContainerStyle={changePassword.iconStyle}
                />
              </View>);
            })}
            <Button
            title='Submit'
            buttonStyle={changePassword.submitButton}
            containerStyle={changePassword.submitButtonContainer}
            onPress={() => this.handlePress()}/>
          </View>
        </ScrollView>
      </View>);
    }
  }

}
