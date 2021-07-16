import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavBack } from './TopNav.js';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Button, Icon, ListItem } from 'react-native-elements';
import { windowHeight, windowWidth, colors, btnColors, previousPaymentsStyles } from '../Scripts/Styles.js';
import { getPrompts, sqlToJsDate, parseDateText } from './API.js';

export default class PreviousContracts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      prompts: []
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var prompts = await getPrompts(coach.Id, client.Id, client.Token);
    this.setState({refreshing:false,prompts:prompts});
  }

  render() {

    var { refreshing, prompts } = this.state;
    if (refreshing == true) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </SafeAreaView>);
    } else {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView>
          <Text style={previousPaymentsStyles.listItemsTitle}>Signed Contracts</Text>
          {prompts.length > 0 && (<View style={previousPaymentsStyles.listItems}>
            {prompts.map((prompt, i) => {
              if (prompt.Type == 3) {
                var contract = prompt.Prompt[0][0];
                return (<ListItem key={i}  containerStyle={previousPaymentsStyles.listItem} bottomDivider onPress={() => this.props.navigation.navigate('PreviousContract', { prompt:prompt })}>
                  <Icon type='ionicon' name='document-text' color={colors.darkGray} />
                  <ListItem.Content>
                    <ListItem.Title style={previousPaymentsStyles.listItemTitle}>{contract.Title}</ListItem.Title>
                    <ListItem.Subtitle style={previousPaymentsStyles.listItemTitle}>{parseDateText(sqlToJsDate(contract.Created))}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>);
              }
            })}
          </View>) || (<View>
            <Text style={previousPaymentsStyles.listItemsNone}>No signed contracts yet!</Text>
          </View>)}
        </ScrollView>
      </SafeAreaView>);
    }

  }

}
