import { Appearance, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logoRatio = windowWidth/1600;
export const logoLeft = (windowWidth-(windowWidth*0.8))/4;
export const feedMediaWidth = parseInt(windowWidth-(windowWidth*0.1));
export const windowHeightConceptVideo = windowHeight - (windowHeight*0.5);

var colorScheme = Appearance.getColorScheme();
console.log(colorScheme);
export const colors = (colorScheme == 'dark') ? {
  emerald: '#2ecc71',
  forest: '#27ae60',
  clouds: '#ecf0f1',
  blueGray: '#344150',
  darkGray: '#23272a',
  black: '#000000',
  white: '#ffffff',
  red: '#e74c3c',
} : {
  emerald: '#2ecc71',
  forest: '#27ae60',
  clouds: '#000000',
  blueGray: '#f5f6fa',
  darkGray: '#ecf0f1',
  black: '#ffffff',
  white: '#23272a',
  red: '#e74c3c',
};

export const colorsPerm = {
  emerald: '#2ecc71',
  forest: '#27ae60',
  clouds: '#ecf0f1',
  blueGray: '#344150',
  darkGray: '#23272a',
  black: '#000000',
  white: '#ffffff',
  red: '#e74c3c'
}

export const mode = 'light';

export const btnColors = {
  primary:'#3498db',
  caution:'#f1c40f',
  danger:'#e74c3c',
  success:'#2ecc71',
  info:'#48dbfb',
}

export const messageColors = {
  me:'#3498db',
  them:'#ffffff'
}

export const messageColorsDark = {
  me:'#3498db',
  them:'#303030'
}

export const defaultClientLevels = [
  {
    title: ''
  },
];

export const levelScale = {
  baseColor: '',
  completeColor: ''
}

export const adjustedTrophyBottomContainerHeight = parseInt(windowHeight*0.5);
export const trophyImageDim = parseInt(windowWidth/2);
export const trophyImageDim2 = parseInt(trophyImageDim/2);
export const awardTrophyStyles = StyleSheet.create({
  refreshingContainer: {
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%'
  },
  container: {
    width:'100%',
    flexDirection:'column',
    justifyContent:'flex-end',
    width:'100%',
    height:'100%'
  },
  newAchievement: {
    color:colors.darkGray,
    textAlign:'center',
    fontSize:38,
    marginBottom:trophyImageDim2+15,
  },
  bottomContainer: {
    width:windowWidth,
    height:adjustedTrophyBottomContainerHeight,
    backgroundColor:colors.white,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
  },
  trophyImage: {
    position:'absolute',
    top:-trophyImageDim2,
    left:trophyImageDim2,
    width: trophyImageDim,
    height: trophyImageDim,
    resizeMode: 'contain'
  },
  trophyTitle: {
    color:colors.darkGray,
    fontSize:32,
    textAlign:'center',
    fontWeight:'700',
    marginTop:trophyImageDim2+25,
  },
  trophyDescription: {
    color:colors.darkGray,
    fontSize:18,
    textAlign:'center',
    marginBottom:25
  },
  button: {
    backgroundColor:btnColors.primary,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%',
  },
  buttonContainer: {
    marginTop:10,
    marginLeft:'25%',
    width:'50%',
    borderRadius:50
  },
  happyText: {
    color:colors.darkGray,
    textAlign:'center',
    fontSize:18,
    marginTop:25,
  }
});

export const videoChatStyles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: windowWidth,
    height: windowHeight - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});

