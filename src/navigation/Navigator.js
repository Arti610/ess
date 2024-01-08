import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../pages/auth/Login.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';

import Home from '../pages/home/Home.jsx';
import Splash from '../utils/Splash.jsx';
import { useSelector } from 'react-redux';
import Base from '../pages/Base/Base.jsx';
import AddBranch from '../pages/home/Branch/AddBranch.jsx';

const Stack = createNativeStackNavigator();


const Navigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }} initialRouteName='Splash'>
       
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Base" component={Base} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot Password" component={ForgetPassword} />
            <Stack.Screen name="OTP Verification" component={OtpVerification} />
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="AddBranch"
              component={AddBranch}
            />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
