import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {primaryColor, secondaryColor} from '../../style';
import {BarIndicator} from 'react-native-indicators';

const Splash = () => {
  const navigation = useNavigation();

  const navigationAuth = async () => {
    try {
      setTimeout(async () => {
        const userDataString = await AsyncStorage.getItem('currentUser');
        const parsedUserData = JSON.parse(userDataString);

        const id =
          parsedUserData &&
          parsedUserData.data &&
          parsedUserData.data.branch &&
          parsedUserData.data.branch.id &&
          parsedUserData.data.branch.id;

        if (parsedUserData) {
          if (parsedUserData.user_type === 'Management') {
            navigation.navigate('Base');
          } else if (parsedUserData.user_type === 'Manager') {
            navigation.navigate('managerDashboard', {id: id});
          } else {
            navigation.navigate('StaffBase', {id: id});
          }
        } else {
          navigation.navigate('Login');
        }
      }, 3000);
    } catch (error) {
      console.log('error during auth navigation', error);
    }
  };

  useEffect(() => {
    navigationAuth();
  }, []);

  return (
    <View style={styles.container}>
      <BarIndicator color={primaryColor} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor,
  },
  textHeading: {
    color: primaryColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
