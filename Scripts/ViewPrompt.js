import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, Alert, ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { viewPromptStyles, navStyles, colors, feedMediaWidth } from '../Scripts/Styles.js';
import { updatePromptsCompletedCnt, sqlToJsDate, parseSimpleDateText, createPromptResponse, updatePromptResponse, getPromptResponse } from '../Scripts/API.js';
import { Input, Button } from 'react-native-elements';
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';
import { NavBack } from './TopNav.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ViewPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      prompt: false,
      responseArr: false,
      opacity: new Animated.Value(0),
      response: ''
    };
  }

  async componentDidMount() {
    const prompt = this.props.route.params.prompt;
    var promptArr = false;
    var response = '';
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    if (prompt.Completed == 1) {
      promptArr = await getPromptResponse(prompt.Id, client.Id, client.Token);
      response = promptArr[0].Text;
    }
    this.setState({prompt:prompt,promptArr:promptArr,client:client,response:response});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  async handleBack() {
    var { client } = this.state;
    var updateRemote = await updatePromptsCompletedCnt(client.Id, client.Token);
    client.PromptsCompletedCnt += 1;
    await AsyncStorage.setItem('Client',JSON.stringify(client));
    if (client.PromptsCompletedCnt == 1) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'1', next:'Prompts', client:client, onGoBack:this.props.route.params.onGoBack });
    } else if (client.PromptsCompletedCnt == 5) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'2', next:'Prompts', client:client, onGoBack:this.props.route.params.onGoBack });
    } else if (client.PromptsCompletedCnt == 10) {
      this.props.navigation.navigate('AwardTrophy', { trophyId:'3', next:'Prompts', client:client, onGoBack:this.props.route.params.onGoBack });
    } else {
      this.props.route.params.onGoBack();
      this.props.navigation.navigate('Prompts');
    }
  }

  showPrompt(prompt) {
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
    this.setState({response:text});
  }

  async handlePress(prompt) {
    var promptArr = this.state.promptArr;
    var response = this.state.response;
    if (prompt.Completed == 0) {
      var inserted = await createPromptResponse(prompt.Id, response);
      if (inserted == true) {
        this.handleBack();
      } else {
        Alert.alert('There was a problem uploading your response! Please try again.');
      }
    } else {
      var updated = await updatePromptResponse(promptArr[0].Id, prompt.Id, response);
      this.handleBack();
    }
  }

  render() {

    var prompt = this.state.prompt;

    if (prompt === false) {
      return (<SafeAreaView>
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
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
          </View>
        </View>
        <View style={viewPromptStyles.promptContainer}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </View>
      </ScrollView>
    </SafeAreaView>);
    } else {
      var buttonTitle = '';
      if (prompt.Completed == 0) {
        buttonTitle = 'Submit';
      } else {
        buttonTitle = 'Update';
      }
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('Prompts')} />
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
          <View style={viewPromptStyles.mainContainer}>
            <Text style={viewPromptStyles.promptTitle}>{prompt.Prompt[0][0].Title}</Text>
            {this.showPrompt(prompt)}
            <Input
              onChangeText={text => this.onTextChange(text)}
              placeholder='Enter response here...'
              value={this.state.response}
              keyboardType='default'
              inputStyle={{color:colors.darkGray}}
              multiline={true}
              style={viewPromptStyles.promptInput}
            />
            <Button
            title={buttonTitle}
            buttonStyle={viewPromptStyles.submitButton}
            containerStyle={viewPromptStyles.submitButtonContainer}
            onPress={() => this.handlePress(prompt)}/>
          </View>
        </ScrollView>
      </SafeAreaView>);
    }
  }

}
