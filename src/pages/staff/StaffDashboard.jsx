import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BranchIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFa from 'react-native-vector-icons/FontAwesome';
import DocIcon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from '../../utils/headerTitle';
import Toast from 'react-native-toast-message';
import {primaryColor, secondaryColor, styles} from '../../../style';
import {BackHandler, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Vlog from './vlog/Vlog';
import Clock from './clock/clock';
import LeaveBase from './leave/LeaveBase';
import Dashboard from './dashboard/Dashboard';
import IconN from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {currentUser} from '../../utils/currentUser';
import getApi from '../../redux/slices/utils/getApi';
import Document from '../management/Document';

const Tab = createBottomTabNavigator();

const Notification = () => {

  const [branchId, setBranchId] = useState(null);
  const [data, setData] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await currentUser();
        setBranchId(res.data.branch.id);
      } catch (error) {}
    };
    fetchData();

    if (branchId) {
      const fetchNotification = async () => {
        try {
          const res = await getApi.getNotification(branchId);

          setData(res.data.length);
        } catch (error) {
          console.log(error);
        }
      };
      fetchNotification();
    }
  }, []);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification')}
      style={style.container}>
      <IconN name="notifications" style={style.icon} />
      {data >= 0 ? (
        <Text style={style.badge}>{data}</Text>
      ) : (
        <Text style={style.badge}>0</Text>
      )}
    </TouchableOpacity>
  );
};

const StaffDashboard = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 60},
          tabBarActiveBackgroundColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
        }}>
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <Notification />,
            tabBarIcon: () => (
              <Icon name="code-branch" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Home</Text>,
          })}
        />
       
        <Tab.Screen
          name="Clock"
          component={Clock}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <Notification />,
            tabBarIcon: () => (
              <IconFa name="clock-o" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Clock</Text>,
          })}
        />
         <Tab.Screen
          name="Vlog"
          component={Vlog}
          options={() => ({
            headerShown: false,
            tabBarIcon: () => (
              <BranchIcon
                name="featured-play-list"
                style={styles.icons}
                size={20}
              />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Vlog</Text>,
          })}
        />
        <Tab.Screen
          name="Leave"
          component={LeaveBase}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <Notification />,
            tabBarIcon: () => (
              <BranchIcon
                name="featured-play-list"
                style={styles.icons}
                size={20}
              />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Leave</Text>,
          })}
        />
        <Tab.Screen
          name="Documents"
          component={Document}
          initialParams={{id: null}}
          options={() => ({
            headerTitle: () => null,
            headerLeft: () => <HeaderTitle />,
            headerRight: () => <Notification />,
            tabBarIcon: () => (
              <DocIcon name="documents" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={[styles.lable, {fontSize : 12}]}>Documents</Text>,
          })}
        />
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default StaffDashboard;

const style = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'relative',
  },
  icon: {
    fontSize: 25,
    color: primaryColor,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 15,
  },
});
