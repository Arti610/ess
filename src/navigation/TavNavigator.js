import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import UserProfile from '../utils/userProfile.jsx';
import HeaderTitle from '../utils/headerTitle.jsx';
import Profile from '../pages/user/Profile.jsx';
import Home from '../pages/home/Home.jsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const TavNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => <HeaderTitle />,
        headerRight: () => <UserProfile />,
        headerTitle: () => null,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TavNavigator;
