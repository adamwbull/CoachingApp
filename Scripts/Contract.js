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

export default class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      contract: {},
      contractSigned: {},
      prompt: {},
      client: {},
      coach: {},
      nav: '',
      visible:false,
      sig:'',
      httpError: false
    };
  }

  async componentDidMount() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var { prompt, nav } = this.props.route.params;
    var contract = {};
    if (nav == 'Prompt') {
      contract = prompt.Prompt[0][0];
      prompt = this.props.route.params.prompt;
    }
    var contractSigned = {};
    if (nav == 'Prompt' && prompt.Completed > 0) {
      contractSigned = await getContractSigned(contract.Id, client.Id, client.Token);
    }
    this.setState({prompt:prompt,contract:contract,contractSigned:contractSigned,client:client,coach:coach,nav:nav,refreshing:false});
  }

  handlePromptBack() {
    this.props.route.params.onGoBack();
    this.props.navigation.navigate('Prompts');
  }

  async handleLeave() {
    var { nav, client } = this.state;
    if (nav == 'Prompt') {
      this.handlePromptBack();
    } else {
      var updated = await updateOnboardingCompleted(client.Id, client.Token);
      this.props.navigation.navigate('Main');
    }
  }

  handleSignature = async signature => {
    var { client, coach, contract, prompt, nav } = this.state;
    // Upload signature to DB.
    var clientName = client.FirstName + ' ' + client.LastName;
    this.setState({visible:false,refreshing:true});
    var upload = await uploadSignature(client.Token, client.Id, clientName, contract.Id, contract.File, signature, prompt.Id);
    if (upload) {
      var updated = await updatePromptAssoc(client.Token, client.Id, coach.Id, prompt.Id);
      this.setState({refreshing:true});
      if (updated) {
        Alert.alert(
          "Contract signed!",
          'Thank you for signing! Press OK to continue.',
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
    }
  }

  async optOut(contractSigned, prompt, client, nav) {
    Alert.alert(
      "Opt out of contract?",
      'Pressing Yes will opt you out of this contract. Be sure you have read the contract and understand the ramifications. Are you sure?',
      [
        {
          text: "Yes",
          onPress: async () => {
            if (nav == 'Prompt') {
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
            } else {
              var optedOut = await optOutOfContract(contractSigned.Id, client.Id, client.Token);
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

  showOptOutOptions(contractSigned, contract, prompt, client, nav) {
    if (contractSigned.OptedOut == 0) {
      return (<View style={contractStyles.bottomContainer}>
        <Text style={contractStyles.text}>Signed on {parseSimpleDateText(sqlToJsDate(prompt.CompletedDate))}</Text>
        <Text style={contractStyles.text}>Terminate this contract by opting out:</Text>
        <Button
        title='Opt Out'
        buttonStyle={contractStyles.buttonOptOut}
        containerStyle={contractStyles.buttonContainer}
        onPress={() => this.optOut(contractSigned, prompt, client, nav)}/>
      </View>);
    } else {
      return (<View style={contractStyles.bottomContainer}>
        <Text style={contractStyles.text}>You have opted out of this contract.</Text>
      </View>);
    }
  }

  render() {

    var { refreshing, contract, contractSigned, prompt, client, nav, visible, sig, httpError } = this.state;

    if (refreshing == true) {
      return (<SafeAreaView>
        <NavBack goBack={() => this.props.navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </SafeAreaView>);
    } else {
      if (prompt.Completed == 0) {
        var url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + contract.File;
        var adjustedHeight = windowHeight - 25 - 1 - 22 - 20-120;
        var mTop = parseInt((adjustedHeight/2)-68);
        return (<SafeAreaView>
          <NavBackCenterText text={contract.Title} goBack={() => this.props.navigation.goBack()} />
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
            { (contract.CanBeOptedOut == 1) ? this.showOptOutOptions(contractSigned, contract, prompt, client, nav) : (<View style={contractStyles.bottomContainerSigned}>
              <Text style={[contractStyles.text,{marginTop:4,fontSize:18}]}>Signed on {parseSimpleDateText(sqlToJsDate(prompt.CompletedDate))}</Text>
            </View>)}
          </View>
          {this.showModal(visible, sig)}
        </SafeAreaView>);
      }
    }
  }

}