export const contractStyles = StyleSheet.create({
  container: {
    width:'100%'
  },
  fileMainContainer: {
    backgroundColor:colors.white,
    width:'100%',
  },
  fileConceptContainer: {
    backgroundColor:colors.white
  },
  bottomContainer:{
    height:120,
    justifyContent:'flex-start',
    backgroundColor:colors.white,
    borderTopWidth:2,
    borderTopColor:colors.forest,
  },
  text: {
    color:colors.darkGray,
    marginTop:10,
    fontSize:14,
    textAlign:'center'
  },
  button: {
    backgroundColor:btnColors.primary,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  buttonContainer: {
    marginTop:10,
    marginLeft:'25%',
    width:'50%',
    borderRadius:50
  },
  signatureContainer: {
    flex:1,
    borderTopWidth:2,
    borderTopColor:colors.forest,
  },
  closeButton: {
    backgroundColor:btnColors.danger,
    padding:10,
    textAlign:'center',
    width:'100%',
    fontSize:14,
  },
  closeButtonContainer: {
    width:'100%',
    fontSize:14,
    borderRadius:0
  },
  agreeTop: {
    color:colorsPerm.darkGray,
    fontSize:14,
    textAlign:'center',
    marginBottom:10,
  },
  bottomContainerSigned: {
    height:60,
    justifyContent:'center',
    backgroundColor:colors.white,
    borderTopWidth:2,
    borderTopColor:colors.forest,
  },
  buttonOptOut: {
    backgroundColor:btnColors.danger,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
})

export const previousPaymentsStyles = StyleSheet.create({
  listItemsTitle: {
    marginLeft:'2%',
    fontSize:25,
    marginBottom:10,
    marginTop:30,
    fontWeight:'500',
    color:colors.darkGray,
  },
  listItems: {
    width:'100%'
  },
  listItem: {
    backgroundColor:colors.white,
    borderBottomWidth:0.5,
    borderBottomColor:colors.white
  },
  listItemTitle: {
    color:colors.darkGray,
  },
})

export const paymentStyles = StyleSheet.create({
  container: {
    padding:10,
    marginLeft:'3%',
    marginRight:'3%',
    width:'94%',
    borderRadius:25,
    marginTop:15,
    backgroundColor:colors.white
  },
  title: {
    fontSize:30,
    color:colors.darkGray,
    textAlign:'center',
  },
  memo: {
    textAlign:'center',
    fontSize:18,
    color:colors.darkGray
  },
  amountTitle: {
    fontSize:22,
    textAlign:'center',
    color:colors.darkGray,
    marginTop:15,
  },
  amountContainer: {
    backgroundColor:colors.darkGray,
    padding:10,
    borderRadius:25,
    width:'60%',
    marginLeft:'20%'
  },
  amountText: {
    textAlign:'center',
    fontSize:25,
    color:colors.white,
  },
  dueDate: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:18,
    marginBottom:15,
    marginTop:5,
  },
  submitButton: {
    backgroundColor:btnColors.success,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonStripe: {
    backgroundColor:'#5433ff',
    color:'white',
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonPayPal: {
    backgroundColor:btnColors.primary,
    color:'white',
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonContainer: {
    marginBottom:10,
    marginTop:10,
    width:'50%',
    borderRadius:50,
    marginLeft:'25%'
  },
  modalContainer: {
    flex:1,
    backgroundColor:'white',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  creditTitle: {
    textAlign:'center',
    color:colorsPerm.darkGray,
    fontSize:25,
    marginTop:30,
  },
  cardHolderLabel: {
    fontWeight:'bold',
    marginLeft:20,
    marginTop:20,
  },
  cardHolderInput: {
    color:'black',
    height:40,
    marginLeft:20,
    borderBottomWidth:1,
    borderBottomColor:'black',
    width:windowWidth*0.7
  },
  errorText: {
    fontSize:18,
    textAlign:'center',
    color:btnColors.danger
  }
})

export const messageThreadStyles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection:'column',
    justifyContent:'flex-end'
  },
  noMessagesText: {
    textAlign:'center',
    marginTop:25,
    fontSize:16,
    fontWeight:'300',
    color:colors.darkGray
  },
  scrollView: {
    height:windowHeight-122
  },
  scrollViewImagePicked: {
    height:windowHeight-122
  },
  scrollViewStyle: {
    flexGrow:1,
    justifyContent:'flex-end'
  },
  messagesView: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20,
    justifyContent:'flex-end'
  },
  userInput: {
    borderTopWidth:2,
    borderTopColor:colors.forest,
    backgroundColor:colors.white,
    width:'100%',
  },
  selectedImageContainer: {
    paddingLeft:'3%',
    paddingRight:'3%',
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row',
  },
  removeImage: {
    width:30,
    height:30,
    alignItems:'center'
  },
  messageInputContainer: {
    width:'100%',
    backgroundColor:colors.white,
    flexDirection:'row',
    paddingLeft:'3%',
    paddingRight:'3%',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
  },
  messageInput: {
    flex:8,
    padding:3,
    alignItems:'center',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  imageIcon: {
    alignItems:'flex-start',
    width:30
  },
  messageTextInput: {
    flex:5,
    fontSize:18,
    paddingLeft:13,
    paddingTop:0,
    paddingBottom:0,
    color:colors.black
  },
  countdown: {
    flex:1,
    textAlign:'right',
    marginRight:8,
    fontSize:16,
    alignItems:'flex-end',
  },
  messageInputSend: {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
    padding:3
  },
  messageInputSendText: {
    color:btnColors.primary,
    fontSize:18,
    textAlign:'right'
  },
  time: {
    color:colors.darkGray,
    fontSize:14,
    paddingBottom:0,
    paddingTop:25,
    fontStyle:'italic',
    textAlign:'center'
  },
  myMessageGroup: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-start'
  },
  myMessageSection: {
    width:windowWidth-80
  },
  myName: {
    color:colors.darkGray,
    fontSize:16,
    fontWeight:'500',
    textAlign:'right',
    marginRight:10
  },
  myMessage: {
    backgroundColor:messageColors.me,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'flex-end',
    marginTop:5,
  },
  myMessageImage: {
    backgroundColor:messageColors.me,
    borderTopLeftRadius:25,
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'flex-end',
    marginTop:5,
    width:windowWidth-80
  },
  myMessageAnImage: {
    width:windowWidth-80,
    height:200,
    resizeMode:'cover',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
  },
  myMessageAnImageSolo: {
    flex:1,
    width:windowWidth-80,
    height:200,
    marginTop:1,
    resizeMode:'cover',
    borderRadius:25
  },
  myMessageText: {
    color:'white',
    padding:15,
  },
  myMessageTextImage: {
    color:'white',
    padding:15,
    width:'100%'
  },
  myAvatar: {
    width:50,
    height:50,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  theirMessageGroup: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  theirAvatar: {
    width:50,
    height:50,
    marginRight:10,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  theirMessageSection: {
    width:windowWidth-80
  },
  theirName: {
    color:colors.darkGray,
    fontSize:16,
    fontWeight:'500',
    textAlign:'left'
  },
  theirMessage: {
    backgroundColor:messageColors.them,
    borderTopRightRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    alignItems:'center',
    alignSelf:'flex-start',
    marginTop:5,
  },
  theirMessageImage: {
    backgroundColor:messageColors.them,
    borderTopRightRadius:25,
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'flex-start',
    marginTop:5,
    width:windowWidth-80
  },
  theirMessageText: {
    color:colorsPerm.darkGray,
    padding:15,
  },
  theirMessageTextImage: {
    color:colors.darkGray,
    padding:15,
    width:'100%'
  },
  theirMessageAnImage: {
    flex:1,
    width:windowWidth-80,
    height:200,
    resizeMode:'cover',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
  },
  theirMessageAnImageSolo: {
    flex:1,
    width:windowWidth-80,
    height:200,
    resizeMode:'cover',
    borderRadius:25,
    marginTop:5,
  },
  reactions: {
    flexDirection:'row',
    justifyContent:'flex-start',
    width:windowWidth-80,
  },
  reactionBox: {
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    marginRight:10,
    marginTop:5,
    backgroundColor:colors.white,
  },
  reactionBoxInternal: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  reaction: {
    fontSize:20,
  },
  reactionCounter: {
    fontSize:16,
    marginLeft:3,
    color:colors.darkGray,
  },
  listItem: {
    backgroundColor:colors.white,
    borderBottomWidth:0.5,
    borderBottomColor:colors.white
  },
  listItemTitle: {
    color:colors.darkGray,
  },
});

export const messagesStyles = StyleSheet.create({
  container: {
    width:'100%',
  },
  scrollView: {
    width:'100%',
    height:windowHeight*0.8,
    backgroundColor:colors.clouds,
    marginTop:25
  },
  convo: {
    width:'94%',
    marginLeft:'3%',
    marginRight:'3%',
    flexDirection:'row',
    padding:10,
    borderRadius:25,
    backgroundColor:colors.white,
    height:80,
    marginBottom:10
  },
  convoInfo: {
    justifyContent:'center',
    flex:1,
    marginLeft:10,
    marginRight:10,
  },
  convoInfoTop: {
    flexDirection:'row',
    flexWrap: "wrap",
    justifyContent:'space-between',
    alignItems:'center'
  },
  lastSender: {
    fontSize:16,
    fontWeight:'500',
    color:colors.darkGray,
    flex:2
  },
  convoTime: {
    fontWeight:'300',
    color:colors.darkGray,
    textAlign:'right',
    flex:1,
    fontSize:16
  },
  convoUser: {
    color:colors.darkGray
  },
  convoTime: {
    color:colors.darkGray
  },
  lastMessage: {
    fontSize:14,
    fontWeight:'300',
    fontStyle:'italic',
    color:colors.darkGray
  },
})

export const trophiesStyles = StyleSheet.create({
  container: {
    width:'100%',
    height:windowHeight
  },
  mainContainer: {
    marginLeft:'3%',
    marginRight:'3%',
    marginTop:25,
    marginBottom:25,
    backgroundColor:colors.white,
    borderRadius:25,
    width:'94%',
    padding:10,
  },
  title: {
    fontSize:30,
    color:colors.darkGray,
    textAlign:'center',
  },
  completedCount: {
    fontSize:20,
    color:btnColors.caution,
    fontWeight:'500',
    textAlign:'center'
  },
  trophyItem: {
    flexDirection:'row',
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  trophyImage: {
    width:70,
    height:70
  },
  trophyInfo: {
    flex:1,
    alignItems:'flex-start',
    justifyContent:'center',
    marginLeft:10
  },
  trophyTitle: {
    color:colors.darkGray,
    fontSize:18,
    fontWeight:'700'
  },
  trophyDescription: {
    color:colors.darkGray,
    fontSize:14,
    fontWeight:'300'
  }

})

export const deleteAccountStyles = StyleSheet.create({
  container: {
    width:'100%'
  },
  form: {
    marginTop:25,
    marginLeft:'3%',
    marginRight:'3%',
    width:'94%',
    backgroundColor:colors.white,
    borderRadius:25,
    padding:10
  },
  title: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:35,
    marginBottom:10
  },
  errorText: {
    marginBottom:5,
    textAlign:'center',
    color:btnColors.danger,
    fontSize:16
  },
  lastUpdatedText: {
    marginBottom:5,
    textAlign:'center',
    color:colors.darkGray,
    fontSize:16
  },
  submitButton: {
    backgroundColor:btnColors.danger,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonContainer: {
    marginBottom:10,
    width:'50%',
    borderRadius:50,
    marginLeft:'25%'
  },
  iconStyle: {
    marginRight:5
  }
});

export const changePassword = StyleSheet.create({
  container: {
    width:'100%',
  },
  form: {
    marginTop:25,
    marginLeft:'3%',
    marginRight:'3%',
    width:'94%',
    backgroundColor:colors.white,
    borderRadius:25,
    padding:10
  },
  title: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:35,
    marginBottom:10
  },
  errorText: {
    marginBottom:5,
    textAlign:'center',
    color:btnColors.danger,
    fontSize:16
  },
  lastUpdatedText: {
    marginBottom:5,
    textAlign:'center',
    color:colors.darkGray,
    fontSize:16
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonContainer: {
    marginBottom:10,
    width:'50%',
    borderRadius:50,
    marginLeft:'25%'
  },
  iconStyle: {
    marginRight:5
  }
});

export const updateAvatar = StyleSheet.create({
  container: {
    width:'100%'
  },
  imageSelectButtonLeft: {
    flex:1,
    alignItems:'center',
    backgroundColor:colors.white,
    marginLeft:10,
    marginRight:5,
    marginBottom:10,
    borderRadius:25,
    borderWidth:2,
    borderColor:colors.forest,
    padding:10
  },
  imageSelectButtonRight: {
    flex:1,
    alignItems:'center',
    backgroundColor:colors.white,
    marginLeft:5,
    marginRight:10,
    marginBottom:10,
    borderRadius:25,
    borderWidth:2,
    borderColor:colors.forest,
    padding:10,
  },
  text: {
    textAlign:'center',
    fontSize:20,
    color:colors.darkGray
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  submitButtonContainer: {
    marginBottom:25,
    width:'50%',
    borderRadius:50
  },
});

export const bugReport = StyleSheet.create({
  container: {
    width:'100%',
    height:windowHeight
  },
  form: {
    width:'92%',
    backgroundColor:colors.white,
    marginLeft:'4%',
    marginRight:'4%',
    marginBottom:25,
    marginTop:25,
    borderRadius:25,
    padding:10,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:35,
    marginBottom:10
  },
  inputLabel: {
    textAlign:'left',
    width:'100%',
    fontSize:18,
    fontWeight:'500',
    color:colors.darkGray
  },
  description: {
    textAlign:'left',
    width:'100%',
    fontSize:14,
    fontWeight:'300',
    color:colors.darkGray,
    marginBottom:10
  },
  submitButtonContainer:{
    width:'60%',
    marginBottom:10,
    borderRadius:25
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15
  }
})

export const navStyles = StyleSheet.create({
  nav: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor:colors.white,
    paddingBottom:10,
    paddingTop:10,
    borderBottomWidth:2,
    borderBottomColor:colors.forest,
    borderTopWidth:2,
    borderTopColor:colors.forest,
    height:60
  },
  image: {
    flex: 1,
    width: 100,
    height: 50,
    resizeMode: 'contain',
    tintColor:colors.forest
  },
  left: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  center: {
    flex:6,
    justifyContent:'center',
    alignItems:'center',
  },
  right: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  navBackCenterText: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:20
  }
});

export const clientProfileStyles = StyleSheet.create({
  container: {
    width:'100%',
  },
  button: {
    backgroundColor:btnColors.danger,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  buttonContainer: {
    marginTop:20,
    marginLeft:'25%',
    width:'50%',
    borderRadius:50
  },
  avatarContainer: {
    width:'96%',
    marginLeft:'2%',
    marginRight:'2%',
    marginTop:25,
    marginBottom:15,
    backgroundColor:colors.white,
    borderRadius:80,
    flex:1,
    flexDirection:'row'
  },
  avatarLeft: {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    marginTop:10,
    marginBottom:10
  },
  userInfo: {
    flex:5,
    marginLeft:10,
    justifyContent:'center'
  },
  userName: {
    fontSize:22,
    fontWeight:'500',
    color:colors.darkGray
  },
  userCreated: {
    fontSize:14,
    fontWeight:'300',
    color:colors.darkGray
  },
  listItemsTitle: {
    marginLeft:'2%',
    fontSize:20,
    marginBottom:10,
    marginTop:10,
    fontWeight:'500',
    color:colors.darkGray,
  },
  listItem: {
    backgroundColor:colors.white,
    borderBottomWidth:0.5,
    borderBottomColor:colors.white
  },
  listItemTitle: {
    color:colors.darkGray,
  },
  trophyContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    marginRight:15
  },
  trophyText: {
    color:btnColors.caution,
    textAlign:'center',
    fontSize:18
  },
  listItems: {
    width:'100%'
  },
  versionContainer: {
    marginTop:40,
    marginBottom:20
  },
  versionText: {
    textAlign:'center',
    fontWeight:'300',
    color:colors.darkGray
  }
})

export const viewConceptStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    paddingBottom:75
  },
  mainContainer: {
    backgroundColor:colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:25,
    marginTop:30,
    borderRadius:30,
    overflow:'hidden'
  },
  videoMainContainer: {
    backgroundColor:colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:windowHeightConceptVideo,
    marginTop:30,
    borderRadius:30,
    overflow:'hidden'
  },
  conceptContainer: {
    backgroundColor:colors.white,
    borderRadius:25,
    paddingTop:10
  },
  fileMainContainer: {
    backgroundColor:colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    overflow:'hidden'
  },
  fileConceptContainer: {
    backgroundColor:colors.white
  },
  conceptTitle: {
    color:colors.darkGray,
    textAlign:'center',
    fontSize:22,
    marginBottom:10
  },
  conceptText: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:15
  },
});

