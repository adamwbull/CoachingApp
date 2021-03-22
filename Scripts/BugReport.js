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
import { createBugReport } from '../Scripts/API.js';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      pageText: '',
      description: ''
    };
  }

  async componentDidMount() {
    this.setState({refreshing:false});
  }

  onChange(type, text) {
    if (type === 0) {
      this.setState({pageText:text});
    } else {
      this.setState({description:text});
    }
  }

  async handlePress() {
    var pageText = this.state.pageText;
    var description = this.state.description;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var upload = await createBugReport(client.Token, client.Id, pageText, description);
    if (upload == true) {
      var message = 'Thank you for your help with CoachSync development, ' + client.FirstName + '!';
      Alert.alert(
        "Report uploaded!",
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
      return (<View style={bugReport.container}>
        <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </View>);
    } else {
      return (<View style={bugReport.container}>
        <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
        <ScrollView>
          <View style={bugReport.form}>
            <Text style={bugReport.title}>Bug Report</Text>
            <Text style={bugReport.inputLabel}>Affected Page(s)</Text>
            <Text style={bugReport.description}>Which page views or view transfers the bug occurs on.</Text>
            <Input
              onChangeText={text => this.onChange(0, text)}
              value={this.state.pageText}
              keyboardType='default'
              placeholder='Enter response here...'
            />
            <Text style={bugReport.inputLabel}>Bug Description</Text>
            <Text style={bugReport.description}>Describe, as best you can, the steps you took for the bug to happen. Then, what happened as a result.</Text>
            <Input
              onChangeText={text => this.onChange(1, text)}
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
      </View>);
    }
  }

}
