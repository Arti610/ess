import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Users from "./Users/Users";
import Vlog from "./Vlog";
import Clock from "./Clock";
import Home from "./Home";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import {  styles  } from "../../../style";
import Document from "./Document";
import Icon from 'react-native-vector-icons/MaterialIcons'


const Tab = createBottomTabNavigator()

const DashboardBase = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { id } = route.params;

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} initialParams={{ id: id }}  options={{ headerTitle: () => <View style={tStyles.headerShown}><Text onPress={() => navigation.navigate('Base')} style={tStyles.icon}><Icon name='arrow-back-ios-new'  style={styles.textSubHeading}/></Text><Text style={styles.textSubHeading}>Home</Text></View>}} />
                <Tab.Screen name='Users' component={Users} initialParams={{ id: id }}  options={{ headerTitle: () => <View style={tStyles.headerShown}><Text onPress={() => navigation.navigate('Base')} style={tStyles.icon}><Icon name='arrow-back-ios-new'  style={styles.textSubHeading}/></Text><Text style={styles.textSubHeading}>Users</Text></View> }} />
                <Tab.Screen name='Vlog' component={Vlog}  initialParams={{ id: id }} options={{ headerTitle: () => <View style={tStyles.headerShown}><Text onPress={() => navigation.navigate('Base')} style={tStyles.icon}><Icon name='arrow-back-ios-new' style={styles.textSubHeading} /></Text><Text style={styles.textSubHeading}>Vlog</Text></View> }} />
                <Tab.Screen name='Clock' component={Clock} initialParams={{ id: id }}  options={{ headerTitle: () => <View style={tStyles.headerShown}><Text onPress={() => navigation.navigate('Base')} style={tStyles.icon}><Icon name='arrow-back-ios-new'  style={styles.textSubHeading}/></Text><Text style={styles.textSubHeading}>Clock</Text></View> }} />
                <Tab.Screen name='Document' component={Document} initialParams={{ id: id }}  options={{ headerTitle: () => <View style={tStyles.headerShown}><Text onPress={() => navigation.navigate('Base')} style={tStyles.icon}><Icon name='arrow-back-ios-new'  style={styles.textSubHeading}/></Text><Text style={styles.textSubHeading}>Document</Text></View> }} />
            </Tab.Navigator>
        </>
    )
}

export default DashboardBase;

const tStyles = StyleSheet.create({
     headerShown : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
     },
     icon:{
        padding: 13.5,
        paddingRight: 100
     }
  
});
