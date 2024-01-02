import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const RoundComponent = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
      <View
        style={{
          backgroundColor: 'yellow',
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}>
        <Text>t</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundComponent;
