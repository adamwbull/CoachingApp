import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage, Alert, Image, Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { trophiesStyles, colors } from '../Scripts/Styles.js';
import { NavBack } from './TopNav.js';
import LockedImage from '../assets/locked-trophy.png';
export default class Trophies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      trophies: [],
      totalTrophies: 0,
      trophiesCompleted: 0,
      opacity: new Animated.Value(0),
    };
  }

  async componentDidMount() {
    this.setState({trophies:this.props.route.params.trophies, totalTrophies:this.props.route.params.totalTrophies,
      trophiesCompleted:this.props.route.params.trophiesCompleted, refreshing:false});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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

      var { trophies, trophiesCompleted, totalTrophies } = this.state;
      const lockedUri = Image.resolveAssetSource(LockedImage).uri
      return (<View style={trophiesStyles.container}>
        <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
        <ScrollView>
          <View style={trophiesStyles.mainContainer}>
          <Text style={trophiesStyles.title}>Trophies</Text>
          <Text style={trophiesStyles.completedCount}>{trophiesCompleted} of {totalTrophies} unlocked</Text>
          {trophies.map((trophy, i) => {
            var image = lockedUri;
            var tintColoring = {tintColor:colors.darkGray};
            var title = 'Unknown Trophy';
            var description = 'Keep using CoachSync to unlock!';
            if (trophy.Completed == 1) {
              image = trophy.Trophy[0].Image + '?';
              title = trophy.Trophy[0].Title;
              description = trophy.Trophy[0].Description;
              tintColoring = {};
            }
            return (<View key={i} style={trophiesStyles.trophyItem}>
              <View style={trophiesStyles.trophyImage}>
              <Animated.Image
                onLoad={this.onLoad}
                source={{ uri: image }}
                resizeMode="cover"
                style={[{
                  opacity: this.state.opacity,
                  flex:1,
                  width:70,
                  height:70,
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                      })
                    },
                  ],
                },tintColoring]}
              />
              </View>
              <View style={trophiesStyles.trophyInfo}>
                <Text style={trophiesStyles.trophyTitle}>{title}</Text>
                <Text style={trophiesStyles.trophyDescription}>{description}</Text>
              </View>
            </View>);
          })}
          </View>
        </ScrollView>
      </View>);
    }

  }

}
