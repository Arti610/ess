import React from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Home;
