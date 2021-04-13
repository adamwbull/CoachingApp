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
import { sqlToJsDate, parseDateText, getPaymentCharges } from './API.js';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      payments: []
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var payments = await getPaymentCharges(coach.Id, client.Id, client.Token);
    this.setState({refreshing:false,payments:payments});
  }

  render() {

    var { refreshing, payments } = this.state;
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
          <Text style={previousPaymentsStyles.listItemsTitle}>Previous Payments</Text>
          <View style={previousPaymentsStyles.listItems}>
          {payments.map((payment, i) => {
            return (<ListItem key={i} containerStyle={previousPaymentsStyles.listItem} bottomDivider onPress={() => this.props.navigation.navigate('PreviousPayment', { payment:payment })}>
              <Icon type='ionicon' name='card' color={colors.darkGray} />
              <ListItem.Content>
                <ListItem.Title style={previousPaymentsStyles.listItemTitle}>{payment.Title}</ListItem.Title>
                <ListItem.Subtitle style={previousPaymentsStyles.listItemTitle}>{parseDateText(sqlToJsDate(payment.Created))}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>);
          })}
          </View>
        </ScrollView>
      </SafeAreaView>);
    }

  }

}
