import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Users from './Users/Users';
import Home from './Home/Home';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {primaryColor, secondaryColor, styles} from '../../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Vlog from './Vlog/Vlog';
import LeaveBase from '../staff/leave/LeaveBase';
import Document from './Document';

const Tab = createBottomTabNavigator();

const DashboardBase = () => {

  const navigation = useNavigation();

  const route = useRoute();
  const {id} = route.params;



  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 60},
          tabBarActiveBackgroundColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{id: id}}
          options={{
            headerTitle: () => (
              <View style={tStyles.headerShown}>
                <Text
                  onPress={() => navigation.navigate('Base')}
                  style={tStyles.icon}>
                  <Icon name="arrowleft" style={styles.textSubHeading} />
                </Text>
                <Text style={styles.textSubHeading}>Home</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconFa name="home" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => (
              <Text style={[styles.lable, {fontSize: 12}]}>Home</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Users"
          component={Users}
          initialParams={{id: id}}
          options={{
            headerTitle: () => (
              <View style={tStyles.headerShown}>
                <Text
                  onPress={() => navigation.navigate('Base')}
                  style={tStyles.icon}>
                  <Icon name="arrowleft" style={styles.textSubHeading} />
                </Text>
                <Text style={styles.textSubHeading}>Staffs</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconFa name="users" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => (
              <Text style={[styles.lable, {fontSize: 12}]}>Staffs</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Vlog"
          component={Vlog}
          initialParams={{id: id}}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <IconMCI name="movie" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => (
              <Text style={[styles.lable, {fontSize: 12}]}>Vlogs</Text>
            ),
          }}
        />
        {/* <Tab.Screen
          name="Clock"
          component={Clock}
          initialParams={{id: id}}
          options={{
            headerTitle: () => (
              <View style={tStyles.headerShown}>
                <Text
                  onPress={() => navigation.navigate('Base')}
                  style={tStyles.icon}>
                  <Icon name="arrowleft" style={styles.textSubHeading} />
                </Text>
                <Text style={styles.textSubHeading}>Clock</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconFa name="clock-o" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Clock</Text>
          }}
        /> */}
        <Tab.Screen
          name="Leave"
          component={LeaveBase}
          initialParams={{id: id}}
          options={{
            headerTitle: () => (
              <View style={tStyles.headerShown}>
                <Text
                  onPress={() => navigation.navigate('Base')}
                  style={tStyles.icon}>
                  <Icon name="arrowleft" style={styles.textSubHeading} />
                </Text>
                <Text style={styles.textSubHeading}>Leave</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconMCI name="file-document" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => (
              <Text style={[styles.lable, {fontSize: 12}]}>Leaves</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Documents"
          component={Document}
          initialParams={{id: id}}
          options={{
            headerTitle: () => (
              <View style={tStyles.headerShown}>
                <Text
                  onPress={() => navigation.navigate('Base')}
                  style={tStyles.icon}>
                  <Icon name="arrowleft" style={styles.textSubHeading} />
                </Text>
                <Text style={styles.textSubHeading}>Documents</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconI name="documents" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => (
              <Text style={[styles.lable, {fontSize: 12}]}>Documents</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default DashboardBase;

const tStyles = StyleSheet.create({
  headerShown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 13.5,
    paddingRight: 10,
  },
});
