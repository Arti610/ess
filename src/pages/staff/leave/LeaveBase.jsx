import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaveRequest from "./leaveRequest/LeaveRequest";
import LateEarly from "./lateEarly/LateEarly";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const LeaveBase = () => {
    
    const route = useRoute();
    const { id } = route.params;

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name='LeaveRequest'
                    component={LeaveRequest}
                    options={{ tabBarLabel: 'Leave Request' }}
                    initialParams={{ id: id }}
                />
                <Tab.Screen
                    name='LateEarly'
                    component={LateEarly}
                    options={{ tabBarLabel: 'Late Early' }}
                    initialParams={{ id: id }}
                />
            </Tab.Navigator>
            <Toast />
        </>
    );
}

export default LeaveBase;
