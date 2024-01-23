import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/auth/Login.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';
import Home from '../pages/home/Home.jsx';
import Splash from '../utils/Splash.jsx';
import Base from '../pages/home/Base.jsx';
import AddBranch from '../pages/home/Branch/AddBranch.jsx';
import EditProfile from '../pages/user/EditProfile.jsx';
import Profile from '../pages/user/Profile.jsx';
import { Text, View } from 'react-native';
import { styles } from '../../style.js';
import AddBranchInfo from '../pages/home/Branch/AddBranchInfo.jsx';
import ManagementDashboard from '../pages/dashboard/ManagementDashboard.jsx';

const Stack = createNativeStackNavigator();


const Navigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }} initialRouteName='Splash'>

          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Base" component={Base} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot Password" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="OTP Verification" component={OtpVerification} options={{ headerShown: false }} />
          <Stack.Screen name="Reset Password" component={ResetPassword}options={{ headerShown: false }}  />
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddBranch" component={AddBranch} options={{ headerTitle: () => <View><Text style={styles.textSubHeading}>Branch</Text></View> }} />
          <Stack.Screen name="AddBranchInfo" component={AddBranchInfo} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>BranchInfo</Text></View> }} />
          <Stack.Screen name='Profile' component={Profile} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Profile</Text></View> }} />
          <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Edit Profile</Text></View> }} />
          <Stack.Screen name='ManagementDashboard' component={ManagementDashboard} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Dashboard</Text></View> }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
