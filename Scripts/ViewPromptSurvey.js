import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { viewPromptStyles, navStyles, colors } from '../Scripts/Styles.js';
import { sqlToJsDate, parseSimpleDateText } from '../Scripts/API.js';
import { NavProfileBack } from './TopNav.js';

export default class ViewPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      prompt: [],
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const prompt = this.props.route.params.prompt;
    this.setState({prompt:prompt});
  }

  handleBack() {
    this.props.route.params.onGoBack();
    this.props.navigation.navigate('Prompts');
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  showSurvey() {
    return (<View><Text>lol</Text></View>);
  }

  render() {

    var prompt = this.state.prompt;

    if (prompt === false) {
      return (<View>
        <NavProfileBack goBack={() => this.props.navigation.navigate('Prompts')} />
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={viewPromptStyles.promptContainer}>
          <ActivityIndicator size="large" color={colors.forest} />
        </View>
      </ScrollView>
      </View>);
    } else {
      return (<View>
        <NavProfileBack goBack={() => this.props.navigation.navigate('Prompts')} />
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={viewPromptStyles.promptContainer}>
          {this.showSurvey(prompt)}
        </View>
      </ScrollView>
      </View>);

    }

  }

}
