import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './Scripts/Styles.js';

// Import Scripts
import Home from './Scripts/Home.js';
import Prompts from './Scripts/Prompts.js';
import Concepts from './Scripts/Concepts.js';
import Messages from './Scripts/Messages.js';
import CoachIdCheck from './Scripts/CoachIdCheck.js';
import OnboardingSurvey from './Scripts/OnboardingSurvey.js';
import ViewConcept from './Scripts/ViewConcept.js';
import ViewPrompt from './Scripts/ViewPrompt.js';
import ViewMessageThread from './Scripts/ViewMessageThread.js';
import VideoChat from './Scripts/VideoChat.js';
import Schedule from './Scripts/Schedule.js';
import Welcome from './Scripts/Welcome.js';
import Register from './Scripts/Register.js';

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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Prompts" component={Prompts} />
        <Tab.Screen name="Concepts" component={Concepts} />
        <Tab.Screen name="Messages" component={Messages} />
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
          <Stack.Navigator headerMode='none' initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='CoachIdCheck' component={CoachIdCheck} />
            <Stack.Screen name='Main' component={HomeStack} />
            <Stack.Screen name='OnboardingSurvey' component={OnboardingSurvey} />
            <Stack.Screen name='ViewConcept' component={ViewConcept} />
            <Stack.Screen name='ViewPrompt' component={ViewPrompt} />
            <Stack.Screen name='ViewMessageThread' component={ViewMessageThread} />
            <Stack.Screen name='VideoChat' component={VideoChat} />
            <Stack.Screen name='Schedule' component={Schedule} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