export const conceptsStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign:'center',
    fontSize:20,
    color:colors.darkGray
  },
  mainContainer: {
    marginTop:25,
    width:'100%',
    height:windowHeight
  },
  conceptsTitle: {
    marginTop:25,
    color:colors.darkGray,
    textAlign:'center',
    marginBottom:15,
    fontSize:40
  },
  conceptsContainer: {
    width:'100%',
  },
  concept: {
    backgroundColor:colors.white,
    flexDirection:'row',
    width:'94%',
    marginLeft:'3%',
    borderRadius:25,
    padding:10,
    marginBottom:20
  },
  conceptIconContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    borderRightColor:colors.clouds,
    borderRightWidth:1,
    marginRight:10,
    padding:5
  },
  conceptBodyContainer: {
    flex:8,
    justifyContent:'center'
  },
  conceptOpenIcon: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  conceptHeader: {
    color:colors.darkGray,
    fontWeight:'500'
  },
  conceptInfo: {
    color:colors.darkGray,
    fontWeight:'300'
  },
});

export const promptSurveyStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colors.darkGray
  },
  actualContainer: {
    backgroundColor: colors.white,
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    marginBottom:30,
    borderRadius:10
  },
  survey: {
    width:'80%',
    marginLeft:'10%',
    justifyContent:'center'
  },
  radioButton: {
    flexDirection:'row',
    backgroundColor:colors.white,
    borderRadius:5,
    marginBottom:10,
    justifyContent:'flex-start',
    alignItems:'center',
    marginLeft:10,
    marginRight:10
  },
  mainTitle: {
    padding:10,
    backgroundColor:colors.emerald,
    margin:20,
    borderRadius:10
  },
  mainTitleText: {
    fontSize:30,
    textAlign:'center',
    color:colors.white,
  },
  checkBoxButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:colors.white
  },
  radioButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:colors.white,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ededed'
  },
  itemQuestion: {
    fontSize:20,
    marginBottom:10,
    textAlign:'center',
    color:colors.darkGray,
    fontWeight:'500'
  },
  questionContainer: {
    marginBottom:25
  },
  questionSliderContainer: {
    marginBottom:45
  },
  sliderValue: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:16
  },
  sliderSet: {
    flexDirection:'row',
    width:'100%'
  },
  sliderSetRange: {
    flex:1,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center'
  },
  sliderDetails: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  sliderLeft: {
    textAlign:'left',
    alignSelf:'flex-start',
    color:colors.darkGray,
    marginTop:2,
    fontSize:12,
    flex:1
  },
  sliderRight: {
    textAlign:'right',
    alignSelf:'flex-start',
    color:colors.darkGray,
    marginTop:2,
    fontSize:12,
    flex:1
  },
  sliderSetRangeText: {
    color:colors.darkGray,
    fontSize:16,
    flex:1
  },
  sliderContainer: {
    flex:8
  },
  sliderThumb: {
    width:25,
    height:25,
    backgroundColor:colors.emerald
  },
  submitButtonContainer:{
    width:'60%',
    marginLeft:'20%',
    marginBottom:50,
    borderRadius:25
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15
  },
  errorText: {
    textAlign:'center',
    color:btnColors.danger,
    width:'80%',
    marginLeft:'10%',
    marginBottom:25
  }
});

