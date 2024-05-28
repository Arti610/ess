import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import {primaryColor, secondaryColor, styles} from '../../../../style';
import NotFound from '../../../utils/NotFound';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import getApi from '../../../redux/slices/utils/getApi';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import { useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { currentUser } from '../../../utils/currentUser';

const Leaves = ({route}) => {

  const {data} = route.params;
  const rbSheet = useRef();

  const navigation = useNavigation();

  const [value, setValue] = useState(null)
  const [status, setStatus] = useState('Pending');
  const [uniqueData, setUniqueData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null)

  const handleOpenRBSheet = async id => {
    const res = await getApi.getIndividualLeaveRequest(id);
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
        return data && data.leave
          ? data.leave.filter(item => {
              const itemDate = new Date(item.from_date);
              return itemDate >= todayStart && itemDate < todayEnd;
            })
          : [];

      case 'All':
        return data && data.leave ? data.leave : [];
      default:
        return data && data.leave
          ? data.leave.filter(item => item.status === status)
          : [];
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setValue(data)
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation, value]);

  const fetchCurrentUser = async()=>{
    try {
      const res = await currentUser()
      setCurrentUserData(res.data)
    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>{
  fetchCurrentUser()
},[])
  return value && value.leave ? (
    <>
      <View style={style.container}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All ({value && value ? filterData('All', value).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Today')}>
          <Text style={status === 'Today' ? style.inactive : style.active}>
            Today ({value && value ? filterData('Today', value).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Approved')}>
          <Text style={status === 'Approved' ? style.inactive : style.active}>
            Approved ({value && value ? filterData('Approved', value).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Pending')}>
          <Text style={status === 'Pending' ? style.inactive : style.active}>
            Pending ({value && value ? filterData('Pending', value).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Declined')}>
          <Text style={status === 'Declined' ? style.inactive : style.active}>
            Declined ({value && value ? filterData('Declined', value).length : 0})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData(status, value)}
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
                <Text style={styles.lable}>{item.title}</Text>
                <Text>
                  From {moment(item.from_date).format('DD MMM yyyy')} To{' '}
                  {moment(item.to_date).format('DD MMM YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet(item.id)}
                style={{
                  backgroundColor: primaryColor,
                  width: '50%',
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
              <Text style={styles.lable}>
                {uniqueData &&
                uniqueData.leave_type &&
                uniqueData.leave_type.name
                  ? uniqueData.leave_type.name
                  : 'Common Leave'}
                {`(${
                  uniqueData &&
                  uniqueData.leave_type &&
                  uniqueData.leave_type.code
                    ? uniqueData.leave_type.code
                    : 'CL'
                })`}
              </Text>
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
                Title :{' '}
                {uniqueData && uniqueData.title ? uniqueData.title : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Start Date :{' '}
                {uniqueData && uniqueData.from_date
                  ? moment(uniqueData.from_date).format('DD MMM YYYY')
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                End Date :{' '}
                {uniqueData && uniqueData.to_date
                  ? moment(uniqueData.to_date).format('DD MMM YYYY')
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Reason :{' '}
                {uniqueData && uniqueData.description
                  ? uniqueData.description
                  : null}{' '}
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
              {uniqueData && uniqueData.created_date
                ? moment(uniqueData.created_date).format('dddd, DD MMM YYYY')
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

     {currentUserData && currentUserData.user_type === 'Staff' ? <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ApplyLR')}>
          <IconAdd name="add" style={styles.addIcon} />
        </TouchableOpacity>
      </View> : null}
       {/* <Toast /> */}
    </>
  ) : (
    <Loader />
  );
};

export default Leaves;

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
