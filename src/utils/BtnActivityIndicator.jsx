import React from 'react';

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
       
          <SkypeIndicator color={'white'} size={25} />
       
      );
}

export default ButtonLoader;


