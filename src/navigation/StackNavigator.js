import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/auth/Login.jsx';
import Home from '../pages/home/Home.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot Password" component={ForgetPassword} />
        <Stack.Screen name="OTP Verification" component={OtpVerification} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
