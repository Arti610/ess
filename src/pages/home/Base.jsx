import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import UserProfile from '../../utils/userProfile';
import HeaderTitle from '../../utils/headerTitle';
import BranchInfo from './BranchInfo';
import Toast from 'react-native-toast-message';
import { styles } from '../../../style';
import { BackHandler } from 'react-native';

const Tab = createBottomTabNavigator();

const Base = () => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    
    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    return true;
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Branch"
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
      
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default Base;
