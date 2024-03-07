import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';

const CheckinChekout = ({route}) => {
  const {data} = route.params;

  return data ? (
    <View>
      <Text>Checkin/Checkout</Text>
      <FlatList
        data={data.check_in}
        renderItem={({item}) => (
          <View>
            <Text>{item.date_time}</Text>
          </View>
        )}
      />
      <FlatList
        data={data.check_out}
        renderItem={({item}) => (
          <View>
            <Text>{item.date_time}</Text>
          </View>
        )}
      />
    </View>
  ) : (
    <Loader />
  );
};

export default CheckinChekout;
