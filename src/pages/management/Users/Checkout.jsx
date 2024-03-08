import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import {styles} from '../../../../style';
import moment from 'moment';
import NotFound from '../../../utils/NotFound';

const Checkout = ({route}) => {
  const data = route.params;

  return data ? (
    <View>
      <FlatList
        data={data.check_out}
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
              <Text style={styles.lable}>Check Out</Text>
              <Text>
                {moment(item.date_time).format('DD MMM YYYY, hh:mm A')}
              </Text>
            </View>
            <Text style = {{color : item.punctuality === 'Late' ? 'red' : 'green'}}>{item.punctuality}</Text>
          </View>
        )}
      />
    </View>
  ) : (
    <Loader />
  );
};

export default Checkout;
