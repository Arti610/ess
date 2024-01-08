import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"

const Splash = ()=>{
    const navigation = useNavigation()
 

    useEffect(()=>{
     const navigationAuth = async()=>{
        try {
             setTimeout( async () => {
                   const userDataString = await AsyncStorage.getItem('currentUser');      
                if (userDataString) {
                    navigation.navigate('Base');                      
          }else{
            navigation.navigate('Login');
          }
             }, 3000);
           } catch (error) {
            console.log('error during auth navigation', error);
           }
        }
        navigationAuth()
    })
    return(
        <>
        <View><Text>Splash</Text></View>
        </>
    )
}

export default Splash;