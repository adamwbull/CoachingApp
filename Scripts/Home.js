import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Alert, ScrollView, Animated, AsyncStorage, Linking, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { homeStyles, feedMediaWidth, windowHeight, colors } from './Styles.js';
import { NavProfileRight } from './TopNav.js';
import { getLinkItems, getFeed, sqlToJsDate, parseSimpleDateText } from '../Scripts/API.js';
import { Button } from 'react-native-elements';
import { Video, AVPlaybackStatus } from 'expo-av';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      opacity: new Animated.Value(0),
      coach:{FirstName:'Loading',LastName:'Coach...'},
      links:[],
      feed:[]
    };
  }

  async componentDidMount() {
    var coach = JSON.parse(await AsyncStorage.getItem('Coach'));
    var links = await getLinkItems(coach.Id);
    var feed = await getFeed(coach.Id);
    this.setState({coach:coach,links:links,feed:feed,refreshing:false});
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  showMedia(post) {

    var feedMediaHeight = 0;
    if (post.ImageSize == 0) {
      feedMediaHeight = parseInt(feedMediaWidth*(9/16));
    } else {
      feedMediaHeight = feedMediaWidth;
    }

    if (post.Type == 1) {
      return (<View style={homeStyles.feedPhotoContainer}>
          <Animated.Image
            onLoad={this.onLoad}
            source={{ uri: post.Image }}
            resizeMode="cover"
            style={{
              opacity: this.state.opacity,
              flex:1,
              width:feedMediaWidth,
              height:feedMediaHeight,
              borderBottomLeftRadius:25,
              borderBottomRightRadius:25,
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
        </View>);
    } else if (post.Type == 2) {
      return (<View style={homeStyles.feedEmbedContainer}>
        <WebView
            style={{flex:1,
            width:feedMediaWidth,
            height:feedMediaHeight,
            borderBottomLeftRadius:25,
            borderBottomRightRadius:25}}
            javaScriptEnabled={true}
            source={{uri: post.Video}}
        />
      </View>);
    } else if (post.Type == 3) {
      return (<View style={homeStyles.feedVideoContainer}>
        <Video
          style={{flex:1,
          width:feedMediaWidth,
          height:feedMediaHeight,
          borderBottomLeftRadius:25,
          borderBottomRightRadius:25}}
          source={{
            uri: post.Video,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>);
    }
  }

  feed() {

    var feed = this.state.feed;
    if (feed === false) {
      return (<View style={homeStyles.feed}>
      </View>);
    } else {
      var coach = this.state.coach;
      return (<View style={homeStyles.feed}>
        <Text style={homeStyles.feedHeaderText}>Feed</Text>
        {feed.map((post) => {
          var date = sqlToJsDate(post.Created);
          return (<View key={post.Id} style={homeStyles.feedPost}>
            <View style={homeStyles.feedHeaderContainer}>
              <View style={homeStyles.feedHeader}>
                <View style={homeStyles.feedAvatarContainer}>
                  <Animated.Image
                    onLoad={this.onLoad}
                    source={{ uri: coach.Avatar }}
                    resizeMode="contain"
                    style={[
                      {
                        opacity: this.state.opacity,
                        transform: [
                          {
                            scale: this.state.opacity.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.85, 1],
                            })
                          },
                        ],
                      },
                      homeStyles.feedAvatar
                    ]}
                  />
                </View>
                <View style={homeStyles.feedInfoContainer}>
                  <Text style={homeStyles.feedCoachName}>{coach.FirstName + ' ' + coach.LastName}</Text>
                  <Text style={homeStyles.feedPostCreated}>{parseSimpleDateText(date)}</Text>
                </View>
              </View>
            </View>
            <View style={homeStyles.feedBody}>
              <Text style={homeStyles.feedBodyText}>{post.Text}</Text>
            </View>
            {this.showMedia(post)}
          </View>);
        })}
      </View>);
    }
  }

  async handleLinkPress(type, link) {

    if (type === 0) {
      // Link is a web link.
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(link);
      } else {
        Alert.alert('There was a problem with this link. Let your coach know so they can fix it!');
      }
    } else {
      // Link is in-app.
      this.props.navigation.navigate(link);
    }

  }

  linkItems() {

    var links = this.state.links;

    if (links === false) {
      return (<View style={homeStyles.linkItems}>
      </View>);
    } else {
      return (<View style={homeStyles.linkItems}>
        {links.map((link) => {
          return (<Button
          key={link.Text}
          title={link.Text}
          buttonStyle={homeStyles.button}
          containerStyle={homeStyles.buttonContainer}
          onPress={() => this.handleLinkPress(link.Type, link.Link)}/>);
        })}
      </View>);
    }

  }

  getCoach(coach) {

    return (<View style={homeStyles.mainContainer}>
      <View style={homeStyles.avatarContainer}>
        <Animated.Image
          onLoad={this.onLoad}
          source={{ uri: coach.Avatar }}
          resizeMode="contain"
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            homeStyles.image
          ]}
        />
        <Text style={homeStyles.nameTitle}>{coach.FirstName + ' ' + coach.LastName}</Text>
        <Text style={homeStyles.bio}>{coach.Bio}</Text>
      </View>
      {this.linkItems()}
      {this.feed()}
    </View>);

  }

  render() {

    var coach = this.state.coach;

    if (this.state.refreshing == true) {
      return (<ScrollView contentContainerStyle={{alignItems: 'center',
      justifyContent: 'center',backgroundColor:colors.clouds,paddingBottom:windowHeight}}>
        <NavProfileRight />
        <Text style={homeStyles.coachTitle}>Your Coach</Text>
        <ActivityIndicator size="large" color={colors.forest} style={{marginTop:25}} />
      </ScrollView>);
    } else {
      return (<ScrollView contentContainerStyle={homeStyles.container}>
        <NavProfileRight />
        <Text style={homeStyles.coachTitle}>Your Coach</Text>
        {this.getCoach(coach)}
      </ScrollView>);
    }

  }

}
