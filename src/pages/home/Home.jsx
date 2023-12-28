import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const Home = async () => {
  const currentUser = await AsyncStorage.getItem('currentUser');
  console.log('currentUser', currentUser);
  return (
    <View>
      <Text>Home</Text>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Home;
