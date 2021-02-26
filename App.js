import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';

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

const globals = {
  url: "https://api.coachsync.me"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Import Scripts
import Home from './Scripts/Home.js';
import Prompts from './Scripts/Prompts.js';
import Concepts from './Scripts/Concepts.js';
import Messages from './Scripts/Messages.js';
import Splash from './Scripts/Splash.js';
import OnboardingSurvey from './Scripts/OnboardingSurvey.js';
import ViewConcept from './Scripts/ViewConcept.js';
import ViewPrompt from './Scripts/ViewPrompt.js';
import ViewMessageThread from './Scripts/ViewMessageThread.js';
import VideoChat from './Scripts/VideoChat.js';
import Schedule from './Scripts/Schedule.js';

// Create navigation controllers
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
function HomeStack() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                    ? 'ios-home'
                    : 'ios-home';
                } else if (route.name === 'Prompts') {
                  iconName = focused ? 'compass-outline' : 'compass';
                } else if (route.name === 'Concepts') {
                  iconName = focused ? 'book-outline' : 'book';
                } else if (route.name === 'Messages') {
                  iconName = focused ? 'chatbubbles-outline' : 'chatbubbles';
                }

                return <IonIcon name={iconName} size={size} color={color} />;
            }
        })}
        tabBarOptions={{
            activeTintColor: colors.vikingBlue,
            inactiveTintColor: 'gray',
            showLabel: false
        }}
    >
        <Tab.Screen name="Home" component={Home} initialParams={globals}/>
        <Tab.Screen name="Prompts" component={Prompts} initialParams={globals}/>
        <Tab.Screen name="Concepts" component={Concept} initialParams={globals}/>
        <Tab.Screen name="Messages" component={Messages} initialParams={globals}/>
    </Tab.Navigator>
  );
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
            <Stack.Screen name='Splash' component={Splash} initialParams={globals} />
            <Stack.Screen name='OnboardingSurvey' component={OnboardingSurvey} initialParams={globals} />
            <Stack.Screen name='ViewConcept' component={ViewConcept} initialParams={globals} />
            <Stack.Screen name='ViewPrompt' component={ViewPrompt} initialParams={globals} />
            <Stack.Screen name='ViewMessageThread' component={ViewMessageThread} initialParams={globals} />
            <Stack.Screen name='VideoChat' component={VideoChat} initialParams={globals} />
            <Stack.Screen name='Schedule' component={Schedule} initialParams={globals} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
