import React, { useRef, useState } from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import NotFound from '../../../utils/NotFound';
import { styles } from '../../../../style';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import getApi from '../../../redux/slices/utils/getApi';


const LateEarlys = ({route}) => {

  const {data} = route.params;
  const rbSheet = useRef();

  const [uniqueData, setUniqueData] = useState(null);

  const handleOpenRBSheet = async id => {
    const res = await getApi.getIndividualLateEarly(id);
    setUniqueData(res.data);
    if (res.data) {
      rbSheet.current.open();
    }
  };
  
  return data ? (
    <View>
      <FlatList
        data={data.lateEarly}
        ListEmptyComponent={<NotFound/>}
        renderItem={({item}) => (
          <TouchableOpacity
          onPress={() => handleOpenRBSheet(item.id)}
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
              <Text style={styles.lable}>{item.late_early ? item.late_early : 'Late/Early'}</Text>
              <Text>{moment(item.date).format('DD MMM YYYY')}</Text>
              <Text>{item.time}</Text>
            </View>
            <Text 
              style={{
                color: item && item.status === 'Pending' ? 'gold' : item && item.status === 'Approved' ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
      {uniqueData ? (
        <RBSheet
          ref={rbSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              height: 'fit-content',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{paddingVertical: 30, paddingHorizontal: 20, gap: 10}}>
            <View
              style={{flexDirection: 'row', gap: 120, alignItems: 'center'}}>
              <Text style={styles.lable}>Late/Early Request</Text>
              <Text
                style={{
                  fontSize: 12,
                  borderRadius: 20,
                  padding: 8,
                  color: 'white',
                  backgroundColor:
                    uniqueData.status === 'Pending'
                      ? 'gold'
                      : uniqueData.status === 'Approved'
                      ? 'green'
                      : 'red',
                  fontWeight: 'bold',
                }}>
                {uniqueData.status}
              </Text>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Late/Early :{' '}
                {uniqueData && uniqueData.late_early
                  ? uniqueData.late_early
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Date :{' '}
                {uniqueData && uniqueData.date
                  ? moment(uniqueData.date).format('DD MMM YYYY')
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Time : {uniqueData && uniqueData.time ? uniqueData.time : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Reason :{' '}
                {uniqueData && uniqueData.reason ? uniqueData.reason : null}{' '}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                padding: 5,
                textAlign: 'right',
                fontWeight: 'bold',
              }}>
              Applied On{' '}
              {uniqueData && uniqueData.created_at
                ? moment(uniqueData.created_at).format('dddd, DD MMM YYYY')
                : null}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => rbSheet.current.close()}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      ) : null}
    </View>

  ) : (
    <Loader />
  );
};

export default LateEarlys;
