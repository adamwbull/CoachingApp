import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, Animated, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavSimple } from './TopNav.js';
import { updateTrophyAssoc, getTrophy, updateConceptsCompletedCnt, updatePromptsCompletedCnt } from '../Scripts/API.js';
import { awardTrophyStyles, colors } from '../Scripts/Styles.js';
import { Button } from 'react-native-elements';

export default class AwardTrophy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      client: {},
      trophy: {},
      next: '',
      opacity: new Animated.Value(0)
    };
  }

  handleLeave(next) {
    if (next == 'Concepts') {
      this.props.route.params.onGoBack();
      this.props.navigation.navigate(next);
    } else if (next == 'Prompts') {
      this.props.route.params.onGoBack();
      this.props.navigation.navigate(next);
    }
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  async componentDidMount() {
    var { trophyId, next, client, onGoBack } = this.props.route.params;
    var newClient = JSON.parse(JSON.stringify(client));
    var userUpdate = await updateTrophyAssoc(client.Id, client.Token, trophyId);
    var trophy = {};
    if (userUpdate) {
      trophy = await getTrophy(trophyId, newClient.Token);
      this.setState({client:newClient,trophy:trophy,next:next,onGoBack:onGoBack,refreshing:false});
    } else {
      this.props.navigation.navigate(next);
    }
  }

  render() {

    var { refreshing, client, trophy, next } = this.state;
    if (refreshing) {
      return (<SafeAreaView>
        <View style={awardTrophyStyles.refreshingContainer}>
          <ActivityIndicator size="large" color={colors.forest} />
        </View>
      </SafeAreaView>);
    } else {
      var items = [
        "Keep up the great work!",
        "You are amazing!",
        "Way to go!",
        "You did great!",
        "You earned it!",
        "Hats off to you!",
        "Nothing can stop you!",
        "You improve every day!",
      ];

      var happyText = items[Math.floor(Math.random() * items.length)];
      return (<SafeAreaView>
        <View style={awardTrophyStyles.container}>
          <Text style={awardTrophyStyles.newAchievement}>New Achievement!</Text>
          <View style={awardTrophyStyles.bottomContainer}>
          <Animated.Image
            onLoad={this.onLoad}
            source={{ uri: trophy.Image }}
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
              awardTrophyStyles.trophyImage
            ]}
          />
          <Text style={awardTrophyStyles.trophyTitle}>{trophy.Title}</Text>
          <Text style={awardTrophyStyles.trophyDescription}>{trophy.Description}</Text>
          <Button
          title='Continue'
          buttonStyle={awardTrophyStyles.button}
          containerStyle={awardTrophyStyles.buttonContainer}
          onPress={() => this.handleLeave(next)}/>
          <Text style={awardTrophyStyles.happyText}>{happyText}</Text>
          </View>
        </View>
      </SafeAreaView>);
    }
  }

}
