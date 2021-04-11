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
import { NavBackCenterText, NavBack } from './TopNav.js';
import Signature from 'react-native-signature-canvas';
import { Button, Icon } from 'react-native-elements';
import { createPromptAssoc, updateOnboardingCompleted, optOutOfContract, optOutOfContractAndPrompt, getContractSigned, uploadSignature, updatePromptAssoc, parseDateText, parseSimpleDateText, sqlToJsDate } from './API.js';

export default class PreviousContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      contractSigned: {},
      contract: {},
      prompt: {}
    };
  }

  async componentDidMount() {
    var { prompt } = this.props.route.params;
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var contract = prompt.Prompt[0][0];
    var contractSigned = await getContractSigned(contract.Id, client.Id, client.Token);
    this.setState({prompt:prompt,contract:contract,contractSigned:contractSigned,refreshing:false});
  }

  async handleLeave() {
    this.props.navigation.goBack();
  }

  async optOut(contractSigned, prompt, client) {
    Alert.alert(
      "Opt out of contract?",
      'Pressing Yes will opt you out of this contract. Be sure you have read the contract and understand the ramifications. Are you sure?',
      [
        {
          text: "Yes",
          onPress: async () => {
            var optedOut = await optOutOfContractAndPrompt(contractSigned.Id, client.Id, client.Token, prompt.Id);
            if (optedOut) {
              Alert.alert(
                "Opted out!",
                'You have opted out of this contract.',
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
                'Please try again later.',
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
            }
          },
          style: "OK",
        },
        {
          text: "Cancel",
          onPress: () => this.handleLeave(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => this.handleLeave(),
      }
    );
  }


  showOptOutOptions(contractSigned, contract, prompt, client) {
    if (contractSigned.OptedOut == 0) {
      return (<View style={contractStyles.bottomContainer}>
        <Text style={contractStyles.text}>Signed on {parseSimpleDateText(sqlToJsDate(prompt.CompletedDate))}</Text>
        <Text style={contractStyles.text}>Terminate this contract by opting out:</Text>
        <Button
        title='Opt Out'
        buttonStyle={contractStyles.buttonOptOut}
        containerStyle={contractStyles.buttonContainer}
        onPress={() => this.optOut(contractSigned, prompt, client)}/>
      </View>);
    } else {
      return (<View style={contractStyles.bottomContainer}>
        <Text style={contractStyles.text}>You have opted out of this contract.</Text>
      </View>);
    }
  }

  render() {

    var { refreshing, contract, contractSigned, prompt, client, visible } = this.state;

    if (refreshing == true) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </SafeAreaView>);
    } else {
      var url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + contractSigned.File;
      var adjustedHeight = windowHeight - 25 - 1 - 22 - 15 - 80;
      if (contract.CanBeOptedOut == 1) {
        adjustedHeight = windowHeight - 25 - 1 - 22 - 15 - 140;
      }
      var mTop = parseInt((adjustedHeight/2)-68);
      return (<SafeAreaView>
        <NavBackCenterText text={contract.Title} goBack={() => this.props.navigation.goBack()} />
        <View style={contractStyles.container}>
          <View style={contractStyles.fileMainContainer}>
            <View style={contractStyles.fileConceptContainer}>
              <View style={{height: adjustedHeight}}>
              <WebView style={{flex:1,
              width:windowWidth,
              height:adjustedHeight}}
              originWhitelist={['*']}
              onHttpError={() => this.setState({httpError:true})}
              scrollEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: url
              }}/>
              </View>
            </View>
          </View>
          { (contract.CanBeOptedOut == 1) ? this.showOptOutOptions(contractSigned, contract, prompt, client) : (<View style={contractStyles.bottomContainerSigned}>
            <Text style={[contractStyles.text,{marginTop:4,fontSize:18}]}>Signed on {parseSimpleDateText(sqlToJsDate(prompt.CompletedDate))}</Text>
          </View>)}
        </View>
      </SafeAreaView>);
    }
  }

}
