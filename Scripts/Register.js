import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, TouchableOpacity, Animated, Image, ScrollView, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerStyles, colorsPerm } from '../Scripts/Styles.js';
import { Button, Input } from 'react-native-elements';
import * as Crypto from 'expo-crypto';
import { refreshUser, key, createAccount, parseDateText, parseSimpleDateText, validateEmail, emailCheck, containsSpecialCharacters, hasUpperCase } from '../Scripts/API.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0),
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob:'',
      dobText: 'Set birth date...',
      dobTextStyle:registerStyles.dobTextPlaceholder,
      modalVisible:false,
      errors:[]
    };
  }

  componentDidMount = () => AsyncStorage.getItem('Client').then((val) => this.handleValue(val));

  async handleValue(val) {
    if (val !== null) {
      var client = JSON.parse(val);
      if (client.OnboardingCompleted == 0) {
        this.props.navigation.navigate('OnboardingSurvey');
      } else {
        this.props.navigation.navigate('Main');
      }
    }
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  onChange(input, text) {
    if (input == 0) {
      this.setState({email:text,errors:[]});
    } else if (input == 1) {
      this.setState({password:text,errors:[]});
    } else if (input == 2) {
      this.setState({confirmPassword:text,errors:[]});
    } else if (input == 3) {
      this.setState({firstName:text,errors:[]});
    } else if (input == 4) {
      this.setState({lastName:text,errors:[]});
    }
  }

  async handlePress () {

    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email.toLowerCase();
    var password = this.state.password;
    var confirmPassword = this.state.password;
    var dob = this.state.dob;
    var errors = [];

    // Verify email.
    if (!validateEmail(email)) {
      errors.push("Invalid email supplied.")
    } else {
      // Check if email is already taken.
      var emailTaken = await emailCheck(email);
      if (emailTaken == true) {
        errors.push('Email is already taken.');
      }
    }

    // Verify password safety.
    if (password.length < 10 || !containsSpecialCharacters(password) || !hasUpperCase(password)) {
      errors.push('Password must be 10+ characters in length, contain at least one special character, and one uppercase character.');
    }

    // Verify dob and name field are set.
    if (dob === '' || firstName === '' || lastName === '' || email === '') {
      errors.push('Please fill out all fields.');
    }

    // Verify passwords match.
    if (password != confirmPassword) {
      errors.push('Passwords must match!');
    }

    // Create user.
    if (errors.length == 0) {

      // Create secure hashes.
      var password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      var created = new Date();

      var token = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password + parseDateText(created)
      );

      var avatar = 'https://coachsync.me/assets/img/default.png';

      var pad = function(num) { return ('00'+num).slice(-2) };
      dob = dob.getUTCFullYear()         + '-' +
            pad(dob.getUTCMonth() + 1)  + '-' +
            pad(dob.getUTCDate())       + ' ' +
            pad(dob.getUTCHours())      + ':' +
            pad(dob.getUTCMinutes())    + ':' +
            pad(dob.getUTCSeconds());

      var expoPushToken = await registerForPushNotificationsAsync();

      var client = {Token:token, ExpoPushToken:expoPushToken, FirstName:firstName, LastName:lastName, Email:email, Avatar:avatar, Password:password, DoB:dob, APIKey:key}

      var passed = await createAccount(client);

      if (passed == null) {
        console.log('Creation failed.');
        errors.push('Server connection failed. Please try again.');
        this.setState({errors:errors});
      } else {
        client = await refreshUser(client.Token);
        await AsyncStorage.setItem('Client', JSON.stringify(client));
        console.log("Creation completed.");
        this.props.navigation.navigate('CoachIdCheck', { name: firstName, id: passed, token: token });
      }

    } else {

      this.setState({errors:errors});

    }

  }

  handleDateConfirm(date) {
    var dobText = parseSimpleDateText(date);
    this.setState({dob:date,dobText:dobText,dobTextStyle:registerStyles.dobTextMain});
    this.hideModal();
  }

  showModal() {
    this.setState({modalVisible:true});
  };

  hideModal() {
    this.setState({modalVisible:false});
  };

  render() {

    const dobInput = React.createRef();

    return (<ScrollView style={registerStyles.trueContainer}>
      <Animated.Image
        onLoad={this.onLoad}
        source={require('../assets/coachsync-logo-dark.png')}
        resizeMode="contain"
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          registerStyles.image
        ]}
      />
      <View style={registerStyles.actualContainer}>
        <Text style={registerStyles.mainTitle}>Register Account</Text>
        <View style={registerStyles.errorsContainer}>
        {this.state.errors.map((error, index) => {
          return (<Text key={index} style={registerStyles.errorText}>{error}</Text>)
        })}</View>
        <Input
          onChangeText={text => this.onChange(3, text)}
          label='First Name'
          leftIcon={{ type: 'font-awesome', name: 'user-circle', color:colorsPerm.darkGray }}
          placeholder='First...'
          leftIconContainerStyle={registerStyles.inputContainerName}
          value={this.state.firstName}
          keyboardType='default'
        />
        <Input
          onChangeText={text => this.onChange(4, text)}
          label='Last Name'
          leftIcon={{ type: 'font-awesome', name: 'user-circle', color:colorsPerm.darkGray }}
          placeholder='Last...'
          leftIconContainerStyle={registerStyles.inputContainerName}
          value={this.state.lastName}
          keyboardType='default'
        />
        <Input
          onChangeText={text => this.onChange(0, text)}
          label='Email Address'
          leftIcon={{ type: 'font-awesome', name: 'envelope-square', color:colorsPerm.darkGray }}
          placeholder='you@example.com'
          leftIconContainerStyle={registerStyles.inputContainerEmail}
          value={this.state.email}
          keyboardType='email-address'
        />
        <Input
          onChangeText={text => this.onChange(1, text)}
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color:colorsPerm.darkGray }}
          placeholder='Password...'
          leftIconContainerStyle={registerStyles.inputContainer}
          value={this.state.password}
          secureTextEntry={true}
          keyboardType='default'
        />
        <Input
          onChangeText={text => this.onChange(2, text)}
          label='Confirm Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color:colorsPerm.darkGray }}
          placeholder='Confirm Password...'
          leftIconContainerStyle={registerStyles.inputContainer}
          value={this.state.confirmPassword}
          secureTextEntry={true}
          keyboardType='default'
        />
        <Text style={registerStyles.dobLabel}>Birthday</Text>
        <TouchableOpacity
          onPress={() => this.showModal()}
          style={registerStyles.dobContainer}>
          <View style={registerStyles.dobIconContainer}>
            <Icon style={{marginLeft:10,marginRight:6}} name='calendar' size={20} color={colorsPerm.darkGray} />
          </View>
          <Text style={this.state.dobTextStyle}>{this.state.dobText}</Text>
        </TouchableOpacity>
        <Button
        title='Create & Take Survey'
        buttonStyle={registerStyles.submitButton}
        containerStyle={registerStyles.submitButtonContainer}
        onPress={() => this.handlePress()} />
        <Text style={registerStyles.registerText}>
          Have an account already?
        </Text>
        <Text
        onPress={() => this.props.navigation.navigate('Welcome')}
        style={registerStyles.registerLink}>
        Log in here!
        </Text>
      </View>
      <DateTimePickerModal style={registerStyles.dateTimeBox}
        isVisible={this.state.modalVisible}
        mode="date"
        onConfirm={(date) => this.handleDateConfirm(date)}
        onCancel={() => this.hideModal()}
      />
    </ScrollView>);
  }

}
