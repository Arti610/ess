import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Monthly from "./Monthly";
import Weekly from "./Weekly";
import Yearly from "./Yearly";


const Tab = createMaterialTopTabNavigator()
const Timesheet = ()=>{
    return(
        <Tab.Navigator>
        
            <Tab.Screen name='Weekly' component={Weekly}/>
            <Tab.Screen name='Monthly' component={Monthly}/>
            <Tab.Screen name='Yearly' component={Yearly}/>
        </Tab.Navigator>
    )
}

export default Timesheet