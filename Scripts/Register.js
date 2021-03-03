import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Animated, Image, ScrollView, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerStyles, colors } from '../Scripts/Styles.js';
import { Button, Input } from 'react-native-elements';
import * as Crypto from 'expo-crypto';
import { loginCheck, parseSimpleDateText } from '../Scripts/API.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0),
      email: '',
      password: '',
      confirmPassword: '',
      dob:'',
      dobText: 'Set birth date...',
      dobTextStyle:registerStyles.dobTextPlaceholder,
      modalVisible:false
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
      this.setState({email:text});
    } else if (input == 1) {
      this.setState({password:text});
    } else if (input == 2) {
      this.setState({confirmPassword:text});
    }
  }

  async handlePress () {

    // Check login info.
    var email = this.state.email;
    var password = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.state.password
      );

    var passed = await loginCheck(email, password);

    if (passed == null) {
      console.log('Login failed.');
      // Print error to page.
    } else {
      var client = JSON.parse(passed);
      if (client.Type == 0) {
        await AsyncStorage.setItem('Client', passed);
        console.log("Login completed.");
      } else {
        // Print error to page: coach can't log in to app.
      }
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
      <View style={registerStyles.container}>
        <Text style={registerStyles.mainTitle}>Register Account</Text>
        <Input
          onChangeText={text => this.onChange(0, text)}
          label='Email Address'
          leftIcon={{ type: 'font-awesome', name: 'envelope-square', color:colors.darkGray }}
          placeholder='you@example.com'
          leftIconContainerStyle={registerStyles.inputContainerEmail}
          value={this.state.email}
          keyboardType='email-address'
        />
        <Input
          onChangeText={text => this.onChange(1, text)}
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color:colors.darkGray }}
          placeholder='Password...'
          leftIconContainerStyle={registerStyles.inputContainer}
          value={this.state.password}
          secureTextEntry={true}
          keyboardType='default'
        />
        <Input
          onChangeText={text => this.onChange(2, text)}
          label='Confirm Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color:colors.darkGray }}
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
            <Icon style={{marginLeft:18,marginRight:7}} name='calendar' size={20} color={colors.darkGray} />
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
