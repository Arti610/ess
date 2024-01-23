import React from 'react';
import { View} from 'react-native';
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
import { primaryColor } from '../../style';

const ButtonLoader = () =>{
    return (
        <View >
          <SkypeIndicator color={'white'} size={25}/>
        </View>
      );
}

export default ButtonLoader;


