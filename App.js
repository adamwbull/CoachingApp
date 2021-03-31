import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './Scripts/Styles.js';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.',
'YellowBox has been replaced with LogBox. Please call LogBox.ignoreLogs() instead.']);

// Import Scripts
import Home from './Scripts/Home.js';                           // Working
import Prompts from './Scripts/Prompts.js';                     // Working
import Concepts from './Scripts/Concepts.js';                   // Working
import CoachIdCheck from './Scripts/CoachIdCheck.js';           // Working
import OnboardingSurvey from './Scripts/OnboardingSurvey.js';   // Working
import ViewConcept from './Scripts/ViewConcept.js';             // Working
import ViewPrompt from './Scripts/ViewPrompt.js';               // Working
import ViewPromptSurvey from './Scripts/ViewPromptSurvey.js';   // Working
import Welcome from './Scripts/Welcome.js';                     // Working
import Register from './Scripts/Register.js';                   // Working
import ClientProfile from './Scripts/ClientProfile.js';         // Working
import UpdateAvatar from './Scripts/UpdateAvatar.js';           // Working
import BugReport from './Scripts/BugReport.js';                 // Working
import FeatureRequest from './Scripts/FeatureRequest.js';       // Working
import ChangePassword from './Scripts/ChangePassword.js';       // Working
import DeleteAccount from './Scripts/DeleteAccount.js';         // Working
import Trophies from './Scripts/Trophies.js';                   // Working
import Schedule from './Scripts/Schedule.js';                   // Working
import Messages from './Scripts/Messages.js';                   // Working
import ViewMessageThread from './Scripts/ViewMessageThread.js'; //
import Contract from './Scripts/Contract.js';                   //
import VideoChat from './Scripts/VideoChat.js';                 //
                                                                // Working 19/22

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
                    ? 'home'
                    : 'home';
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
              borderTopColor:colors.forest,
              backgroundColor:colors.white
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
            <Stack.Screen name='Main' component={HomeStack} />
            <Stack.Screen name='ViewConcept' component={ViewConcept} />
            <Stack.Screen name='ViewPrompt' component={ViewPrompt} />
            <Stack.Screen name='ViewPromptSurvey' component={ViewPromptSurvey} />
            <Stack.Screen name='ViewMessageThread' component={ViewMessageThread} />
            <Stack.Screen name='VideoChat' component={VideoChat} />
            <Stack.Screen name='Schedule' component={Schedule} />
            <Stack.Screen name='ClientProfile' component={ClientProfile} />
            <Stack.Screen name='UpdateAvatar' component={UpdateAvatar} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='DeleteAccount' component={DeleteAccount} />
            <Stack.Screen name='Trophies' component={Trophies} />
            <Stack.Screen name='BugReport' component={BugReport} />
            <Stack.Screen name='FeatureRequest' component={FeatureRequest} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
