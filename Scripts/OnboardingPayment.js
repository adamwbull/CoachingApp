import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Linking, Payment, Alert, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback, Platform, UIManager, Modal, ActivityIndicator, Animated, Image, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, Icon, Button } from 'react-native-elements';
import { NavSimple } from './TopNav.js';
import { windowHeight, windowWidth, colors, btnColors, paymentStyles } from '../Scripts/Styles.js';
import { getOnboarding, updateOnboarding, updateOnboardingCompleted, getOnboardingPayment, sqlToJsDate, parseDateText, getPayment, createPaymentCharge, updatePromptAssoc, getOnboardingContract } from './API.js';
import { CreditCardInput } from "react-native-credit-card-input-plus";
import getSymbolFromCurrency from 'currency-symbol-map';

export default class OnboardingPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      coach: {},
      client: {},
      nav: '',
      stripe: {},
      paymentCharge:{},
      visible: false,
      disabled: true,
      opacity: new Animated.Value(0),
      errorText:'',
      name:''
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var onboarding = await getOnboarding(coach.Id, client.Token);
    var payment = {};
    if (onboarding.OnboardingType == 3 && onboarding.PaymentCompleted == 1) {
      var updated = await updateOnboarding(coach.Id, client.Token, onboarding.SurveyCompleted, 1, onboarding.ContractCompleted);
      this.props.navigation.navigate('OnboardingContract');
    } else if (onboarding.PaymentCompleted == 1) {
      var updated = await updateOnboarding(coach.Id, client.Token, onboarding.SurveyCompleted, 1, onboarding.ContractCompleted);
      var updateSuccess = await updateOnboardingCompleted(client.Id, client.Token);
      this.props.navigation.navigate('Main');
    } else {
      payment = await getOnboardingPayment(coach.Id);
    }
    if (Platform.OS == 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.setState({coach:coach,client:client,payment:payment,onboarding:onboarding,refreshing:false});
  }

  onChangeCard(form) {
    var { name } = this.state;
    if (form.valid && name.length > 3) {
      this.setState({disabled:false,form:form,errorText:''});
    } else {
      this.setState({disabled:true,form:form,errorText:''});
    }
  }

  onChangeName(text) {
    var { form } = this.state;
    if (form.valid && text.length > 3) {
      this.setState({disabled:false,name:text,errorText:''});
    } else {
      this.setState({disabled:true,name:text,errorText:''});
    }
  }

  async handleLeave() {
    var { onboarding, coach, client } = this.state;
    this.setState({visible:false});
    if (onboarding.OnboardingType == 3) {
      var updated = await updateOnboarding(coach.Id, client.Token, onboarding.SurveyCompleted, 1, onboarding.ContractCompleted);
      this.props.navigation.navigate('OnboardingContract');
    } else if (onboarding.OnboardingType == 2) {
      var updated = await updateOnboarding(coach.Id, client.Token, onboarding.SurveyCompleted, 1, onboarding.ContractCompleted);
      var updateSuccess = await updateOnboardingCompleted(client.Id, client.Token);
      this.props.navigation.navigate('Main');
    }
  }

  async onSubmitStripe() {
    var { form, payment, client, coach, nav, name } = this.state;
    var stripePublicKey = coach.StripePublicKey
    var stripe = require('stripe-client')(stripePublicKey);
    var card = {};
    card.number = form.values.number;
    card.exp_month = form.values.expiry.split('/')[0];
    card.exp_year = form.values.expiry.split('/')[1];
    card.cvc = form.values.cvc;
    card.name = name;
    card = {card:card};
    var createToken = await stripe.createToken(card);
    var token = createToken.id;
    var chargeCompleted = await createPaymentCharge(payment.Id, token, client.Id, client.Token, coach.Id, payment.Title, payment.Amount, payment.Currency, payment.Memo);
    if (chargeCompleted) {
      Alert.alert(
        "Thank you!",
        'Payment accepted. Your card will be charged shortly.',
        [
          {
            text: "OK",
            onPress: () => this.handleLeave(),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.handleLeave(),
        }
      );
    } else {
      this.setState({errorText:'Error processing card information. Try again!'})
    }
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  showModal(visible, payment, disabled, coach, client, amount, errorText) {
    if (payment.PaymentRoute == 0) {
      // Stripe payment type.
      var width = parseInt(windowWidth*0.5);
      var height = parseInt((width/300)*68);
      var marginLeft = windowWidth*0.25;
      var payText = 'Pay ' + amount;
      return (<Modal
        animationType='slide'
        visible={visible}
        onRequestClose={() => this.setState({visible:false})}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={paymentStyles.modalContainer}>
              <View style={paymentStyles.cardContainer}>
                <Text style={paymentStyles.creditTitle}>Enter Card Info:</Text>
                <CreditCardInput onChange={form => this.onChangeCard(form)} />
                <Text style={paymentStyles.cardHolderLabel}>CARD HOLDER</Text>
                <TextInput placeholder='Name...'
                  onChangeText={(text) => this.onChangeName(text)} style={{}}
                  style={paymentStyles.cardHolderInput}
                  placeholderTextColor='gray'
                />
              </View>
              <Text style={paymentStyles.errorText}>{errorText}</Text>
              <Button
              title={payText}
              disabled={disabled}
              buttonStyle={paymentStyles.submitButton}
              containerStyle={paymentStyles.submitButtonContainer}
              onPress={() => this.onSubmitStripe()} />
              <Animated.Image
                onLoad={this.onLoad}
                source={require('../assets/stripe.png')}
                resizeMode="cover"
                style={{
                  opacity: this.state.opacity,
                  width:width,
                  height:height,
                  marginLeft:marginLeft,
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                      })
                    },
                  ],
                }}
              />
              <View style={paymentStyles.cancelContainer}>
                <ListItem containerStyle={{ backgroundColor: btnColors.danger }} onPress={() => this.setState({visible:false,name:'',errorText:''})}>
                  <Icon name='close' type='ionicon' color='white' />
                  <ListItem.Content>
                    <ListItem.Title style={{ color: 'white' }}>Cancel</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>);
    } else if (payment.PaymentRoute == 1) {
      // PayPal payment type.
      return (<Modal></Modal>);
    }
  }

  render() {

    var { coach, client, nav, visible, payment, refreshing, disabled, errorText, paymentCharge } = this.state;

    if (refreshing == true) {
      return (<SafeAreaView>
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </SafeAreaView>);
    } else {
      var amount = getSymbolFromCurrency(payment.Currency.toUpperCase()) + parseFloat(payment.Amount / 100).toFixed(2);
      return (<SafeAreaView>
        <NavSimple />
        <View style={paymentStyles.container}>
          <Text style={paymentStyles.title}>{payment.Title}</Text>
          <Text style={paymentStyles.memo}>{payment.Memo}</Text>
          <Text style={paymentStyles.amountTitle}>Amount Due:</Text>
          <View style={paymentStyles.amountContainer}>
            <Text style={paymentStyles.amountText}>{amount}</Text>
          </View>
          { (payment.PaymentRoute == 0 || payment.PaymentRoute == 2) && (
            <Button
            title='Pay with Stripe'
            buttonStyle={paymentStyles.submitButtonStripe}
            containerStyle={paymentStyles.submitButtonContainer}
            onPress={() => this.setState({visible:true})} />
          )}
          { (payment.PaymentRoute == 1 || payment.PaymentRoute == 2) && (
            <Button
            title='Pay with PayPal'
            disabled={disabled}
            buttonStyle={paymentStyles.submitButtonPayPal}
            containerStyle={paymentStyles.submitButtonContainer}
            onPress={() => this.setState({visible:true})} />
          )}
        </View>
        {this.showModal(visible, payment, disabled, coach, client, amount, errorText)}
      </SafeAreaView>);
    }
  }

}
