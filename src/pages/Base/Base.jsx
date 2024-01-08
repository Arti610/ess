import { Text, View } from "react-native"
import Home from "../home/Home";
import Profile from "../user/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
const Base = ()=>{

    return(
    <>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
        <Toast/>
        </>
    )
}

export default Base;