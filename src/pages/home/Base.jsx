import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BranchIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import UserProfile from '../../utils/userProfile';
import HeaderTitle from '../../utils/headerTitle';
import BranchInfo from './BranchInfo';
import Toast from 'react-native-toast-message';
import { styles } from '../../../style';
import { BackHandler, Text } from 'react-native';

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
      <Tab.Navigator >
        <Tab.Screen
          name="Branch"
          component={Home}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            tabBarIcon: () => <BranchIcon name="featured-play-list" style={styles.icons}  size={20} />,
            tabBarLabel: () => <Text style={styles.lable}>Branch</Text>
          })}
        />

        <Tab.Screen
          name="BranchInfo"
          component={BranchInfo}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            tabBarIcon: () => <Icon name="code-branch"  style={styles.icons} size={20}/>,
            tabBarLabel: () => <Text style={styles.lable}>BranchInfo</Text>
          })}
        />
      
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default Base;
