import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, AsyncStorage, ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Input, Icon } from 'react-native-elements';
import { NavBack } from './TopNav.js';
import { bugReport, colors } from '../Scripts/Styles.js';
import { createFeatureRequest } from '../Scripts/API.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class FeatureRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      description: ''
    };
  }

  async componentDidMount() {
    this.setState({refreshing:false});
  }

  onChange(text) {
    this.setState({description:text});
  }

  async handlePress() {
    var description = this.state.description;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var upload = await createFeatureRequest(client.Token, client.Id, description);
    if (upload == true) {
      var message = 'Thank you for your help with CoachSync development, ' + client.FirstName + '!';
      Alert.alert(
        "Feature request uploaded!",
        message,
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate('ClientProfile'),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.props.navigation.navigate('ClientProfile'),
        }
      );
    }
  }

  render() {

    if (this.state.refreshing == true) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </SafeAreaView>);
    } else {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
        <ScrollView>
          <View style={bugReport.form}>
            <Text style={bugReport.title}>Feature Request</Text>
            <Text style={bugReport.inputLabel}>Idea Description</Text>
            <Text style={bugReport.description}>This idea could be an improvement on an existing feature or something brand new. It's up to you!</Text>
            <Input
              onChangeText={text => this.onChange(text)}
              value={this.state.description}
              keyboardType='default'
              multiline={true}
              placeholder='Enter response here...'
            />
            <Button
            title='Submit'
            buttonStyle={bugReport.submitButton}
            containerStyle={bugReport.submitButtonContainer}
            onPress={() => this.handlePress()}/>
          </View>
        </ScrollView>
      </SafeAreaView>);
    }
  }

}