export const viewPromptSurveyStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center'
  },
  promptContainer: {
    width:'100%'
  },
  survey: {
    marginLeft:'5%',
    marginRight:'5%',
    width:'90%',
    marginTop:25,
    marginBottom:100,
    borderRadius:25,
    backgroundColor:colors.white,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10
  },
  completedTextView: {
    backgroundColor:colors.forest,
    borderRadius:25,
    padding:10,
    marginBottom:15
  },
  completedText: {
    color:colors.white,
    textAlign:'center',
    fontSize:18,
  }
});

export const viewPromptStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    backgroundColor:colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:125,
    marginTop:25,
    borderRadius:25,
  },
  promptContainer: {
    width:'100%'
  },
  promptInput: {
    width:'100%',
    textAlign:'center',
    marginTop:20
  },
  promptTitle: {
    color:colors.darkGray,
    textAlign:'center',
    marginBottom:15,
    marginTop:15,
    fontSize:28,
    fontWeight:'500'
  },
  promptText: {
    textAlign:'center',
    color:colors.darkGray,
    fontSize:15
  },
  submitButtonContainer:{
    width:'60%',
    marginBottom:50,
    borderRadius:25
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15
  }
})

export const promptsStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor:colors.clouds,
    alignItems: 'center',
    width:'100%',
    height:windowHeight,
    marginTop:25,
  },
  emptyText: {
    textAlign:'center',
    fontSize:20,
    color:colors.darkGray
  },
  promptsTitle: {
    marginTop:25,
    color:colors.darkGray,
    textAlign:'center',
    marginBottom:15,
    fontSize:40
  },
  promptsContainer: {
    width:'100%',
  },
  prompt: {
    backgroundColor:colors.white,
    flexDirection:'row',
    width:'94%',
    marginLeft:'3%',
    borderRadius:25,
    padding:10,
    marginBottom:20
  },
  promptIconContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    borderRightColor:colors.clouds,
    borderRightWidth:1,
    marginRight:10,
    padding:5
  },
  promptBodyContainer: {
    flex:8,
    justifyContent:'center'
  },
  promptOpenIcon: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  promptHeader: {
    color:colors.darkGray,
    fontWeight:'500'
  },
  promptInfo: {
    color:colors.darkGray,
    fontWeight:'300'
  },
  promptInfoCompleted: {
    color:btnColors.success
  },
  promptInfoOptedOut: {
    color:btnColors.caution
  },
  overdueText: {
    color:btnColors.danger,
    fontWeight:'500',
    textAlign:'center',
    fontSize:12
  }
});

