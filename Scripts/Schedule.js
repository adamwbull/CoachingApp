import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { windowHeight, windowWidth, colors } from '../Scripts/Styles.js';
import { NavBack } from './TopNav.js';
import AutoHeightWebView from 'react-native-autoheight-webview'

export default class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      calendlyLink: ''
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    this.setState({calendlyLink:coach.CalendlyLink,refreshing:false});
  }

  render() {

    if (this.state.refreshing === true) {
      return (<View>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </View>);
    } else {

      var { calendlyLink } = this.state;
      var width = windowWidth;
      var calendly = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'></head><body><div class='calendly-inline-widget' style='display:block;width:100%;margin:0,padding:0;background:" + colors.white + "' data-url='" + calendlyLink + "?background_color=fbfcfd&primary_color=" + colors.forest.split('#')[1] + "&text_color=" + colors.darkGray.split('#')[1] + "'></div><script type='text/javascript' src='https://assets.calendly.com/assets/external/widget.js' async></script></body></html>";
      return (<View>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{flexDirection: 'row',justifyContent: 'center',
        backgroundColor:colors.clouds,width:windowWidth,
        height:windowHeight+windowHeight*0.2}}>
          <AutoHeightWebView
              style={{flex:1,width}}
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: calendly}}
              scalesPageToFit={true}
          />

        </ScrollView>
      </View>);
    }

  }

}
