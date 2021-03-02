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

export default class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0),
      email: '',
      password: ''
    };
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
      this.setState({email:input});
    } else {
      this.setState({password:input});
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
          secureTextEntry='true'
          keyboardType='default'
        />
        <Button
        title='Sign In'
        buttonStyle={welcomeStyles.submitButton}
        containerStyle={welcomeStyles.submitButtonContainer}
        onPress={() => this.handlePress()} />
        <Text style={welcomeStyles.registerText}>
          No account?&nbsp;
          <Text
          onPress={() => this.props.navigation.navigate('Register')}
          style={welcomeStyles.registerLink}>
          Register here!
          </Text>
        </Text>
      </View>
    </ScrollView>);
  }

}
