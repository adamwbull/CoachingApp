import { StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logoRatio = windowWidth/1600;
export const logoLeft = (windowWidth-(windowWidth*0.8))/4;
export const feedMediaWidth = parseInt(windowWidth-(windowWidth*0.1));
export const windowHeightConceptVideo = windowHeight - (windowHeight*0.5);

export const colors = {
  emerald: '#2ecc71',
  forest: '#27ae60',
  clouds: '#ecf0f1',
  blueGray: '#344150',
  darkGray: '#23272a',
  black: '#000000',
  white: '#ffffff',
  red: '#e74c3c'
}

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
  messagesView: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20
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
    marginTop:1,
  },
  myMessageImage: {
    backgroundColor:messageColors.me,
    borderTopLeftRadius:25,
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'flex-end',
    marginTop:1,
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
    marginTop:1,
  },
  theirMessageImage: {
    backgroundColor:messageColors.them,
    borderTopRightRadius:25,
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'flex-start',
    marginTop:1,
    width:windowWidth-80
  },
  theirMessageText: {
    color:colors.darkGray,
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
    marginTop:1,
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
    marginLeft:5,
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
  lastMessage: {
    fontSize:14,
    fontWeight:'300',
    fontStyle:'italic'
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
    height:windowHeight
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
    fontWeight:'500'
  },
  userCreated: {
    fontSize:14,
    fontWeight:'300'
  },
  listItemsTitle: {
    marginLeft:'2%',
    fontSize:20,
    marginBottom:10,
    marginTop:10,
    fontWeight:'500',
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
    marginTop:40
  },
  versionText: {
    textAlign:'center',
    fontWeight:'300'
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
  conceptsTitle: {
    marginTop:25,
    color:colors.darkGray,
    textAlign:'center',
    marginBottom:15,
    fontSize:40
  },
  emptyText: {
    textAlign:'center',
    fontSize:20,
    color:colors.darkGray
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
})

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
    justifyContent: 'center',
    width:'100%',
    marginBottom:25
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
    width:'100%',
    marginBottom:75
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
    width:'90%'
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
    fontSize:17
  },
  feedPostCreated: {
    fontWeight:'300'
  },
  feedBody: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10
  },
  feedBodyText: {
    fontWeight:'400'
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
    backgroundColor:colors.darkGray,
    height:'100%'
  },
  actualContainer: {
    backgroundColor: colors.white,
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
    color:colors.darkGray
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
    backgroundColor:colors.lightGrey,
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
    backgroundColor:colors.darkGray,
    height:'100%'
  },
  actualContainer: {
    backgroundColor: colors.white,
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
    color:colors.darkGray
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
    backgroundColor:colors.lightGrey,
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
    color:colors.darkGray,
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
    color:colors.darkGray,
    fontSize:16
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
    borderColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontWeight:'bold',
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
    backgroundColor: colors.darkGray,
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
    backgroundColor:colors.clouds,
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
    color:colors.darkGray,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginBottom:20,
  },
  welcome: {
    marginTop:800*logoRatio+windowHeight*0.10,
    fontSize:30,
    color:colors.darkGray,
    marginBottom:10,
    textAlign:'center'
  },
  error: {
    color:colors.red,
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
    backgroundColor:colors.white,
  },
  inputError: {
    width:'50%',
    height:40,
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:colors.white,
    borderColor:colors.red,
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
    backgroundColor:colors.forest,
  }
});
