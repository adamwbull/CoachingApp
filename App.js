import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './Scripts/Styles.js';
import { View, YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['YellowBox has been replaced with LogBox. Please call LogBox.ignoreLogs() instead.','Non-serializable values were found in the navigation state.']);
import FlashMessage from "react-native-flash-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  handleSuccess: (string) => console.log(string),
  handleError: (error) => console.log(error),
});

// Import Scripts
import Home from './Scripts/Home.js';                             // Working
import Prompts from './Scripts/Prompts.js';                       // Working
import Concepts from './Scripts/Concepts.js';                     // Working
import CoachIdCheck from './Scripts/CoachIdCheck.js';             // Working
import OnboardingSurvey from './Scripts/OnboardingSurvey.js';     // Working
import ViewConcept from './Scripts/ViewConcept.js';               // Working
import ViewPrompt from './Scripts/ViewPrompt.js';                 // Working
import ViewPromptSurvey from './Scripts/ViewPromptSurvey.js';     // Working
import Welcome from './Scripts/Welcome.js';                       // Working
import Register from './Scripts/Register.js';                     // Working
import ClientProfile from './Scripts/ClientProfile.js';           // Working
import UpdateAvatar from './Scripts/UpdateAvatar.js';             // Working
import BugReport from './Scripts/BugReport.js';                   // Working
import FeatureRequest from './Scripts/FeatureRequest.js';         // Working
import ChangePassword from './Scripts/ChangePassword.js';         // Working
import DeleteAccount from './Scripts/DeleteAccount.js';           // Working
import Trophies from './Scripts/Trophies.js';                     // Working
import Schedule from './Scripts/Schedule.js';                     // Working
import Messages from './Scripts/Messages.js';                     // Working
import ViewMessageThread from './Scripts/ViewMessageThread.js';   // Working
import Payment from './Scripts/Payment.js';                       // Working
import PreviousPayments from './Scripts/PreviousPayments.js';     // Working
import PreviousPayment from './Scripts/PreviousPayment.js';       // Working
import PreviousContracts from './Scripts/PreviousContracts.js';   // Working
import PreviousContract from './Scripts/PreviousContract.js';     // Working
import Contract from './Scripts/Contract.js';                     // Working
import OnboardingPayment from './Scripts/OnboardingPayment.js';   // Working
import OnboardingContract from './Scripts/OnboardingContract.js'; // Working
import AwardTrophy from './Scripts/AwardTrophy.js';               // Working
                                                                  // Working 29/29
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
            },
            path: 'main'
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
        <Tab.Screen name="Prompts" component={Prompts} path="prompts" />
        <Tab.Screen name="Concepts" component={Concepts} path="concepts" />
        <Tab.Screen name="Messages" component={Messages} path="messages" />
    </Tab.Navigator>
  );
}

const MyTheme = {
  colors: {
    background:colors.clouds
  }
};

class Nav extends React.Component {

}
// Main class for app. Responsible for rendering app container.
export default class App extends React.Component {

  render() {
    return (<>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator headerMode='none' initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='CoachIdCheck' component={CoachIdCheck} />
            <Stack.Screen name='OnboardingSurvey' component={OnboardingSurvey} options={{gestureEnabled: false}} />
            <Stack.Screen name='Contract' component={Contract} path='main' />
            <Stack.Screen name='Main' component={HomeStack} options={{gestureEnabled: false}} />
            <Stack.Screen name='ViewConcept' component={ViewConcept} />
            <Stack.Screen name='ViewPrompt' component={ViewPrompt} />
            <Stack.Screen name='ViewPromptSurvey' component={ViewPromptSurvey} />
            <Stack.Screen name='ViewMessageThread' component={ViewMessageThread} />
            <Stack.Screen name='Schedule' component={Schedule} />
            <Stack.Screen name='ClientProfile' component={ClientProfile} />
            <Stack.Screen name='UpdateAvatar' component={UpdateAvatar} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='DeleteAccount' component={DeleteAccount} />
            <Stack.Screen name='Trophies' component={Trophies} />
            <Stack.Screen name='BugReport' component={BugReport} />
            <Stack.Screen name='FeatureRequest' component={FeatureRequest} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='PreviousPayments' component={PreviousPayments} />
            <Stack.Screen name='PreviousPayment' component={PreviousPayment} />
            <Stack.Screen name='PreviousContracts' component={PreviousContracts} />
            <Stack.Screen name='PreviousContract' component={PreviousContract} />
            <Stack.Screen name='OnboardingPayment' component={OnboardingPayment} options={{gestureEnabled: false}} />
            <Stack.Screen name='OnboardingContract' component={OnboardingContract} options={{gestureEnabled: false}} />
            <Stack.Screen name='AwardTrophy' component={AwardTrophy} options={{gestureEnabled: false}} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" duration={3000} titleStyle={{fontSize:18}} textStyle={{fontSize:18}} />
    </>);
  }

};
