import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native"
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
          const parsedUserData = JSON.parse(userDataString)

          const id = parsedUserData && parsedUserData.data && parsedUserData.data.branch && parsedUserData.data.branch.id && parsedUserData.data.branch.id;

          if (parsedUserData) {

            if (parsedUserData.user_type === 'Management') {
              navigation.navigate('Base');
            } else if (parsedUserData.user_type === 'Manager') {
              navigation.navigate('DashboardBase', {id : id});
            } else {
              navigation.navigate('StaffBase', {id : id});
            }
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
      <BarIndicator color={primaryColor} />
    </View>


  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor
  },
  textHeading: {
    color: primaryColor,
    fontSize: 30,
    fontWeight: 'bold'
  }
})