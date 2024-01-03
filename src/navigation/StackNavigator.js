import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TavNavigator from './TavNavigator';
import AddBranch from '../pages/home/Branch/AddBranch';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TavNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddBranch"
        component={AddBranch}
        options={{headerTitle: 'Add Branch'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
