import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Loader from "./ActivityIndicator";

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
    <>
      <Loader/>
    </>
  )
}

export default Splash;

