import { StyleSheet, Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const logoRatio = windowWidth/1600;

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

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const onboardingStyles = StyleSheet.create({
  trueContainer:{
    backgroundColor:colors.darkGray
  },
  container: {
    backgroundColor: colors.white,
    marginTop:20,
    marginLeft:10,
    marginRight:10,
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
    marginBottom:50
  },
  submitButton: {
    backgroundColor:btnColors.primary
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
  },
});

export const logoLeft = (windowWidth-(windowWidth*0.8))/4;
export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    top: windowHeight*0.09,
    left: logoLeft,
    bottom: 0,
    right: 0,
    width:windowWidth*0.8,
    height:800*logoRatio,
    flex:1,
    width:'90%',
    height:'20%'
  },
  title: {
    fontSize:30,
    color:colors.darkGray,
    width:'100%',
    height:30,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginBottom:20,
    marginTop:800*logoRatio+windowHeight*0.13
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
    width:'40%'
  },
  button: {
    backgroundColor:colors.emerald,
  }
});
