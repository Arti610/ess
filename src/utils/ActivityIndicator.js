import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from '../../style';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color="#0E81B9" />
    </View>
  );
};

export default Loader;
