import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navStyles, colors } from './Styles.js';
import { useNavigation } from '@react-navigation/native';

export class NavProfileRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0)
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (<View style={navStyles.nav}>
      <View style={navStyles.left}></View>
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
        <IonIcon onPress={this.props.navRight} name='person' size={25} color={colors.blueGray} />
      </View>
    </View>);
  }
}

export class NavProfileBack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0)
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (<View style={navStyles.nav}>
      <View style={navStyles.left}>
        <IonIcon onPress={this.props.goBack}
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
      </View>
    </View>);
  }
}
