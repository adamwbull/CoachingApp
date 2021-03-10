import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, Animated, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { homeStyles } from './Styles.js';
import { NavProfileRight } from './TopNav.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      opacity: new Animated.Value(0),
      coach:[]
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    this.setState({coach:coach});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  linkItems() {
    //
    return (<View style={homeStyles.linkItems}>
    
    </View>);

  }

  render() {

    var coach = this.state.coach;

    return (<ScrollView contentContainerStyle={homeStyles.container}>
      <NavProfileRight />
      <View style={homeStyles.mainContainer}>
        <View style={homeStyles.avatarContainer}>
          <Text style={homeStyles.coachTitle}>Your Coach</Text>
          <Animated.Image
            onLoad={this.onLoad}
            source={{ uri: coach.Avatar }}
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
              homeStyles.image
            ]}
          />
          <Text style={homeStyles.nameTitle}>{coach.FirstName + ' ' + coach.LastName}</Text>
          <Text style={homeStyles.bio}>{coach.Bio}</Text>
        </View>
        {this.linkItems()}
      </View>
    </ScrollView>);

  }

}
