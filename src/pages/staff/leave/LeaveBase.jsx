import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaveRequest from "./leaveRequest/LeaveRequest";
import LateEarly from "./lateEarly/LateEarly";
import Toast from "react-native-toast-message";

const Tab = createMaterialTopTabNavigator();



const LeaveBase = () => {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name='LeaveRequest'
                    component={LeaveRequest}
                    options={{ tabBarLabel: 'Leave Request' }}
                />
                <Tab.Screen
                    name='LateEarly'
                    component={LateEarly}
                    options={{ tabBarLabel: 'Late Early' }}
                />
            </Tab.Navigator>
            <Toast />
        </>


    )
}


export default LeaveBase