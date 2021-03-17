import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, ScrollView, Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { viewConceptStyles, navStyles, colors, feedMediaWidth } from '../Scripts/Styles.js';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';

const webViewScript = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
  }, 500);
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
    } else if (concept.Concept[0][0].Type == 6) {
      // Text/File
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
    }
  }

  render() {

    if (this.state.refreshing == false) {
      var concept = this.state.concept;
      return (<ScrollView contentContainerStyle={viewConceptStyles.container}>
        <View style={navStyles.nav}>
          <View style={navStyles.left}>
            <IonIcon onPress={() => this.props.navigation.navigate('Concepts')}
              name='chevron-back' size={35}
              color={colors.blueGray} />
          </View>
          <View style={navStyles.center}>
            <Animated.Image
              onLoad={this.onLoad}
              source={require('../assets/nav-logo.png')}
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
                navStyles.image
              ]}
            />
          </View>
          <View style={navStyles.right}>
          </View>
        </View>
        {this.showConcept(concept)}
      </ScrollView>);
    } else {
      return (<ScrollView contentContainerStyle={viewConceptStyles.container}>
        <View style={navStyles.nav}>
          <View style={navStyles.left}>
            <IonIcon onPress={() => this.props.navigation.navigate('Concepts')}
              name='chevron-back' size={35}
              color={colors.blueGray} />
          </View>
          <View style={navStyles.center}>
            <Animated.Image
              onLoad={this.onLoad}
              source={require('../assets/nav-logo.png')}
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
                navStyles.image
              ]}
            />
          </View>
          <View style={navStyles.right}>
          </View>
        </View>
        <View style={viewConceptStyles.mainContainer}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </View>
      </ScrollView>);
    }

  }

}
