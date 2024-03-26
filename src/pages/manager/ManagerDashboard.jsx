import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from './Home';

const Tab = createBottomTabNavigator();
const ManagerDashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ManagerDashboard" component={Home} />
    </Tab.Navigator>



  );
};

export default ManagerDashboard;
