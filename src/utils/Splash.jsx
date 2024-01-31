import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, } from "react";
import {  ImageBackground, StyleSheet, Text, View } from "react-native"
import { primaryColor, secondaryColor } from "../../style";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Splash = () => {
  const navigation = useNavigation()


  useEffect(() => {
    const navigationAuth = async () => {
      try {
        setTimeout(async () => {
          const userDataString = await AsyncStorage.getItem('currentUser');
       
          if (userDataString) {
            navigation.navigate('Base');
          } else {
            navigation.navigate('Login');
          }
        }, 3000);
      } catch (error) {
        console.log('error during auth navigation', error);
      }
    }
    navigationAuth()
  })
  return (
  
    <View style={styles.container}>     
       <BarIndicator color= {primaryColor} />
       {/* <Text style={styles.textHeading}>WELCOME TO ESS</Text> */}
    </View>

        
  )
}

export default Splash;

const styles = StyleSheet.create({
  container:{
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor
  },
  textHeading:{
    color : primaryColor,
    fontSize: 30,
    fontWeight: 'bold'
  }
})