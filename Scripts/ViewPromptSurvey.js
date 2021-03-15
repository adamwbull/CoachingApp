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

export default class ViewPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      promptAssoc: [],
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.setState({promptAssoc:this.props.route.params.prompt});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {

    return (<ScrollView componentContainerStyle={viewPromptStyles.container}>
      <View style={navStyles.nav}>
        <View style={navStyles.left}>
          <IonIcon onPress={() => this.props.navigation.navigate('Prompts')}
            name='chevron-back' size={35}
            color={colors.blueGray} />
        </View>
        <View style={navStyles.center}>
          <Animated.Image
            onLoad={this.onLoad}
            source={require('../assets/nav-logo.png')}
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
              navStyles.image
            ]}
          />
        </View>
        <View style={navStyles.right}>
          <IonIcon name='person' size={25} color={colors.blueGray} />
        </View>
      </View>
      <Text>Test2!</Text>
    </ScrollView>);
  }

}
