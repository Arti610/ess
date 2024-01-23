import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {primaryColor, styles} from '../../style';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Loader = () => {
  return (
    <View style={styles.container}>
       <SkypeIndicator color={primaryColor} size={80}/>
    </View>
  );
};

export default Loader;


