import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';

const Vlog = ({route}) => {
  const {data} = route.params;

  return data ? (
    <View>
      <Text>Vlog</Text>
      <FlatList
        data={data.task}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  ) : (
    <Loader />
  );
};

export default Vlog;