export const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor:colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  avatarContainer: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width:'40%',
    borderRadius:500,
    height:undefined,
    aspectRatio:1,
    backgroundColor:colors.darkGray
  },
  coachTitle: {
    marginTop:25,
    color:colors.darkGray,
    textAlign:'center',
    marginBottom:10,
    fontSize:40
  },
  nameTitle: {
    color:colors.darkGray,
    textAlign:'center',
    marginTop:10,
    fontSize:30
  },
  bio: {
    color:colors.darkGray,
    marginTop:10,
    fontSize:16,
    marginBottom:25,
    textAlign:'center'
  },
  buttonContainer:{
    borderRadius:25,
    marginBottom:15
  },
  button: {
    backgroundColor:colors.forest,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    width:'100%'
  },
  feed: {
    width: '90%',
    paddingBottom:50,
  },
  feedPost: {
    backgroundColor:colors.white,
    width:'100%',
    padding:0,
    marginBottom:20,
    borderRadius:25,
    overflow:'hidden'
  },
  feedHeaderText: {
    textAlign:'center',
    fontSize:30,
    color:colors.darkGray,
    marginBottom:20,
    marginTop:20
  },
  feedHeaderContainer: {
    marginBottom:10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10
  },
  feedHeader: {
    borderBottomWidth:1,
    borderBottomColor:'#dedede',
    flexDirection:'row',
    paddingBottom:10
  },
  feedAvatarContainer: {
    flex:1,
  },
  feedAvatar: {
    width:'100%',
    borderRadius:500,
    height:undefined,
    aspectRatio:1,
    backgroundColor:colors.darkGray
  },
  feedInfoContainer: {
    flex:7,
    marginLeft:10,
    flexDirection:'column',
    justifyContent:'center'
  },
  feedCoachName: {
    fontSize:17,
    color:colors.darkGray
  },
  feedPostCreated: {
    fontWeight:'300',
    color:colors.darkGray
  },
  feedBody: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10
  },
  feedBodyText: {
    fontWeight:'400',
    color:colors.darkGray
  },
  feedPhotoContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor:colors.white,
  },
  feedPhoto: {
    flex:1,
    width:null,
    height:null,
    resizeMode:'contain'
  },
  feedEmbedContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:colors.white
  },
  feedVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:colors.white
  }
});

