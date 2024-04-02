import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
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
import {currentUser} from '../../../../utils/currentUser';
import {CustomeModal} from '../../../../utils/Modal';
import updateApi from '../../../../redux/slices/utils/updateApi';
import Toast from 'react-native-toast-message';
import API_CONFIG from '../../../../config/apiConfig';
import NotFound from '../../../../utils/NotFound';

const LeaveRequest = () => {
  const navigation = useNavigation();
  const rbSheet = useRef();

  const route = useRoute();
  const {id} = route.params;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentUserData, setcurrentUserData] = useState([]);
  const [status, setStatus] = useState('Pending');
  const [uniqueData, setUniqueData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [leaveTypeStatus, setLeaveTypeStatus] = useState(null);
  const [userId, setUserId] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleModalVisible = (itemId, status) => {
    setUserId(itemId);
    setLeaveTypeStatus(status);
    setModalVisible(!modalVisible);
  };

  const fetchData = async () => {
    let res;

    if (currentUserData && currentUserData.user_type === 'Staff') {
      res = await getApi.getAllLeaveRequest();
    } else {
      res = await getApi.getLeaveList(id);
    }

    if (res.data) {
      setData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setLoading(true);

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
        return data
          ? data.filter(item => {
              const itemDate = new Date(item.from_date);
              return itemDate >= todayStart && itemDate < todayEnd;
            })
          : [];

      case 'All':
        return data ? data : [];
      default:
        return data ? data.filter(item => item.status === status) : [];
    }
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

  const handleApproval = async () => {
    const payload = {status: leaveTypeStatus};

    try {
      setBtnLoading(true);
      const res = await updateApi.leaveApproval(userId, payload);

      if (res.status === 200) {
        setModalVisible(false);
        setBtnLoading(false);
        fetchData();
        Toast.show({
          type: 'success',
          autoHide: true,
          text1: `Leave ${leaveTypeStatus} successfully`,
        });
      }
    } catch (error) {
      setBtnLoading(false);
      Toast.show({
        type: 'error',
        autoHide: true,
        text1: 'The leave has not been approved.',
      });
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await currentUser();
        setcurrentUserData(data.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <View style={style.container}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All ({data ? filterData('All', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Today')}>
          <Text style={status === 'Today' ? style.inactive : style.active}>
            Today ({data ? filterData('Today', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Approved')}>
          <Text style={status === 'Approved' ? style.inactive : style.active}>
            Approved ({data ? filterData('Approved', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Pending')}>
          <Text style={status === 'Pending' ? style.inactive : style.active}>
            Pending ({data ? filterData('Pending', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Declined')}>
          <Text style={status === 'Declined' ? style.inactive : style.active}>
            Declined ({data ? filterData('Declined', data).length : []})
          </Text>
        </TouchableOpacity>
      </View>

      <View style={style.details}>
        <FlatList
          data={filterData(status, data)}
          renderItem={({item}) => (
            <View style={style.card} key={item.id}>
              <View>
                {currentUserData &&
                currentUserData.user_type === 'Staff' ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    {item && item.user && item.user.profile_image ? (
                      <Image
                        source={{
                          uri: `${API_CONFIG.imageUrl}${
                            item && item.user && item.user.profile_image
                              ? item.user.profile_image
                              : null
                          }`,
                        }}
                        style={style.image}
                      />
                    ) : (
                      <Image
                        source={require('../../../../assests/userProfile.webp')}
                        style={style.image}
                      />
                    )}
                    <Text style={styles.lable}>
                      {item &&
                        item.user &&
                        `${item.user.first_name} ${item.user.last_name}`}
                    </Text>
                  </View>
                )}

                <Text>
                  {item && item.title ? item.title : null}
                  {`(${
                    item && item.leave_type && item.leave_type.code
                      ? item.leave_type.code
                      : 'CL'
                  })`}
                </Text>

                <View style={{flexDirection: 'row', gap: 5}}>
                  <Text>From</Text>
                  <Text style={styles.lable}>
                    {moment(
                      item && item.from_date ? item.from_date : null,
                    ).format('DD MMM YYYY')}
                  </Text>
                  <Text>To</Text>
                  <Text style={styles.lable}>
                    {moment(item && item.to_date ? item.to_date : null).format(
                      'DD MMM YYYY',
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:
                      currentUserData.user_type === 'Staff'
                        ? 'space-between'
                        : 'start',
                    width: '100%',
                  }}>
                  <TouchableOpacity onPress={() => handleOpenRBSheet(item.id)}>
                    <Text style={style.active}>View Details</Text>
                  </TouchableOpacity>

                  {currentUserData && currentUserData.user_type === 'Staff' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        borderRadius: 20,
                        padding: 8,
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
                  ) : null}
                  {currentUserData &&
                  currentUserData.user_type === 'Staff' ? null : (
                    <>
                      {item.status == 'Approved' ? null : (
                        <TouchableOpacity
                          onPress={() =>
                            handleModalVisible(item.id, 'Approved')
                          }>
                          <Text style={style.active}>Approve Leave</Text>
                        </TouchableOpacity>
                      )}
                      {item.status == 'Declined' ? null : (
                        <TouchableOpacity
                          onPress={() =>
                            handleModalVisible(item.id, 'Declined')
                          }>
                          <Text style={style.inactive}>Decline Leave</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<NotFound />}
        />
      </View>

      {currentUserData && currentUserData.user_type === 'Staff' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ApplyLR')}>
            <IconAdd name="add" style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      ) : null}

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

      <CustomeModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        text={leaveTypeStatus}
        handlePress={handleApproval}
        loading={btnLoading}
      />
    </>
  );
};

export default LeaveRequest;

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
  details: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingBottom: 80,
  },
  card: {
    height: 'fit-content',
    marginBottom: 10,
    width: '100%',
    gap: 7,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'end',
    flexDirection: 'row',
  },
  image: {
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
