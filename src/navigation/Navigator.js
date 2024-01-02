import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/auth/Login.jsx';
import Home from '../pages/home/Home.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../utils/userProfile.jsx';
import HeaderTitle from '../utils/headerTitle.jsx';
import Profile from '../pages/user/Profile.jsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
          // Parse the JSON string to get the boolean value
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
      {!isAuthenticated ? (
        <Stack.Navigator>
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot Password" component={ForgetPassword} />
            <Stack.Screen name="OTP Verification" component={OtpVerification} />
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
          </>
        </Stack.Navigator>
      ) : (
        <>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerLeft: () => <HeaderTitle />,
                headerRight: () => <UserProfile />,
                headerTitle: () => null,
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                headerLeft: () => <HeaderTitle />,
                headerRight: () => <UserProfile />,
                headerTitle: () => null,
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