export const welcomeStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colorsPerm.darkGray,
    height:'100%'
  },
  actualContainer: {
    backgroundColor: colorsPerm.white,
    marginTop:windowHeight*0.23,
    marginLeft:20,
    marginRight:20,
    borderRadius:10,
    padding:20
  },
  image: {
    position: 'absolute',
    top: windowHeight*0.05,
    left: logoLeft,
    bottom: 0,
    right: 0,
    flex:1,
    width:'90%',
    height:'20%'
  },
  refreshingContainer: {
    backgroundColor:colors.clouds,
    width:'100%',
    height:windowHeight,
    justifyContent:'center',
    alignItems:'center'
  },
  refreshingText: {
    fontSize:22,
    fontWeight:'300',
    textAlign:'center',
    color:colors.darkGray
  },
  mainTitle: {
    fontSize:35,
    textAlign:'center',
    marginBottom:5
  },
  submitButtonContainer:{
    width:'80%',
    marginLeft:'10%',
    borderRadius:25,
    marginBottom:40
  },
  submitButton: {
    backgroundColor:btnColors.success,
    padding:15
  },
  inputContainer: {
    marginLeft:10,
    marginRight:7
  },
  inputContainerEmail: {
    marginLeft:5,
    marginRight:6
  },
  registerText: {
    textAlign:'center',
    color:colorsPerm.darkGray
  },
  registerLink: {
    textDecorationLine: 'underline',
    color:btnColors.primary,
    textAlign:'center',
    marginBottom:10
  },
  dateTimeWrapper: {
    marginTop:20,
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colorsPerm.lightGrey,
    height:100,
    textAlign:'center'
  },
  dateTimeBox: {
    width:"80%",
    height:100
  },
  errorText: {
    textAlign:'center',
    color:btnColors.danger,
    marginBottom:15,
    fontSize:16
  }
});

