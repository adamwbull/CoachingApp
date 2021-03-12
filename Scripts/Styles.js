import { StyleSheet, Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logoRatio = windowWidth/1600;
export const logoLeft = (windowWidth-(windowWidth*0.8))/4;

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

export const navStyles = StyleSheet.create({
  nav: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor:colors.white,
    padding:10,
    paddingTop:15,
    borderBottomWidth:2,
    borderBottomColor:colors.forest,
    marginBottom:25
  },
  image: {
    flex: 1,
    width: 100,
    height: 50,
    resizeMode: 'contain'
  },
  left: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  center: {
    flex:6,
    justifyContent:'center',
    alignItems:'center'
  },
  right: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

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
    marginBottom:25
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
    padding:10
  },
  feedHeaderText: {
    textAlign:'center',
    fontSize:30,
    color:colors.darkGray,
    marginBottom:20,
    marginTop:20
  },
  feedHeader: {
    borderBottomWidth:1,
    borderBottomColor:'#dedede',
    marginBottom:10,
    paddingBottom:10,
    flexDirection:'row'
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
  }
});

export const welcomeStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colors.darkGray,
    height:'100%'
  },
  container: {
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
  container: {
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
  container: {
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
  container: {
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
