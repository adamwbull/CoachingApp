import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Linking, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavBack } from './TopNav.js';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Button, Icon } from 'react-native-elements';
import { windowHeight, windowWidth, colors, btnColors, paymentStyles } from '../Scripts/Styles.js';
import { sqlToJsDate, parseDateText } from './API.js';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      payment: {}
    };
  }

  componentDidMount() {
    var { payment } = this.props.route.params;
    this.setState({payment:payment,refreshing:false});
  }

  render() {

    var { refreshing, payment } = this.state;
    if (refreshing == true) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{alignItems: 'center',
        justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
        </ScrollView>
      </SafeAreaView>);
    } else {
      var amount = getSymbolFromCurrency(payment.Currency.toUpperCase()) + parseFloat(payment.Amount / 100).toFixed(2);
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <View style={paymentStyles.container}>
          <Text style={paymentStyles.title}>{payment.Title}</Text>
          <Text style={paymentStyles.memo}>{payment.Memo}</Text>
          <Text style={paymentStyles.amountTitle}>Amount Paid:</Text>
          <View style={paymentStyles.amountContainer}>
            <Text style={paymentStyles.amountText}>{amount}</Text>
          </View>
          <Text style={paymentStyles.dueDate}>
            on {parseDateText(sqlToJsDate(payment.Created))}
          </Text>
          <Button
          title='View Receipt'
          buttonStyle={paymentStyles.submitButton}
          containerStyle={paymentStyles.submitButtonContainer}
          onPress={async () => await Linking.openURL(payment.Receipt)}/>
        </View>
      </SafeAreaView>);
    }
  }

}
