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

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clouds,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clouds
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
    backgroundColor:colors.forest,
  }
});
