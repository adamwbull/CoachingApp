import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onboardingStyles } from '../Scripts/Styles.js';
import { getSurveyArray } from '../Scripts/API.js';
import { Slider, Button, Input, CheckBox } from 'react-native-elements';

export default class OnboardingSurvey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      coachId:0,
      surveyItems: [],
      responses: []
    };
  }

  async componentDidMount () {
    var coachId, items;
    try {
      coachId = await AsyncStorage.getItem('CoachId');
      items = await getSurveyArray(coachId);
    } finally {
      console.log(coachId + " " + JSON.stringify(items));
      this.setState({coachId:coachId,surveyItems:items});
    }
  }

  // Both of these methods add responses as a SurveyItem Id and the response value pairs.
  onChange (id, index, text) {
    var res = this.state.responses;
    res[index] = [id, text];
    this.setState({responses:res});
  }

  onBoxChange (id, index, boxIndex, checked) {
    var res = this.state.responses;
    var checkBoxOptionsArray = res[index].split();
    checkBoxOptionsArray[boxId] = checked;
    res[index] = [id, checkBoxOptionsArray.join()];
    this.setState({responses:res});
  }

  surveyItems() {
    return (<View>
      {this.state.surveyItems.map((item, index) => {
        if (item.Type == 0) {
          return (<View>
            <Text>{item.Question}</Text>
            <Input
              onChangeText={text => this.onChange(item.Id, index, text)}
              value={this.state.responses[item.forId]}
              keyboardType={item.KeyboardType}
            />
          </View>);
        } else if (item.Type == 1) {
          var range = item.SliderRange.split(',');
          return (<View>
            <Slider
              onValueChange={value => this.onChange(item.Id, index, value)}
              value={this.state.responses[item.forId]}
              minimumValue={range[0]}
              maximumValue={range[1]}
            />
          </View>);
        } else if (item.Type == 2) {
          var boxes = item.CheckBoxOptionsArray.split(',');
          return (<View>
            <Text>{item.Question}</Text>
            {boxes.map((box, boxIndex) => {
              return (<CheckBox
                  checked={this.state.responses[item.forId]}
                  onPress={() => this.onBoxChange(item.Id, index, boxIndex, !this.state.responses[item.forId]['checked'])}
                />);
            })}
          </View>);
        }
      })}
    </View>)
  }

  render() {

    return (<ScrollView style={onboardingStyles.container}>
      <Text>Test</Text>
      { this.surveyItems() }
    </ScrollView>);

  }

}
