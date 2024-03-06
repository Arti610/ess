import React from 'react';
import {Image, Text, View} from 'react-native';
import { styles } from '../../style';

const NotFound = ({title}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        height={20}
        width={20}
        source={require('../assests/not_found.png')}
      />
      <Text style={styles.lable}>{title}</Text>
    </View>
  );
};

export default NotFound;
