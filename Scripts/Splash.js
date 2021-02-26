import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Modal, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { splashStyles } from '../Scripts/Styles.js';

// Splash screen for checking user status on app load.
export default class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : false,
      modalVisible: false
    };
  }

  componentDidMount = () => AsyncStorage.getItem('User').then((value) => this.setState({'value':value}));

  render() {

    var openModal = 0;

    if (this.state.value !== null) {
      this.props.navigation.navigate('Home');
    } else {.
      this.setState({modalVisible:true});
    }

    return (<View style={splashStyles.container}>
      <Image style={{width:'80%',resizeMode:'contain'}} source={require('../assets/splash.png')} />
      <Modal
          animationType="slide",
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false})
          }}
      >
      <View>
        // Prompt for Enter OnboardingId
      </View>
      </Modal>
    </View>);

  }

}
