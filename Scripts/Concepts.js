import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavProfileRight } from './TopNav.js';
import { getConcepts, sqlToJsDate, parseDateText, parseSimpleDateText } from '../Scripts/API.js';
import { windowHeight, colors, conceptsStyles } from './Styles.js';

//
export default class Concepts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing : true,
      concepts: []
    };
  }

  async getData() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var client = JSON.parse(await AsyncStorage.getItem('Client'));
    var concepts = await getConcepts(coach.Id, client.Id);
    this.setState({concepts:concepts,refreshing:false});
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
          } else if (concept.Concept[0][0].Type == 3 || concept.Concept[0][0].Type == 6) {
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

    var concepts = this.state.concepts;
    var mainContainerStyle;
    var conceptsLength = concepts.length;
    if (conceptsLength >= 7) {
      mainContainerStyle = conceptsStyles.mainContainer;
    } else {
      if (conceptsLength == undefined) {
        conceptsLength = 1;
      }
      var margin = parseInt(windowHeight-((windowHeight/5)*conceptsLength));
      mainContainerStyle = { backgroundColor:colors.clouds,
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      marginBottom:margin};
    }
    return (<ScrollView contentContainerStyle={conceptsStyles.container}>
      <View style={mainContainerStyle}>
        <NavProfileRight />
        <Text style={conceptsStyles.conceptsTitle}>Concepts</Text>
        {this.showConcepts(concepts)}
      </View>
    </ScrollView>);
  }

}
