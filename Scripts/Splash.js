import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback, Keyboard, TextInput, Modal, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { splashStyles } from '../Scripts/Styles.js';
import { Button, Input } from 'react-native-elements';

// Splash screen for checking user status on app load.
export default class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      inputValue:'',
      inputStyle:splashStyles.input,
      inputError:''
    };
  }

  componentDidMount = () => AsyncStorage.getItem('User').then((val) => this.handleValue(val));

  async handleValue(val) {
    if (val !== null) {
      this.props.navigation.navigate('Main');
    } else {
      this.setState({modalVisible:true});
    }
  }

  onChange(text, submitRef) {
    this.setState({inputValue:text,inputStyle:splashStyles.input,inputError:''});
  }

  onSubmit() {

    // Check if valid Coach ID.
    if (0) {
      //
    } else {
      this.setState({inputError:'Incorrect Coach ID!',inputStyle:splashStyles.inputError});
    }
  }

  showError() {
    if (this.state.inputError !== '') {
      return (<Text style={splashStyles.error}>{this.state.inputError}</Text>);
    } else {
      return null;
    }
  }

  render() {

    const submitRef = React.createRef();

    return (<View style={splashStyles.container}>
      <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({modalVisible:false}) }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={splashStyles.modalContainer}>
            <Image
              style={splashStyles.image}
              source={require('../assets/splash.png')}
              resizeMode="contain"
            />
            <Text style={splashStyles.title}>Enter Coach ID:</Text>
            <Input
              containerStyle={this.state.inputStyle}
              style={{textAlign:'center',paddingTop:25}}
              inputContainerStyle={splashStyles.inputContainerStyle}
              keyboardType='number-pad'
              onChangeText={text => this.onChange(text)}
              value={this.state.inputValue}
              ref={submitRef}
            />
            {this.showError()}
            <Button
              containerStyle={splashStyles.buttonContainer}
              buttonStyle={splashStyles.button}
              title="Submit"
              onPress={() => this.onSubmit()}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>);

  }

}