export const registerStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colorsPerm.darkGray,
    height:'100%'
  },
  actualContainer: {
    backgroundColor: colorsPerm.white,
    marginTop:windowHeight*0.25,
    marginLeft:20,
    marginRight:20,
    borderRadius:10,
    padding:20,
    marginBottom:50
  },
  image: {
    position: 'absolute',
    top: windowHeight*0.05,
    left: logoLeft,
    bottom: 0,
    right: 0,
    flex:1,
    width:'90%',
    height:'13%'
  },
  mainTitle: {
    fontSize:35,
    textAlign:'center',
    marginBottom:5
  },
  submitButtonContainer:{
    width:'80%',
    marginLeft:'10%',
    borderRadius:25,
    marginBottom:40
  },
  submitButton: {
    backgroundColor:btnColors.success,
    padding:15
  },
  inputContainer: {
    marginLeft:10,
    marginRight:7
  },
  inputContainerEmail: {
    marginLeft:5,
    marginRight:6
  },
  inputContainerCalendar: {
    marginLeft:9,
    marginRight:6
  },
  inputContainerName: {
    marginLeft:4,
    marginRight:5
  },
  registerText: {
    textAlign:'center',
    color:colorsPerm.darkGray
  },
  registerLink: {
    textDecorationLine: 'underline',
    color:btnColors.primary,
    textAlign:'center',
    marginBottom:10
  },
  dateTimeWrapper: {
    marginTop:20,
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colorsPerm.lightGrey,
    height:100,
    textAlign:'center'
  },
  dateTimeBox: {
    width:"100%",
    height:100
  },
  dobContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#86939e',
    marginBottom:25,
    marginLeft:10,
    marginRight:10
  },
  dobIconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    marginVertical: 4
  },
  dobTextPlaceholder: {
    color:'#86939e',
    fontSize:18
  },
  dobTextMain: {
    color:colorsPerm.darkGray,
    fontSize:18
  },
  dobLabel: {
    color:'#86939e',
    fontWeight:'bold',
    fontSize:16,
    marginLeft:10
  },
  errorsContainer: {
    marginBottom:15
  },
  errorText: {
    textAlign:'center',
    color:btnColors.danger,
    fontSize:16,
    marginBottom:10
  }
});

