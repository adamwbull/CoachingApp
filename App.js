import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = {
  emerald: '#2ecc71',
  forest: '#27ae60',
  clouds: '#ecf0f1',
  blueGray: '#344150',
  darkGray: '#23272a',
  black: '#000000',
  white: '#ffffff'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Splash screen for checking user status on app load.
class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false
    };
  }

  render() {

    return (<View style={styles.container}>
      <Text>Splash Screen!</Text>
    </View>);
  }

}

// Main class for app. Responsible for rendering app container.
export default class AppContainer extends React.Component {

  // Main rendering function. Always begins on the SplashScreen.
  // Note: The Login and Privacy screens have been added to the Stack Navigator.
  //        I found that React Navigation creates problems when trying to pass along state.
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator headerMode='none' initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
