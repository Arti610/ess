import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import Users from './Users/Users';
import Home from './Home/Home';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from '../../../style';
import Document from './Document';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Vlog from './Vlog/Vlog';
import LeaveBase from '../staff/leave/LeaveBase';
import Clock from '../staff/clock/clock';

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
            tabBarLabel: () => <Text style={styles.lable}>Home</Text>,
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
                <Text style={styles.textSubHeading}>Users</Text>
              </View>
            ),
            tabBarIcon: () => (
              <IconFa name="users" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={styles.lable}>Users</Text>,
          }}
        />
        <Tab.Screen
          name="Vlog"
          component={Vlog}
          initialParams={{id: id}}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <IconFa name="home" style={styles.icons} size={20} />
            ),
            tabBarLabel: () => <Text style={styles.lable}>Vlogs</Text>,
          }}
        />
        <Tab.Screen
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
            tabBarLabel: () => <Text style={styles.lable}>Clock</Text>
          }}
        />
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
            tabBarLabel: () => <Text style={styles.lable}>Leaves</Text>,
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
