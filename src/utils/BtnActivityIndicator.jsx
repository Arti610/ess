import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const ButtonLoader = () =>{
    return (
        <View >
          <ActivityIndicator size={40} color="#0E81B9" />
        </View>
      );
}

export default ButtonLoader