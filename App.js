import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './Scripts/Styles.js';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

// Import Scripts
import Home from './Scripts/Home.js';                           // Working
import Prompts from './Scripts/Prompts.js';                     // Working
import Concepts from './Scripts/Concepts.js';                   // Working
import Messages from './Scripts/Messages.js';                   //
import CoachIdCheck from './Scripts/CoachIdCheck.js';           // Working
import OnboardingSurvey from './Scripts/OnboardingSurvey.js';   // Working
import ViewConcept from './Scripts/ViewConcept.js';             //
import ViewPrompt from './Scripts/ViewPrompt.js';               // Working
import ViewPromptSurvey from './Scripts/ViewPromptSurvey.js';   //
import ViewMessageThread from './Scripts/ViewMessageThread.js'; //
import VideoChat from './Scripts/VideoChat.js';                 //
import Schedule from './Scripts/Schedule.js';                   //
import Welcome from './Scripts/Welcome.js';                     // Working
import Register from './Scripts/Register.js';                   // Working
import Contract from './Scripts/Contract.js';                   //
import Payment from './Scripts/Payment.js';                     //
import ClientProfile from './Scripts/ClientProfile.js';         //
                                                                // Working 8/17

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
                  iconName = focused ? 'compass' : 'compass';
                } else if (route.name === 'Concepts') {
                  iconName = focused ? 'book' : 'book';
                } else if (route.name === 'Messages') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles';
                }

                return <IonIcon name={iconName} size={size} color={color} />;
            }
        })}
        tabBarOptions={{
            activeTintColor: colors.forest,
            inactiveTintColor: colors.blueGray,
            showLabel: false,
            style: {
              borderTopWidth:2,
              borderTopColor:colors.forest
            }
        }}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Prompts" component={Prompts} />
        <Tab.Screen name="Concepts" component={Concepts} />
        <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

const MyTheme = {
  colors: {
    background:colors.clouds
  }
};

// Main class for app. Responsible for rendering app container.
export default class AppContainer extends React.Component {

  // Main rendering function. Always begins on the SplashScreen.
  // Note: The Login and Privacy screens have been added to the Stack Navigator.
  //        I found that React Navigation creates problems when trying to pass along state.
  render() {
    return (
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator headerMode='none' initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='CoachIdCheck' component={CoachIdCheck} />
            <Stack.Screen name='OnboardingSurvey' component={OnboardingSurvey} />
            <Stack.Screen name='Contract' component={Contract} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='Main' component={HomeStack} />
            <Stack.Screen name='ViewConcept' component={ViewConcept} />
            <Stack.Screen name='ViewPrompt' component={ViewPrompt} />
            <Stack.Screen name='ViewPromptSurvey' component={ViewPromptSurvey} />
            <Stack.Screen name='ViewMessageThread' component={ViewMessageThread} />
            <Stack.Screen name='VideoChat' component={VideoChat} />
            <Stack.Screen name='Schedule' component={Schedule} />
            <Stack.Screen name='ClientProfile' component={ClientProfile} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
