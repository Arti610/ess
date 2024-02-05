import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BranchIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserProfile from '../../utils/userProfile';
import HeaderTitle from '../../utils/headerTitle';
import Toast from 'react-native-toast-message';
import { styles } from '../../../style';
import {  Text } from 'react-native';
import Vlog from './vlog/Vlog';
import Clock from './clock/clock';
import LeaveBase from './leave/LeaveBase';

const Tab = createBottomTabNavigator();

const StaffDashboard = () => {


  return (
    <>
      <Tab.Navigator >
          <Tab.Screen
            name="Clock"
            component={Clock}
            options={() => ({
              headerTitle: () => null,
              headerLeft: () => <HeaderTitle />,
              headerRight: () => <UserProfile />,
              tabBarIcon: () => <Icon name="code-branch"  style={styles.icons} size={20}/>,
              tabBarLabel: () => <Text style={styles.lable}>Home</Text>
            })}
          />
        <Tab.Screen
          name="Vlog"
          component={Vlog}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <UserProfile />,
            tabBarIcon: () => <BranchIcon name="featured-play-list" style={styles.icons}  size={20} />,
            tabBarLabel: () => <Text style={styles.lable}>Vlog</Text>
          })}
        />
        <Tab.Screen
          name="Leave"
          component={LeaveBase}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <UserProfile />,
            tabBarIcon: () => <BranchIcon name="featured-play-list" style={styles.icons}  size={20} />,
            tabBarLabel: () => <Text style={styles.lable}>Leave</Text>
          })}
        />

      
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default StaffDashboard;
