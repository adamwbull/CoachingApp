import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, ScrollView, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { welcomeStyles, colors } from '../Scripts/Styles.js';
import { Button, Input } from 'react-native-elements';
import * as Crypto from 'expo-crypto';
import { loginCheck } from '../Scripts/API.js';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0),
      email: '',
      password: '',
      errorText: ''
    };
  }

  componentDidMount = () => AsyncStorage.getItem('Client').then((val) => this.handleValue(val));

  async handleValue(val) {
    if (val !== null) {
      var client = JSON.parse(val);
      if (client.OnboardingCompleted === 0) {
        this.props.navigation.navigate('CoachIdCheck', { name: client.FirstName, id: client.Id, token: client.Token });
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
      this.setState({email:text,errorText:''});
    } else {
      this.setState({password:text,errorText:''});
    }
  }

  async handlePress () {

    // Check login info.
    var email = this.state.email.toLowerCase();
    var password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.state.password
      );

    var passed = await loginCheck(email, password);

    if (passed == null) {
      console.log('Login failed.');
      this.setState({errorText:'Incorrect email or password.'});
    } else {
      var client = JSON.parse(passed);
      if (client.Type == 0) {
        await AsyncStorage.setItem('Client', passed);
        console.log("Login completed.");
        if (client.OnboardingCompleted == 0) {
          this.props.navigation.navigate('CoachIdCheck', { name: client.FirstName, id: client.Id, token: client.Token});
        } else {
          this.props.navigation.navigate('Main');
        }
      } else {
        this.setState({errorText:'Coaches cannot log in to the client app.'});
      }
    }
  }

  render() {

    return (<ScrollView style={welcomeStyles.trueContainer}>
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
          welcomeStyles.image
        ]}
      />
      <View style={welcomeStyles.container}>
        <Text style={welcomeStyles.mainTitle}>Sign In</Text>
        <Text style={welcomeStyles.errorText}>{this.state.errorText}</Text>
        <Input
          onChangeText={text => this.onChange(0, text)}
          label='Email Address'
          leftIcon={{ type: 'font-awesome', name: 'envelope-square', color:colors.darkGray }}
          placeholder='you@example.com'
          leftIconContainerStyle={welcomeStyles.inputContainerEmail}
          value={this.state.email}
          keyboardType='email-address'
        />
        <Input
          onChangeText={text => this.onChange(1, text)}
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color:colors.darkGray }}
          placeholder='Password...'
          leftIconContainerStyle={welcomeStyles.inputContainer}
          value={this.state.password}
          secureTextEntry={true}
          keyboardType='default'
        />
        <Button
        title='Submit'
        buttonStyle={welcomeStyles.submitButton}
        containerStyle={welcomeStyles.submitButtonContainer}
        onPress={() => this.handlePress()} />
        <Text style={welcomeStyles.registerText}>
          No account?
        </Text>
        <Text
        onPress={() => this.props.navigation.navigate('Register')}
        style={welcomeStyles.registerLink}>
        Take onboarding survey here!
        </Text>
      </View>
    </ScrollView>);
  }

}