export const onboardingStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colorsPerm.darkGray
  },
  actualContainer: {
    backgroundColor: colorsPerm.white,
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    marginBottom:30,
    borderRadius:10
  },
  survey: {
    width:'80%',
    marginLeft:'10%',
    justifyContent:'center'
  },
  radioButton: {
    flexDirection:'row',
    backgroundColor:colorsPerm.white,
    borderRadius:5,
    marginBottom:10,
    justifyContent:'flex-start',
    alignItems:'center',
    marginLeft:10,
    marginRight:10
  },
  mainTitle: {
    padding:10,
    backgroundColor:colorsPerm.emerald,
    margin:20,
    borderRadius:10
  },
  mainTitleText: {
    fontSize:30,
    textAlign:'center',
    color:colorsPerm.white,
  },
  checkBoxButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:colorsPerm.white
  },
  radioButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:colorsPerm.white,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ededed'
  },
  itemQuestion: {
    fontSize:20,
    marginBottom:10,
    textAlign:'center',
    color:colorsPerm.darkGray,
    fontWeight:'500'
  },
  questionContainer: {
    marginBottom:25
  },
  questionSliderContainer: {
    marginBottom:45
  },
  sliderValue: {
    textAlign:'center',
    color:colorsPerm.darkGray,
    fontSize:16
  },
  sliderSet: {
    flexDirection:'row',
    width:'100%'
  },
  sliderSetRange: {
    flex:1,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center'
  },
  sliderSetRangeText: {
    color:colorsPerm.darkGray,
    fontSize:16
  },

  sliderContainer: {
    flex:8
  },
  sliderThumb: {
    width:25,
    height:25,
    backgroundColor:colorsPerm.emerald
  },
  submitButtonContainer:{
    width:'60%',
    marginLeft:'20%',
    marginBottom:50,
    borderRadius:25
  },
  submitButton: {
    backgroundColor:btnColors.primary,
    padding:15
  },
  errorText: {
    textAlign:'center',
    color:btnColors.danger,
    width:'80%',
    marginLeft:'10%',
    marginBottom:25
  }
});

export const radioButtonStyles = StyleSheet.create({
  touchableArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width:'100%',
    padding:10
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorsPerm.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontWeight:'bold',
    color:colorsPerm.darkGray,
    marginLeft:10,
    marginRight:10
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colorsPerm.emerald,
  }
});

export const radioButtonPromptStyles = StyleSheet.create({
  touchableArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width:'100%',
    padding:10
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontWeight:'bold',
    color:colors.darkGray,
    marginLeft:10,
    marginRight:10
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.emerald,
  }
});

export const splashStyles = StyleSheet.create({
  actualContainer: {
    flex: 1,
    backgroundColor: colorsPerm.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex:1,
    width:'100%',
    height:'100%',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:colorsPerm.clouds,
    borderRadius:35
  },
  image: {
    position: 'absolute',
    top: windowHeight*0.06,
    left: logoLeft,
    bottom: 0,
    right: 0,
    width:windowWidth*0.8,
    height:800*logoRatio,
    flex:1,
    width:'90%',
    height:'32%'
  },
  title: {
    fontSize:25,
    color:colorsPerm.darkGray,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginBottom:20,
  },
  welcome: {
    marginTop:800*logoRatio+windowHeight*0.10,
    fontSize:30,
    color:colorsPerm.darkGray,
    marginBottom:10,
    textAlign:'center'
  },
  error: {
    color:colorsPerm.red,
    marginTop:4,
    height:16,
    fontSize:16
  },
  input: {
    width:'50%',
    height:40,
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:colorsPerm.white,
  },
  inputError: {
    width:'50%',
    height:40,
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:colorsPerm.white,
    borderColor:colorsPerm.red,
    borderWidth:1
  },
  inputContainerStyle: {
    borderBottomWidth:0,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonContainer: {
    marginTop:20,
    width:'40%',
    borderRadius:50
  },
  button: {
    backgroundColor:colorsPerm.forest,
  }
});
