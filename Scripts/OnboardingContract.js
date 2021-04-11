import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, AsyncStorage, Image, Modal, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { contractStyles, colors, windowHeight, windowWidth } from './Styles.js';
import { WebView } from 'react-native-webview';
import { NavCenterTextRefresh, NavSimple } from './TopNav.js';
import Signature from 'react-native-signature-canvas';
import { Button, Icon } from 'react-native-elements';
import { currentDate, updateOnboarding, getOnboardingContract, getOnboarding, createPromptAssoc, updateOnboardingCompleted, optOutOfContract, optOutOfContractAndPrompt, getContractSigned, uploadSignature, updatePromptAssoc, parseDateText, parseSimpleDateText, sqlToJsDate } from './API.js';

export default class OnboardingContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      contract: {},
      onboarding: {},
      client: {},
      coach: {},
      visible:false,
      sig:'',
      httpError: false,
      uploading:false
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var contract = await getOnboardingContract(coach.Id);
    var onboarding = await getOnboarding(coach.Id, client.Token);
    this.setState({onboarding:onboarding,contract:contract,client:client,coach:coach,refreshing:false});
  }

  async handleLeave() {
    var { client, coach, contract } = this.state;
    var updateSuccess = await updateOnboardingCompleted(client.Id, client.Token);
    if (updateSuccess) {
      client.OnboardingCompleted = 1;
      await AsyncStorage.setItem('Client', JSON.stringify(client));
      this.props.navigation.navigate('Main');
    } else {
      Alert.alert(
        "Error connecting to server...",
        'Please try again.',
        [
          {
            text: "OK",
            onPress: () => this.setState({visible:false}),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.setState({visible:false}),
        }
      );
    }
  }

  handleSignature = async signature => {
    var { client, coach, contract, onboarding } = this.state;
    // Upload signature to DB.
    var clientName = client.FirstName + ' ' + client.LastName;
    this.setState({visible:false,refreshing:true});
    var upload = await uploadSignature(client.Token, client.Id, clientName, contract.Id, contract.File, signature);
    if (upload) {
      var updated = await updateOnboarding(coach.Id, client.Token, onboarding.SurveyCompleted, onboarding.PaymentCompleted, 1);
      var dueDate = currentDate();
      var createPrompt = await createPromptAssoc(client.Token, client.Id, coach.Id, 3, contract.Id, dueDate);
      var updatePrompt = updatePromptAssoc(client.Token, client.Id, coach.Id, createPrompt.Id);
      this.setState({refreshing:false});
      if (updated) {
        Alert.alert(
          "Contract signed!",
          'Thank you for signing! Press OK to finish onboarding.',
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
        Alert.alert(
          "Error connecting to server...",
          'Please try again.',
          [
            {
              text: "OK",
              onPress: () => this.setState({visible:false}),
              style: "OK",
            },
          ],
          {
            cancelable: true,
            onDismiss: () => this.setState({visible:false}),
          }
        );
      }
    }
  }

  showModal(visible, sig) {
    if (visible) {
      var height = parseInt((windowHeight-470));
      return (<Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => this.setState({visible:false})}>
        <Text style={[contractStyles.agreeTop,{marginTop:height}]}>By signing here, you agree to the terms of this contract:</Text>
        <View style={[contractStyles.signatureContainer]}>
          <Signature
              onOK={this.handleSignature.bind(this)}
              autoClear={true}
              clearText="Clear"
              confirmText="Submit"
              descriptionText=''
              webStyle={`body,html {width:100%;}`}
          />
          <Button
          title='Read Contract Again'
          buttonStyle={contractStyles.closeButton}
          containerStyle={contractStyles.closeButtonContainer}
          onPress={() => this.setState({visible:false})}/>
        </View>
      </Modal>);
    }
  }

  refresh() {
    this.setState({refreshing:true}, () => this.setState({refreshing:false}));
  }

  render() {

    var { refreshing, contract, client, visible, sig, httpError } = this.state;

    if (refreshing == true) {
      return (<SafeAreaView>
        <NavSimple goBack={() => this.props.navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </SafeAreaView>);
    } else {
      var url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + contract.File;
      var adjustedHeight = windowHeight - 25 - 1 - 22 - 20-120;
      var mTop = parseInt((adjustedHeight/2)-68);
      return (<SafeAreaView>
        <NavCenterTextRefresh text={contract.Title} refresh={() => this.refresh()} />
        <View style={contractStyles.container}>
          <View style={contractStyles.fileMainContainer}>
            <View style={contractStyles.fileConceptContainer}>
              <View style={{height: adjustedHeight}}>
                { httpError ? (<View style={{height:adjustedHeight,width:windowWidth,marginTop:mTop}}>
                  <Icon type='ionicon' name='logo-google' size={40} color={colors.darkGray} />
                  <Text style={{textAlign:'center',color:colors.darkGray,fontSize:14,marginTop:10}}>Error connecting to Google Drive.</Text>
                  <Text style={{textAlign:'center',color:colors.darkGray,fontSize:14}}>Return to Prompts then try again.</Text>
                </View>) : (<WebView style={{flex:1,
                width:windowWidth,
                height:adjustedHeight}}
                originWhitelist={['*']}
                onHttpError={() => this.setState({httpError:true})}
                scrollEnabled={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                  uri: url
                }}/>)}
              </View>
            </View>
          </View>
          <View style={contractStyles.bottomContainer}>
            <Text style={contractStyles.text}>Once you've read the contract above, tap below to sign.</Text>
            <Button
            title='Sign Contract'
            buttonStyle={contractStyles.button}
            containerStyle={contractStyles.buttonContainer}
            onPress={() => this.setState({visible:true})}/>
          </View>
        </View>
        {this.showModal(visible, sig)}
      </SafeAreaView>);
    }

  }

}
