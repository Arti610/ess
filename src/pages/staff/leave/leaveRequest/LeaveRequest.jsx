import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {primaryColor, secondaryColor, styles} from '../../../../../style';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import getApi from '../../../../redux/slices/utils/getApi';
import moment from 'moment';
import Loader from '../../../../utils/ActivityIndicator';
import RBSheet from 'react-native-raw-bottom-sheet';

const LeaveRequest = () => {
  const navigation = useNavigation();
  const rbSheet = useRef();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState('All');
  const [uniqueData, setUniqueData] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setLoading(true);
        const fetchData = async () => {
          const res = await getApi.getAllLeaveRequest();

          if (res.data) {
            setData(res.data);
            setLoading(false);
          }
        };
        fetchData();
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterData(status);
  }, [status, data]);

  const filterData = status => {
    let newData;
    if (status === 'All') {
      newData = data;
    } else {
      newData = data.filter(item => item.status === status);
    }
    setFilteredData(newData);
  };

  const handleFilterData = status => {
    setStatus(status);
  };

  const handleOpenRBSheet = async id => {
    const res = await getApi.getIndividualLeaveRequest(id);
    setUniqueData(res.data);
    if (res.data) {
      rbSheet.current.open();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <View style={style.container}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All {`(${data && data.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Approved')}>
          <Text style={status === 'Approved' ? style.inactive : style.active}>
            Approved{' '}
            {`(${
              data && data.filter(item => item.status === 'Approved').length
            })`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Pending')}>
          <Text style={status === 'Pending' ? style.inactive : style.active}>
            Pending{' '}
            {`(${
              data && data.filter(item => item.status === 'Pending').length
            })`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Declined')}>
          <Text style={status === 'Declined' ? style.inactive : style.active}>
            Declined{' '}
            {`(${
              data && data.filter(item => item.status === 'Declined').length
            })`}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={style.details}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <TouchableOpacity
                style={style.card}
                key={item.id}
                onPress={() => handleOpenRBSheet(item.id)}>
                <View>
                  <Text>
                    {item && item.title ? item.title : null}{' '}
                    {`(${
                      item && item.leave_type && item.leave_type.code
                        ? item.leave_type.code
                        : 'CL'
                    })`}
                  </Text>
                  <Text style={styles.lable}>
                    {moment(
                      item && item.from_date ? item.from_date : null,
                    ).format('DD MMM YYYY')}{' '}
                    -{' '}
                    {moment(item && item.to_date ? item.to_date : null).format(
                      'DD MMM YYYY',
                    )}
                  </Text>
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
                  {item && item.status}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Data Found</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ApplyLR')}>
          <IconAdd name="add" style={styles.addIcon} />
        </TouchableOpacity>
      </View>

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
                  : 'Common Leave'}{' '}
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
    </>
  );
};

export default LeaveRequest;

const style = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  active: {
    backgroundColor: primaryColor,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 25,
    color: 'white',
    fontSize: 12,
  },
  inactive: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 25,
    color: 'black',
    fontSize: 12,
  },
  details: {
    padding: 20,
    gap: 10,
  },
  card: {
    height: 80,
    gap: 7,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
