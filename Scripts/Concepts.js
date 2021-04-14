import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RefreshControl, TouchableOpacity, AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavCenterTextProfileRight } from './TopNav.js';
import { getConcepts, sqlToJsDate, parseDateText, parseSimpleDateText } from '../Scripts/API.js';
import { windowHeight, colors, conceptsStyles } from './Styles.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default class Concepts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      concepts: [],
      pullRefresh: false
    };
  }

  async getData() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var concepts = await getConcepts(coach.Id, client.Id);
    this.setState({concepts:concepts,refreshing:false,pullRefresh:false});
  }

  onRefresh = () => {
    this.setState({pullRefresh:true});
    this.getData();
    wait(1000).then(() => this.setState({pullRefresh:false}));
  }

  async componentDidMount() {
    this.getData();
  }

  openConcept(concept) {
    this.props.navigation.navigate('ViewConcept', { concept:concept, onGoBack: () => this.getData() });
  }

  showConcepts(concepts) {

    if (concepts == false) {
      if (this.state.refreshing == true) {
        return (<ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />);
      } else {
        return(<View style={conceptsStyles.conceptsContainer}>
            <Text style={conceptsStyles.emptyText}>No concepts yet!</Text>
          </View>);
      }
    } else {
      return(<View style={conceptsStyles.conceptsContainer}>
        {concepts.map((concept) => {
          var created = sqlToJsDate(concept.Created);
          var displayInfo, displayStyle;
          displayInfo = 'Shared on ' + parseSimpleDateText(created);
          displayStyle = conceptsStyles.conceptInfo;
          // Item is a Concept.
          if (concept.Concept[0][0].Type == 0) {
            // Concept is Text only.
            concept.IconName = 'bulb';
          } else if (concept.Concept[0][0].Type == 3) {
            // Concept includes File.
            concept.IconName = 'document';
          } else if (concept.Concept[0][0].Type == 1 || concept.Concept[0][0].Type == 2 || concept.Concept[0][0].Type == 4 || concept.Concept[0][0].Type == 5) {
            // Concept includes Video.
            concept.IconName = 'film';
          }
          return (<TouchableOpacity
            onPress={() => this.openConcept(concept)}
            key={concept.Concept[0][0].Id}
            style={conceptsStyles.concept}>
            <View style={conceptsStyles.conceptIconContainer}>
              <IonIcon name={concept.IconName} size={40} color={colors.blueGray} />
            </View>
            <View style={conceptsStyles.conceptBodyContainer}>
              <Text style={conceptsStyles.conceptHeader}>{concept.Concept[0][0].Title}</Text>
              <Text style={displayStyle}>{displayInfo}</Text>
            </View>
            <View style={conceptsStyles.conceptOpenIcon}>
              <IonIcon name='chevron-forward' size={30} color={colors.blueGray} />
            </View>
          </TouchableOpacity>);
        })}
      </View>);
    }
  }

  render() {

    var { concepts, pullRefresh } = this.state;

    return (<SafeAreaView>
      <NavCenterTextProfileRight text='Concepts' navRight={() => this.props.navigation.navigate('ClientProfile')} />
      <ScrollView contentContainerStyle={conceptsStyles.container}
      refreshControl={
        <RefreshControl
          tintColor={colors.forest}
          colors={[colors.forest,colors.emerald]}
          refreshing={pullRefresh}
          onRefresh={this.onRefresh}/>
      }>
        <View style={conceptsStyles.mainContainer}>
          {this.showConcepts(concepts)}
        </View>
      </ScrollView>
    </SafeAreaView>);
  }

}
