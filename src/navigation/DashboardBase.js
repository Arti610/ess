import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ManagementDashboard from "../pages/dashboard/ManagementDashboard";


const Tab = createBottomTabNavigator()
const DashboardBase = ()=>{
    return(
        <>
            <Tab.Navigator>
                <Tab.Screen name= 'Dashboard'component={ManagementDashboard}/>
            </Tab.Navigator>
        </>
    )
}

export default DashboardBase;