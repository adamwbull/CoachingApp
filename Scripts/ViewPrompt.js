import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { viewPromptStyles, navStyles, colors, feedMediaWidth } from '../Scripts/Styles.js';
import { sqlToJsDate, parseSimpleDateText } from '../Scripts/API.js';
import { Input, Button } from 'react-native-elements';
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';
export default class ViewPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      prompt: false,
      opacity: new Animated.Value(0),
      response: ''
    };
  }

  componentDidMount() {
    const prompt = this.props.route.params.prompt;
    this.setState({prompt:prompt});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  showPrompt(prompt) {
    console.log(prompt);
    if (prompt.Prompt[0][0].PromptType == 0) {
      // Prompt is Text.
      return (<View style={viewPromptStyles.promptContainer}>
        <View style={viewPromptStyles.prompt}>
          <Text style={viewPromptStyles.promptText}>{prompt.Prompt[0][0].Text}</Text>
        </View>
      </View>);
    } else if (prompt.Prompt[0][0].PromptType == 1) {
      // Prompt is YT video only.
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewPromptStyles.promptContainer}>
        <View style={viewPromptStyles.prompt}>
          <WebView
              style={{flex:1,
              width:feedMediaWidth,
              height:feedMediaHeight,
              marginBottom:10}}
              javaScriptEnabled={true}
              source={{uri: prompt.Prompt[0][0].Video}}
          />
        </View>
      </View>);
    } else if (prompt.Prompt[0][0].PromptType == 2) {
      // Prompt is Upload Video only.
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewPromptStyles.promptContainer}>
        <View style={viewPromptStyles.prompt}>
          <Video
            style={{flex:1,
            width:feedMediaWidth,
            height:feedMediaHeight,
            marginBottom:10}}
            source={{
              uri: prompt.Prompt[0][0].Video,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      </View>);
    } else if (prompt.Prompt[0][0].PromptType == 3) {
      // Prompt is Text/YT Video.
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewPromptStyles.promptContainer}>
        <View style={viewPromptStyles.prompt}>
          <WebView
              style={{flex:1,
              width:feedMediaWidth,
              height:feedMediaHeight,
              marginBottom:10}}
              javaScriptEnabled={true}
              source={{uri: prompt.Prompt[0][0].Video}}
          />
          <Text style={viewPromptStyles.promptText}>{prompt.Prompt[0][0].Text}</Text>
        </View>
      </View>);
    } else if (prompt.Prompt[0][0].PromptType == 4) {
      // Prompt is Text/Upload Video.
      var feedMediaHeight = parseInt(feedMediaWidth*(9/16));
      return (<View style={viewPromptStyles.promptContainer}>
        <View style={viewPromptStyles.prompt}>
          <Video
            style={{flex:1,
            width:feedMediaWidth,
            height:feedMediaHeight,
            marginBottom:10}}
            source={{
              uri: prompt.Prompt[0][0].Video,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
          <Text style={viewPromptStyles.promptText}>{prompt.Prompt[0][0].Text}</Text>
        </View>
      </View>);
    }
  }

  onTextChange(text) {
    console.log(text);
    this.setState({response:text});
  }

  handlePress() {
    console.log('State:',this.state.response);
  }

  render() {

    var prompt = this.state.prompt;

    if (prompt === false) {
      return (<ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={navStyles.nav}>
          <View style={navStyles.left}>
            <IonIcon onPress={() => this.props.navigation.navigate('Prompts')}
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
            <IonIcon name='person' size={25} color={colors.blueGray} />
          </View>
        </View>
        <View style={viewPromptStyles.promptContainer}>
          <ActivityIndicator size="large" color={colors.forest} />
        </View>
      </ScrollView>);
    } else {
      return (<ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={navStyles.nav}>
          <View style={navStyles.left}>
            <IonIcon onPress={() => this.props.navigation.navigate('Prompts')}
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
            <IonIcon name='person' size={25} color={colors.blueGray} />
          </View>
        </View>
        <View style={viewPromptStyles.mainContainer}>
          <Text style={viewPromptStyles.promptTitle}>{prompt.Prompt[0][0].Title}</Text>
          {this.showPrompt(prompt)}
          <Input
            onChangeText={text => this.onTextChange(text)}
            placeholder='Enter response here...'
            value={this.state.response}
            keyboardType='default'
            multiline={true}
            style={viewPromptStyles.promptInput}
          />
          <Button
          title='Submit'
          buttonStyle={viewPromptStyles.submitButton}
          containerStyle={viewPromptStyles.submitButtonContainer}
          onPress={() => this.handlePress()}/>
        </View>
      </ScrollView>);
    }
  }

}
