import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage, Alert, Image, Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { clientProfileStyles, colors, btnColors } from '../Scripts/Styles.js';
import { NavBack } from './TopNav.js';
import { Button, ListItem, Icon } from 'react-native-elements';
import { sqlToJsDate, parseSimpleDateText } from '../Scripts/API.js';

export default class ClientProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      opacity: new Animated.Value(0),
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  async logout() {
    Alert.alert(
      "Just to check...",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          AsyncStorage.clear()
          this.props.navigation.navigate('Welcome');
        }}
      ]);
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    this.setState({client:client,refreshing:false});
  }

  render() {

    if (this.state.refreshing == true) {
      return (<View>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </View>);
    } else {

      var client = this.state.client;
      var joined = parseSimpleDateText(sqlToJsDate(client.Created));
      var name = client.FirstName + ' ' + client.LastName;
      var year = new Date();
      year = year.getFullYear();

      const generalSettings = [
        {
          title: 'Update Avatar',
          icon: 'image',
          function: () => this.props.navigation.navigate('UpdateAvatar')
        },
        {
          title: 'Change Password',
          icon: 'lock',
          function: () => this.props.navigation.navigate('ChangePassword')
        },
        {
          title: 'Delete Account',
          icon: 'person-remove',
          function: () => this.props.navigation.navigate('DeleteAccount')
        }
      ];

      const alphaDev = [
        {
          title: 'Report A Bug',
          icon: 'bug',
          function: () => this.props.navigation.navigate('BugReport')
        },
        {
          title: 'Request Features',
          icon: 'bulb',
          function: () => this.props.navigation.navigate('FeatureRequest')
        }
      ]

      return (<View style={clientProfileStyles.container}>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView>
          <View style={clientProfileStyles.avatarContainer}>
            <View style={clientProfileStyles.avatarLeft}>
            <Animated.Image
              onLoad={this.onLoad}
              source={{ uri: client.Avatar }}
              resizeMode="cover"
              style={{
                opacity: this.state.opacity,
                flex:1,
                width:80,
                height:80,
                borderRadius:100,
                transform: [
                  {
                    scale: this.state.opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    })
                  },
                ],
              }}
            />
            </View>
            <View style={clientProfileStyles.userInfo}>
              <Text style={clientProfileStyles.userName}>{name}</Text>
              <Text style={clientProfileStyles.userCreated}>Joined {joined}</Text>
            </View>
            <TouchableOpacity style={clientProfileStyles.trophyContainer} onPress={() => this.props.navigation.navigate('Trophies')}>
                <IonIcon name='trophy' size={30} color={btnColors.caution} />
                <Text style={clientProfileStyles.trophyText}>0/9 Trophies</Text>
            </TouchableOpacity>
          </View>
          <Text style={clientProfileStyles.listItemsTitle}>General Settings</Text>
          <View style={clientProfileStyles.listItems}>
            {
              generalSettings.map((item, i) => (
                <ListItem key={i} bottomDivider onPress={item.function}>
                  <Icon name={item.icon} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))
            }
          </View>
          <Text style={clientProfileStyles.listItemsTitle}>Service Related</Text>
          <View style={clientProfileStyles.listItems}>
            {
              alphaDev.map((item, i) => (
                <ListItem key={i} bottomDivider onPress={item.function}>
                  <Icon type='ionicon' name={item.icon} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))
            }
          </View>
          <Button
          key={client.Id}
          title='Logout'
          buttonStyle={clientProfileStyles.button}
          containerStyle={clientProfileStyles.buttonContainer}
          onPress={() => this.logout()}/>
          <View style={clientProfileStyles.versionContainer}>
            <Text style={clientProfileStyles.versionText}>Client App v1.0.0</Text>
            <Text style={clientProfileStyles.versionText}>{'\u00A9'}CoachSync {year}</Text>
          </View>
        </ScrollView>
      </View>);
    }
  }

}