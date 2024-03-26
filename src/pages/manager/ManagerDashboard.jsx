import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from './Home';
import HeaderTitle from '../../utils/headerTitle';
import { primaryColor, secondaryColor, styles } from '../../../style';
import { Text } from 'react-native';
import Users from '../management/Users/Users';
import Vlog from '../management/Vlog/Vlog';
import LeaveBase from '../staff/leave/LeaveBase';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Document from '../management/Document';

const Tab = createBottomTabNavigator();
const ManagerDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarActiveBackgroundColor: secondaryColor, 
        tabBarInactiveTintColor: primaryColor, 
      }}>
      <Tab.Screen
        name="ManagerDashboard"
        component={Home}
        options={() => ({
          headerTitle: () => null,
          headerLeft: () => <HeaderTitle />,
          tabBarIcon: ({ color }) => (
            <IconFa name="home" style={[styles.icons, { color }]} size={20} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.lable, { color }]}>Home</Text>
          ),
        })}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        initialParams={{ id: null }}
        options={() => ({
          headerTitle: () => null,
          headerLeft: () => <HeaderTitle />,
          tabBarIcon: ({ color }) => (
            <IconFa name="users" style={[styles.icons, { color }]} size={20} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.lable, { color }]}>Staffs</Text>
          ),
        })}
      />
      <Tab.Screen
        name="Vlog"
        component={Vlog}
        initialParams={{ id: null }}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconMCI
              name="movie"
              style={[styles.icons, { color }]}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.lable, { color }]}>Vlog</Text>
          ),
        })}
      />
      <Tab.Screen
        name="Leave"
        component={LeaveBase}
        initialParams={{ id: null }}
        options={() => ({
          headerTitle: () => null,
          headerLeft: () => <HeaderTitle />,
          tabBarIcon: ({ color }) => (
            <IconMCI
              name="file-document"
              style={[styles.icons, { color }]}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.lable, { color }]}>Leaves</Text>
          ),
        })}
      />
      <Tab.Screen
        name="Documents"
        component={Document}
        initialParams={{ id: null }}
        options={() => ({
          headerTitle: () => null,
          headerLeft: () => <HeaderTitle />,
          tabBarIcon: ({ color }) => (
            <IconI
              name="documents"
              style={[styles.icons, { color }]}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.lable, { color }]}>Documents</Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ManagerDashboard;
