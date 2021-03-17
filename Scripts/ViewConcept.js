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

export default class ViewConcept extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      opacity: new Animated.Value(0),
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
      console.log(concept.Concept[0][0].RichText);
      return (<View style={{marginTop:30}}>
        <WebView style={{flex:1,
        width:feedMediaWidth,
        marginBottom:10}}
        originWhitelist={['*']}
        source={{
          html: `<head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>${concept.Concept[0][0].RichText}</body>
          </html>`
        }}/>
      </View>);
    } else if (concept.Concept[0][0].Type == 1) {
      // Video Only
    } else if (concept.Concept[0][0].Type == 2) {
      // File Only
    } else if (concept.Concept[0][0].Type == 3) {
      // Text/Video
    } else if (concept.Concept[0][0].Type == 4) {
      // Text/File
    }
  }

  render() {

    if (this.state.refreshing == false) {
      var concept = this.state.concept;
      return (<ScrollView componentContainerStyle={viewConceptStyles.container}>
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
          <Text style={viewConceptStyles.conceptTitle}>{concept.Concept[0][0].Title}</Text>
          {this.showConcept(concept)}
        </View>
      </ScrollView>);
    } else {
      return (<ScrollView componentContainerStyle={viewConceptStyles.container}>
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
