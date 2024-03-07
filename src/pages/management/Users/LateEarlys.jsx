import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';

const LateEarlys = ({route}) => {
  const {data} = route.params;

  return data ? (
    <View>
      <Text>Late Early</Text>
      <FlatList
        data={data.lateEarly}
        renderItem={({item}) => (
          <View>
            <Text>{item.late_early}</Text>
          </View>
        )}
      />
    </View>
  ) : (
    <Loader />
  );
};

export default LateEarlys;
