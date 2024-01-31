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
       
          <SkypeIndicator color={'white'} size={25} style={{margin: 10}}/>
       
      );
}

export default ButtonLoader;


