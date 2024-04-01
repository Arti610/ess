import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Home from './Home';
import HeaderTitle from '../../utils/headerTitle';
import {primaryColor, secondaryColor, styles} from '../../../style';
import {BackHandler, Text} from 'react-native';
import Users from '../management/Users/Users';
import Vlog from '../management/Vlog/Vlog';
import LeaveBase from '../staff/leave/LeaveBase';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Document from '../management/Document';
import Dashboard from '../staff/dashboard/Dashboard';
import NotificationCount from '../staff/Notification/NotificationCount';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const ManagerDashboard = () => {
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [backPressCount]);

  const handleBackPress = () => {
    if (backPressCount === 0) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Please press again to exit.',
        visibilityTime: 4000,
        autoHide: true,
      });
      setBackPressCount(1);
      return true;
    } else {
      BackHandler.exitApp();
      return false;
    }
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 60},
          tabBarActiveBackgroundColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <NotificationCount />,

            tabBarIcon: ({color}) => (
              <IconFa
                name="home"
                style={[styles.icons, {color}]}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>Home</Text>
            ),
          })}
        />
        <Tab.Screen
          name="ManagerDashboard"
          component={Home}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <NotificationCount />,
            tabBarIcon: ({color}) => (
              <IconFa
                name="dashboard"
                style={[styles.icons, {color}]}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>
                Dashboard
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name="Users"
          component={Users}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <NotificationCount />,
            tabBarIcon: ({color}) => (
              <IconFa name="users" style={[styles.icons, {color}]} size={20} />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>Staff</Text>
            ),
          })}
        />
        <Tab.Screen
          name="Vlog"
          component={Vlog}
          initialParams={{id: null}}
          options={() => ({
            headerShown: false,
            tabBarIcon: ({color}) => (
              <IconMCI
                name="movie"
                style={[styles.icons, {color}]}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>Vlog</Text>
            ),
          })}
        />
        <Tab.Screen
          name="Leave"
          component={LeaveBase}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <NotificationCount />,
            tabBarIcon: ({color}) => (
              <IconMCI
                name="file-document"
                style={[styles.icons, {color}]}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>Leave</Text>
            ),
          })}
        />
        <Tab.Screen
          name="Documents"
          component={Document}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <NotificationCount />,
            tabBarIcon: ({color}) => (
              <IconI
                name="documents"
                style={[styles.icons, {color}]}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: ({color}) => (
              <Text style={[styles.lable, {color}, {fontSize: 12}]}>
                Document
              </Text>
            ),
          })}
        />
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default ManagerDashboard;
