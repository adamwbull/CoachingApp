import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, AsyncStorage, ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { viewPromptStyles, onboardingStyles, viewPromptSurveyStyles, navStyles, colors } from '../Scripts/Styles.js';
import { updatePromptAssoc, getSurveyResponses, getSurveyArray, uploadResponses, sqlToJsDate, parseDateText } from '../Scripts/API.js';
import { NavBack } from './TopNav.js';
import { Slider, Button, Input, CheckBox } from 'react-native-elements';
import RadioButton from '../Components/RadioButton.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ViewPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      prompt: [],
      opacity: new Animated.Value(0),
      prompt: false
    };
  }

  findResponse(surveyItemId) {
    return function (response) {
      return response.Id === surveyItemId;
    }
  }
  async componentDidMount() {
    var coach, client, items, responses, surveyCompleted, prompt;
    try {
      // Get CoachId and Coach's Measurement Survey.
      coach = JSON.parse(await AsyncStorage.getItem('Coach'));
      client = JSON.parse(await AsyncStorage.getItem('Client'));
      prompt = this.props.route.params.prompt;
    } finally {
      items = await getSurveyArray(prompt.PromptId);
      var completed = (prompt.Completed === 1) ? true : false;
      var responses;
      if (completed) {
        responses = await getSurveyResponses(prompt.PromptId, client.Id, client.Token);
      }
      var res = [];
      // Build responses array.
      items.map((item, index) => {
        var responseItem;
        if (item.Type == 0) {
          // This item is a Input.
          res[index] = [-1, '', client.Id];
          if (completed) {
            responseItem = responses.filter(this.findResponse(item.Id));
            res[index][1] = responseItem[0].Response[0].Response;
          }
        } else if (item.Type == 1) {
          // This item is a Slider.
          res[index] = [-1, 1, client.Id];
          if (completed) {
            responseItem = responses.filter(this.findResponse(item.Id));
            res[index][1] = responseItem[0].Response[0].Response;
          }
        } else if (item.Type == 2) {
          // This item is a CheckBox group.
          var boxesLength = item.BoxOptionsArray.split(',').length;
          var arr = [];
          var i;
          for (i = 0;i < boxesLength;i++) {
            arr[i] = false;
          }
          res[index] = [-1, arr, client.Id];
          if (completed) {
            responseItem = responses.filter(this.findResponse(item.Id));
            var text = responseItem[0].Response[0].Response;
            var tArr = text.split(',');
            for (var i = 0; i < tArr.length; i++) {
              tArr[i] = (tArr[i] === 'true') ? true : false;
            }
            res[index][1] = tArr;
          }
        } else if (item.Type == 3) {
          // This item is a RadioButton group.
          res[index] = [-1, '', client.Id, null];
          if (completed) {
            responseItem = responses.filter(this.findResponse(item.Id));
            var text = responseItem[0].Response[0].Response;
            res[index][1] = text;
            res[index][3] = {key:text, text:text};
          }
        }
      });
      this.setState({prompt:prompt,coach:coach,surveyItems:items,responses:res,clientToken:client.Token,clientId:client.Id});
    }
  }

  handleBack() {
    this.props.route.params.onGoBack();
    this.props.navigation.navigate('Prompts');
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  // These methods add responses as a SurveyItem Id and the response value pairs.
  onChange(id, index, text) {
    var res = this.state.responses;
    res[index] = [id, text, res[index][2]];
    this.setState({responses:res});
  }

  onChangeSlider(id, index, text) {
    var res = this.state.responses;
    res[index] = [id, parseFloat(text.toFixed(2)), res[index][2]];
    this.setState({responses:res});
  }

  onCheckBoxChange(id, index, boxIndex) {
    var res = this.state.responses;
    var newArr = res[index][1];
    newArr[boxIndex] = !res[index][1][boxIndex];
    res[index] = [id, newArr, res[index][2]];
    this.setState({responses:res});
  }

  onSelect = (item) => {
    var res = this.state.responses;
    var selectedOption = res[item.index][1];
    if (selectedOption && selectedOption.key === item.key) {
      res[item.index][3] = null;
      res[item.index][1] = '';
      res[item.index][0] = item.id;
    } else {
      res[item.index][3] = item;
      res[item.index][1] = item.text;
      res[item.index][0] = item.id;
    }
    this.setState({responses:res});
  }

  showButton(completed) {
    if (completed == 0) {
      return (<Button
      title='Submit'
      buttonStyle={onboardingStyles.submitButton}
      containerStyle={onboardingStyles.submitButtonContainer}
      onPress={() => this.handlePress()}/>);
    }
  }
  showSurvey(prompt) {
    var trackEvents = 'auto';
    var addMargin = {
      color:colors.darkGray,
      textAlign:'center',
      marginBottom:15,
      fontSize:28,
      fontWeight:'500',
      marginTop:10
    };
    if (prompt.Completed === 1) {
      trackEvents = 'none';
      addMargin = {
        color:colors.darkGray,
        textAlign:'center',
        marginBottom:15,
        fontSize:28,
        fontWeight:'500',
        marginTop:0
      };
    }
    var completedDate = parseDateText(sqlToJsDate(prompt.CompletedDate));
    return (<View style={viewPromptSurveyStyles.survey} pointerEvents={trackEvents}>
      <View style={viewPromptSurveyStyles.completedTextView}>
        <Text style={viewPromptSurveyStyles.completedText}>{(prompt.Completed === 1) ? 'Completed on ' + completedDate : ''}</Text>
      </View>
      <Text style={addMargin}>{prompt.Prompt[0][0].Title}</Text>
      {this.state.surveyItems.map((item, index) => {
        if (item.Type == 0) {
          return (<View key={item.Id} style={onboardingStyles.questionContainer}>
            <Text style={onboardingStyles.itemQuestion}>{item.Question}</Text>
            <Input
              onChangeText={text => this.onChange(item.Id, index, text)}
              value={this.state.responses[index][1]}
              keyboardType={item.KeyboardType}
              multiline={true}
              textAlign='center'
              placeholder='Enter response here...'
            />
          </View>);
        } else if (item.Type == 1) {
          var range = item.SliderRange.split(',');
          return (<View key={item.Id} style={onboardingStyles.questionSliderContainer}>
            <Text style={onboardingStyles.itemQuestion}>{item.Question}</Text>
            <View style={onboardingStyles.sliderSet}>
              <View style={onboardingStyles.sliderSetRange}>
                <Text style={onboardingStyles.sliderSetRangeText}>{range[0]}</Text>
              </View>
              <View style={onboardingStyles.sliderContainer}>
                <Slider
                  onValueChange={value => {
                    clearTimeout(this.sliderTimeoutId)
                    this.sliderTimeoutId = setTimeout(() => {
                      this.onChangeSlider(item.Id, index, value)
                    }, 100)
                  }}
                  value={this.state.responses[index][1]}
                  minimumValue={parseInt(range[0])}
                  maximumValue={parseInt(range[1])}
                  thumbStyle={onboardingStyles.sliderThumb}
                  minimumTrackTintColor={colors.forest}
                />
              </View>
              <View style={onboardingStyles.sliderSetRange}>
                <Text style={onboardingStyles.sliderSetRangeText}>{range[1]}</Text>
              </View>
            </View>
            <Text style={onboardingStyles.sliderValue}>Value: {parseFloat(this.state.responses[index][1]).toFixed(1)}</Text>
          </View>);
        } else if (item.Type == 2) {
          var boxes = item.BoxOptionsArray.split(',');
          return (<View key={item.Id} style={onboardingStyles.questionContainer}>
            <Text style={onboardingStyles.itemQuestion}>{item.Question}</Text>
            {
              boxes.map((box, boxIndex) => {
              return (<CheckBox
                  key={box}
                  checked={this.state.responses[index][1][boxIndex]}
                  title={box}
                  checkedColor={colors.emerald}
                  uncheckedColor={colors.darkGray}
                  textStyle={{color:colors.darkGray}}
                  containerStyle={onboardingStyles.checkBoxButtonContainer}
                  onPress={() => this.onCheckBoxChange(item.Id, index, boxIndex)}
                />);
            })}
          </View>);
        } else if (item.Type == 3) {
          var boxes = item.BoxOptionsArray.split(',');
          var i; var options = [];
          for (i = 0; i < boxes.length; i++) {
            var text = boxes[i];
            options[i] = {key:text, text:text, index:index, id:item.Id};
          }
          return (<View key={item.Id} style={onboardingStyles.questionContainer}>
            <Text style={onboardingStyles.itemQuestion}>{item.Question}</Text>
            <View>
              <RadioButton
                  selectedOption={this.state.responses[index][3]}
                  onSelect={this.onSelect}
                  options={options}
                />
            </View>
          </View>);
        }
      })}
      {this.showButton(prompt.Completed)}
    </View>)
  }

  checkResponses(responses) {
    var ret = true;
    responses.map((response) => {
      if (response[0] === -1) {
        ret = false;
      }
    });
    return ret;
  }

  async handlePress() {
    var responses = this.state.responses;
    var prompt = this.state.prompt;
    var token = this.state.clientToken;
    var id = this.state.clientId;
    var coach = this.state.coach;
    var everythingFilled = this.checkResponses(responses);
    if (everythingFilled) {
      var uploaded = await uploadResponses(responses, token);
      if (uploaded) {
        // Update PromptAssoc Completed.
        var updated = await updatePromptAssoc(token, id, coach.Id, prompt.Id);
        if (updated) {
          this.handleBack();
        } else {
          Alert.alert('Error uploading your responses, try again!');
        }
      } else {
        console.log("Error uploading!");
        // Let user know they need to resubmit
        this.setState({errorText:'There was an error uploading your answers. Try hitting submit again!'});
      }
    }
  }

  render() {

    var prompt = this.state.prompt;

    if (prompt === false) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('Prompts')} />
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={viewPromptStyles.promptContainer}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </View>
      </ScrollView>
      </SafeAreaView>);
    } else {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.navigate('Prompts')} />
        <ScrollView componentContainerStyle={viewPromptStyles.container}>
        <View style={viewPromptStyles.promptContainer}>
          {this.showSurvey(prompt)}
        </View>
      </ScrollView>
      </SafeAreaView>);

    }

  }

}
