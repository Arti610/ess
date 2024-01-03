import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../utils/userProfile.jsx';
import HeaderTitle from '../utils/headerTitle.jsx';
import Login from '../pages/auth/Login.jsx';
import Home from '../pages/home/Home.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';
import AddBranch from '../pages/home/Branch/AddBranch.jsx';
import TavNavigator from './TavNavigator.js';
import StackNavigator from './StackNavigator.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticatedString = await AsyncStorage.getItem(
          'isAuthenticated',
        );

        if (isAuthenticatedString) {
          const isAuthenticated = JSON.parse(isAuthenticatedString);
          setIsAuthenticated(isAuthenticated);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot Password" component={ForgetPassword} />
            <Stack.Screen name="OTP Verification" component={OtpVerification} />
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={StackNavigator}
              screenOptions={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
