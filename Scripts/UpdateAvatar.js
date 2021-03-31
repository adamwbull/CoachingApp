import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, Alert, Image, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageManipulator } from 'expo-image-crop';
import HybridTouch from '../Components/HybridTouch.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, updateAvatar } from '../Scripts/Styles.js';
import { uploadAvatar } from '../Scripts/API.js';
import { NavBack } from './TopNav.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const noImage = require('../assets/no_photo.png');
import * as ImageManipulatorOG from 'expo-image-manipulator';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

//
export default class UpdateAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      isVisible: false,
      uri: null,
      imageHeight:0,
      imageWidth:0,
      cropCompleted:false
    };
  }

  handleBack() {
    this.props.route.params.onGoBack();
    this.props.navigation.navigate('ClientProfile');
  }

  async onToggleModal() {
      const { isVisible, imageHeight, imageWidth, uri } = this.state;
      var res;
      var completed = false;
      if (isVisible === true) {
        const crop = {
          originX: 0,
          originY: (imageHeight - imageWidth) / 2,
          width: imageWidth,
          height: imageWidth
        };
        completed = true;
        res = await ImageManipulatorOG.manipulateAsync(uri, [{crop:crop},{resize:{width:400,height:400}}]);
      }
      this.setState({ cropCompleted: completed, isVisible: !isVisible, uri:res.uri, imageHeight:res.height, imageWidth:res.width })
  }

  async scaleImage() {
      const { isVisible, imageHeight, imageWidth, uri } = this.state;
      var res;
      const crop = {
        originX: 0,
        originY: (imageHeight - imageWidth) / 2,
        width: imageWidth,
        height: imageWidth
      };
      var completed = true;
      res = await ImageManipulatorOG.manipulateAsync(uri, [{crop:crop},{resize:{width:400,height:400}}]);
      this.setState({ cropCompleted: completed, isVisible: !isVisible, uri:res.uri, imageHeight:res.height, imageWidth:res.width })
  }

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.setState({
          uri: result.uri,
          imageHeight:result.height,
          imageWidth:result.width,
        }, () => this.scaleImage())
      }
    }
  };

  _pickCameraImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.setState({
          uri: result.uri,
          imageHeight:result.height,
          imageWidth:result.width,
        }, () => this.scaleImage())
      }
    }
  };

  async onPress() {
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var upload = await uploadAvatar(this.state.uri, client.Token);
    if (upload === true) {
      Alert.alert(
        "Looks great!",
        "Your avatar has been updated.",
        [
          {
            text: "OK",
            onPress: () => this.handleBack(),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.handleBack(),
        }
      );
    } else {
      Alert.alert(
        "Error Uploading",
        "Your avatar couldn't be updated. Please try again later.",
        [
          {
            text: "OK",
            onPress: () => this.handleBack(),
            style: "OK",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => this.handleBack(),
        }
      );
    }
  }

  render() {
      const { uri, isVisible, cropCompleted } = this.state;
      const { width, height } = Dimensions.get('window');
      const dim2 = parseInt((width*0.7));
      return (
            <SafeAreaView>
            <NavBack goBack={() => this.props.navigation.navigate('ClientProfile')} />
                {cropCompleted ? (<View style={{justifyContent:'center',alignItems:'center'}}>
                  <Image resizeMode="contain"
                      style={{
                          width:dim2, height:dim2, marginTop:60,marginBottom: 40, backgroundColor: '#fcfcfc',borderRadius:200,
                      }}
                      source={{ uri }}
                  />
                  <Button
                  title='Save Avatar'
                  buttonStyle={updateAvatar.submitButton}
                  containerStyle={updateAvatar.submitButtonContainer}
                  onPress={() => this.onPress()}/>
                  <Text style={updateAvatar.text}>Or choose another photo...</Text>
                </View>) : <View><Image source={noImage} style={{tintColor:colors.darkGray,marginTop:70,width:dim2,height:dim2}}/><Text style={updateAvatar.text}>Select an image for your avatar...</Text></View>}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: colors.clouds,
                    position: 'absolute',
                    bottom: 0,
                }}
                >
                    <HybridTouch style={updateAvatar.imageSelectButtonLeft} onPress={() => this._pickImage()}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon size={30} name="photo" color={colors.forest} />
                            <Text style={{ color:colors.forest, fontSize: 18 }}>Gallery</Text>
                        </View>
                    </HybridTouch>
                    <HybridTouch style={updateAvatar.imageSelectButtonRight} onPress={() => this._pickCameraImage()}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon size={30} name="photo-camera" color={colors.forest} />
                            <Text style={{ color: colors.forest, fontSize: 18 }}>Camera</Text>
                        </View>
                    </HybridTouch>
                </View>
                {/*
                    uri
                && (
                  <ImageManipulator
                      photo={{ uri }}
                      isVisible={isVisible}
                      onPictureChoosed={({ uri: uriM }) => { this.setState({ uri: uriM }); }}
                      onToggleModal={this.onToggleModal.bind(this)}
                      allowRotate={false}
                      allowFlip={false}
                      fixedMask={{width,height}}
                  />
                )*/
              }
            </SafeAreaView>
        )
  }

}
