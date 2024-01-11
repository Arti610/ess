import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../home/Home';
import UserProfile from '../../utils/userProfile';
import HeaderTitle from '../../utils/headerTitle';
import BranchInfo from '../home/BranchInfo';
import Toast from 'react-native-toast-message';
import { styles } from '../../../style';

const Tab = createBottomTabNavigator();

const Base = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <UserProfile />,
            tabBarIcon: () => <Icon name="home" style={styles.icons} size={20} />,
          })}
        />

        <Tab.Screen
          name="BranchInfo"
          component={BranchInfo}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <UserProfile />,
            tabBarIcon: () => <Icon name="code-branch"  style={styles.icons} size={20}/>,
          })}
        />

        {/* <Tab.Screen
          name="Profile"
          component={Profile}
          options={() => ({
            headerTitle: () => <Header name='Profile'/>,
            tabBarIcon: () => <Icon name="user-edit"  style={styles.icons} size={20}/>,
          })}
        /> */}
       
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default Base;
