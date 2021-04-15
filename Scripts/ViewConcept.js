import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appearance, ActivityIndicator, ScrollView, Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { windowWidth, windowHeight, viewConceptStyles, navStyles, colors, feedMediaWidth } from '../Scripts/Styles.js';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';
import { NavBack } from './TopNav.js';
import { SafeAreaView } from 'react-native-safe-area-context';

var colorScheme = Appearance.getColorScheme();

const webViewScript = (colorScheme == 'dark') ? `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
  }, 1000);
` : `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
  }, 1000);
  const h = document.querySelector('html');
  h.style.backgroundColor = '#23272a';
  const allElements = [...document.getElementsByTagName("*")];
  allElements.forEach(el => {
    if (getComputedStyle(el).color === "rgb(0, 0, 0)") {
      el.style.color = "#ecf0f1";
      el.style.fontFamily = "Arial";
    }
  })
  true;
`;

export default class ViewConcept extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      opacity: new Animated.Value(0),
      webHeight:100,
    };
  }

  async componentDidMount() {
    var concept = this.props.route.params.concept;
    this.setState({concept:concept,refreshing:false});
  }

  handleBack() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    if (client.PromptsCompletedCnt == 0) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'4', next:'Concepts', client:client });
    } else if (client.PromptsCompletedCnt == 4) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'5', next:'Concepts', client:client });
    } else if (client.PromptsCompletedCnt == 9) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'4', next:'Concepts', client:client });
    } else {
      this.props.navigation.navigate('Concepts');
    }

  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  showConcept(concept) {
    if (concept.Concept[0][0].Type == 0) {
      // Text Only
      return (<View style={viewConceptStyles.mainContainer}>
        <View style={viewConceptStyles.conceptContainer}>
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          <View style={{height: this.state.webHeight}}>
            <WebView style={{flex:1,
            width:feedMediaWidth,
            marginBottom:10}}
            originWhitelist={['*']}
            scrollEnabled={false}
            onMessage={event => {
              this.setState({webHeight: parseInt(event.nativeEvent.data)});
            }}
            javaScriptEnabled={true}
            useWebKit={true}
            injectedJavaScript ={webViewScript}
            domStorageEnabled={true}
            source={{
              html: `<head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>${concept.Concept[0][0].RichText}</body>
              </html>`
            }}/>
          </View>
        </View>
      </View>);
    } else if (concept.Concept[0][0].Type == 1) {
      // YT Video Only
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewConceptStyles.videoMainContainer}>
        <View style={viewConceptStyles.conceptContainer}>
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          <WebView
              style={{flex:1,
              width:feedMediaWidth,
              height:feedMediaHeight}}
              javaScriptEnabled={true}
              source={{uri: concept.Concept[0][0].Video}}
          />
        </View>
      </View>);
    } else if (concept.Concept[0][0].Type == 2) {
      // Upload Video Only
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewConceptStyles.videoMainContainer}>
        <View style={viewConceptStyles.conceptContainer}>
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          <Video
            style={{flex:1,
            width:feedMediaWidth,
            height:feedMediaHeight}}
            source={{uri: concept.Concept[0][0].Video}}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      </View>);
    } else if (concept.Concept[0][0].Type == 3) {
      // File Only
      var file = concept.Concept[0][0].File;
      var fileType = file.split(/[#?]/)[0].split('.').pop().trim();;
      if (fileType.toLowerCase() == 'pdf') {
        var url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + file;
        var adjustedHeight = windowHeight - 25 - 1 - 22 - 20;
        return (<View style={viewConceptStyles.fileMainContainer}>
          <View style={viewConceptStyles.fileConceptContainer}>
            <View style={{height: adjustedHeight}}>
              <WebView style={{flex:1,
              width:windowWidth,
              height:adjustedHeight,
              marginBottom:10}}
              originWhitelist={['*']}
              scrollEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: url
              }}/>
            </View>
          </View>
        </View>);
      }
    } else if (concept.Concept[0][0].Type == 4) {
      // Text/YT Video
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewConceptStyles.mainContainer}>
        <View style={viewConceptStyles.conceptContainer}>
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          <WebView
              style={{flex:1,
              width:feedMediaWidth,
              height:feedMediaHeight}}
              javaScriptEnabled={true}
              source={{uri: concept.Concept[0][0].Video}}
          />
          <View style={{height: this.state.webHeight}}>
            <WebView style={{flex:1,
            width:feedMediaWidth,
            marginBottom:10}}
            originWhitelist={['*']}
            scrollEnabled={false}
            onMessage={event => {
              this.setState({webHeight: parseInt(event.nativeEvent.data)});
            }}
            javaScriptEnabled={true}
            useWebKit={true}
            injectedJavaScript ={webViewScript}
            domStorageEnabled={true}
            source={{
              html: `<head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>${concept.Concept[0][0].RichText}</body>
              </html>`
            }}/>
          </View>
        </View>
      </View>);
    } else if (concept.Concept[0][0].Type == 5) {
      // Text/Upload Video
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewConceptStyles.mainContainer}>
        <View style={viewConceptStyles.conceptContainer}>
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          <Video
            style={{flex:1,
            width:feedMediaWidth,
            height:feedMediaHeight}}
            source={{
              uri: concept.Concept[0][0].Video,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
          <View style={{height: this.state.webHeight}}>
            <WebView style={{flex:1,
            width:feedMediaWidth,
            marginBottom:10}}
            originWhitelist={['*']}
            scrollEnabled={false}
            onMessage={event => {
              this.setState({webHeight: parseInt(event.nativeEvent.data)});
            }}
            javaScriptEnabled={true}
            useWebKit={true}
            injectedJavaScript ={webViewScript}
            domStorageEnabled={true}
            source={{
              html: `<head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>${concept.Concept[0][0].RichText}</body>
              </html>`
            }}/>
          </View>
        </View>
      </View>);
    }
  }

  render() {

    if (this.state.refreshing == false) {
      var concept = this.state.concept;
      var scrollStyle = {marginBottom:0,paddingBottom:0};
      if (concept.Concept[0][0].Type != 3 && concept.Concept[0][0].Type != 6) {
        scrollStyle = viewConceptStyles.container;
      }
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('Concepts')} />
        <ScrollView contentContainerStyle={viewConceptStyles.container}>
        {this.showConcept(concept)}
      </ScrollView>
      </SafeAreaView>);
    } else {
      return (<SafeAreaView>
        <NavBack goBack={() => this.handleBack()} />
        <ScrollView contentContainerStyle={viewConceptStyles.container}>
        <View style={viewConceptStyles.mainContainer}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </View>
      </ScrollView>
      </SafeAreaView>);
    }

  }

}
