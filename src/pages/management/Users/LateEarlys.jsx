import React, {useEffect, useRef, useState} from 'react';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import NotFound from '../../../utils/NotFound';
import {primaryColor, secondaryColor, styles} from '../../../../style';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import getApi from '../../../redux/slices/utils/getApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const LateEarlys = ({route}) => {
  const {data} = route.params;
  const rbSheet = useRef();

  const navigation = useNavigation();

  const [status, setStatus] = useState('Pending');
  const [uniqueData, setUniqueData] = useState(null);

  const handleOpenRBSheet = async id => {
    const res = await getApi.getIndividualLateEarly(id);
    setUniqueData(res.data);
    if (res.data) {
      rbSheet.current.open();
    }
  };

  const handleFilterData = status => {
    setStatus(status);
  };

  const filterData = (status, data) => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    switch (status) {
      case 'Today':
        return data && data.lateEarly
          ? data.lateEarly.filter(item => {
              const itemDate = new Date(item.from_date);
              return itemDate >= todayStart && itemDate < todayEnd;
            })
          : [];

      case 'All':
        return data && data.lateEarly ? data.lateEarly : [];
      default:
        return data && data.lateEarly
          ? data.lateEarly.filter(item => item.status === status)
          : [];
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        data;
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation, data, route]);
  return data ? (
    <>
      <View style={style.container}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All ({data && data ? filterData('All', data).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Today')}>
          <Text style={status === 'Today' ? style.inactive : style.active}>
            Today ({data && data ? filterData('Today', data).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Approved')}>
          <Text style={status === 'Approved' ? style.inactive : style.active}>
            Approved ({data && data ? filterData('Approved', data).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Pending')}>
          <Text style={status === 'Pending' ? style.inactive : style.active}>
            Pending ({data && data ? filterData('Pending', data).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Declined')}>
          <Text style={status === 'Declined' ? style.inactive : style.active}>
            Declined ({data && data ? filterData('Declined', data).length : 0})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData(status, data)}
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
              <View>
                <Text style={styles.lable}>
                  {item.late_early ? item.late_early : 'Late/Early'}
                </Text>
                <Text>{moment(item.date).format('DD MMM YYYY')}</Text>
                <Text>{item.time}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet(item.id)}
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: 25,
                  color: 'white',
                  padding: 6,
                  marginVertical: 6,
                  fontSize: 10,
                  textAlign: 'center',
                }}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ApplyLE')}>
          <IconAdd name="add" style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  ) : (
    <Loader />
  );
};

export default LateEarlys;

const style = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  active: {
    backgroundColor: primaryColor,
    paddingHorizontal: 6,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 25,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  inactive: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 6,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 25,
    color: 'black',
    fontSize: 12,
  },
});
