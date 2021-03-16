import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavProfileRight } from './TopNav.js';
import { getPrompts, sqlToJsDate, parseDateText, parseSimpleDateText } from '../Scripts/API.js';
import { promptsStyles, colors, windowHeight } from './Styles.js';

//
export default class Prompts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      prompts: []
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var prompts = await getPrompts(coach.Id, client.Id);
    this.setState({prompts:prompts});
  }

  openPrompt(prompt) {
    if (prompt.Type == 1) {
      this.props.navigation.navigate('ViewPromptSurvey', { prompt:prompt });
    } else if (prompt.Type == 0) {
      this.props.navigation.navigate('ViewPrompt', { prompt:prompt });
    }
  }

  showPrompts(prompts) {

    return(<View style={promptsStyles.promptsContainer}>
      {prompts.map((prompt) => {
        var due = sqlToJsDate(prompt.DueDate);
        var overdueText = '';
        var overdueStyle = {height:0};
        var displayInfo, displayStyle;
        if (prompt.Completed == 0) {
          var cur = new Date();
          if (cur > due) {
            overdueText = 'Overdue!';
            overdueStyle = promptsStyles.overdueText;
          }
          displayInfo = 'Due: ' + parseDateText(due);
          displayStyle = promptsStyles.promptInfo;
        } else if (prompt.Completed == 1) {
          var completed = sqlToJsDate(prompt.CompletedDate);
          displayInfo = 'Completed ' + parseSimpleDateText(completed);
          displayStyle = promptsStyles.promptInfoCompleted;
        }
        if (prompt.Type == 0) {
          // Item is a Prompt.
          if (prompt.Prompt[0][0].PromptType == 0) {
            // Prompt is Text only.
            prompt.IconName = 'create';
          } else if (prompt.Prompt[0][0].PromptType == 1 || prompt.Prompt[0][0].PromptType == 2 || prompt.Prompt[0][0].PromptType == 3) {
            // Prompt includes Video.
            prompt.IconName = 'film';
          }
        } else if (prompt.Type == 1) {
          // Item is a Survey.
          prompt.IconName = 'clipboard';
        }
        return (<TouchableOpacity
          onPress={() => this.openPrompt(prompt)}
          key={prompt.Prompt[0][0].Id}
          style={promptsStyles.prompt}>
          <View style={promptsStyles.promptIconContainer}>
            <IonIcon name={prompt.IconName} size={40} color={colors.blueGray} />
            <Text style={overdueStyle}>{overdueText}</Text>
          </View>
          <View style={promptsStyles.promptBodyContainer}>
            <Text style={promptsStyles.promptHeader}>{prompt.Prompt[0][0].Title}</Text>
            <Text style={displayStyle}>{displayInfo}</Text>
          </View>
          <View style={promptsStyles.promptOpenIcon}>
            <IonIcon name='chevron-forward' size={30} color={colors.blueGray} />
          </View>
        </TouchableOpacity>);
      })}
    </View>);
  }

  render() {

    var prompts = this.state.prompts;
    var mainContainerStyle;
    var promptsLength = prompts.length;
    if (promptsLength < 7) {
      var margin = parseInt(windowHeight-((windowHeight/5)*promptsLength));
      mainContainerStyle = { backgroundColor:colors.clouds,
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      marginBottom:margin};
    } else {
      mainContainerStyle = promptsStyles.mainContainer;
    }
    return (<ScrollView contentContainerStyle={promptsStyles.container}>
      <View style={mainContainerStyle}>
        <NavProfileRight />
        <Text style={promptsStyles.promptsTitle}>Prompts</Text>
        {this.showPrompts(prompts)}
      </View>
    </ScrollView>);
  }

}
