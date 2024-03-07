import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import {styles} from '../../../../style';
import NotFound from '../../../utils/NotFound';

const Leaves = ({route}) => {
  const {data} = route.params;
console.log(data);
  return data ? (
    <FlatList
      data={data.leave}
      ListEmptyComponent={<NotFound />}
      renderItem={({item}) => (
        <View
          style={[
            styles.textInput,
            {
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View>
            <Text style={styles.lable}>{item.title}</Text>
            <Text> From {item.from_date} To {item.to_date} </Text>
          </View>
          <Text 
            style={{
              color:
                item && item.status === 'Pending'
                  ? 'gold'
                  : item && item.status === 'Approved'
                  ? 'green'
                  : 'red',
              fontWeight: 'bold',
            }}>
            {item.status}
          </Text>
        </View>
      )}
    />
  ) : (
    <Loader />
  );
};

export default Leaves;
