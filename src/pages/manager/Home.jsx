import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFa6 from 'react-native-vector-icons/FontAwesome6';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import getApi from '../../redux/slices/utils/getApi';
import Loader from '../../utils/ActivityIndicator';
import {currentUser} from '../../utils/currentUser';
import {styles, textColor} from '../../../style';

const Home = () => {
  const navigation = useNavigation();

  const [staff, setStaff] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [lateEarly, setLateEarly] = useState([]);
  const [currentUserData, setcurrentUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    const res = await currentUser();
    setcurrentUserData(res.data);
  };

  let checkinCount = 0;
  let checkoutCount = 0;
  let inActiveStaffs = 0;
  let totalStaffs = 0;
  let pendingLeaveData = 0;
  let pendingLateEarly = 0;

  for (let c of staff) {
    if (c.status === 'Not In Office') {
      checkoutCount++;
    } else if (c.status === 'In Office') {
      checkinCount++;
    } else if (c.status === 'Deactivated') {
      inActiveStaffs++;
    }
  }

  for (let i = 0; i < staff.length; i++) {
    totalStaffs++;
  }

  for (let l of leaveRequest) {
    if (l.status === 'Pending') {
      pendingLeaveData++;
    }
  }

  for (let le of lateEarly) {
    if (le.status === 'Pending') {
      pendingLateEarly++;
    }
  }

  const activeStaff = totalStaffs - inActiveStaffs;

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const id =
    currentUserData && currentUserData.branch && currentUserData.branch.id
      ? currentUserData.branch.id
      : null;


  useEffect(() => {
    setLoading(true);
    if (currentUserData) {
      try {
        const fetchData = async () => {
          const staffRes = await getApi.getManagerStaffList(
            currentUserData.id ? currentUserData.id : null,
          );
         
          if (staffRes.data) {
            setStaff(staffRes.data);
          }

          const lateEarlyRes = await getApi.getLateEarlyList(id);
          if (lateEarlyRes.data) {
            setLateEarly(lateEarlyRes.data);
          }

          const leaveRes = await getApi.getLeaveList(id);
          if (leaveRes.data) {
            setLeaveRequest(leaveRes.data);
          }

          setLoading(false); // Move setLoading(false) inside fetchData
        };

        fetchData();
      } catch (error) {
        console.log('error during fetching data in manager dashboard', error);
        setLoading(false); // Handle error and setLoading(false)
      }
    }
  }, [currentUserData, id]);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={style.container}>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('ActiveUser', {id: id})}>
          <View>
            <Icon name="users" style={style.userIcon} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {activeStaff ? activeStaff : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>Active Staff</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('CheckInUser', {id: id})}>
          <View>
            <IconFa6 name="clock-rotate-left" style={style.checkinIcon} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {checkinCount ? checkinCount : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>In Office</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('NotCheckInUser', {id: id})}>
          <View>
            <IconFa6 name="clock-rotate-left" style={style.checkoutIcon} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {checkoutCount ? checkoutCount : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>Not In Office</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('LeaveRequest', {id: id})}>
          <View>
            <IconM name="calendar-alert" style={style.leaveRequest} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {pendingLeaveData ? pendingLeaveData : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>Leave Request</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('LateEarly', {id: id})}>
          <View>
            <IconM name="clock-fast" style={style.lateEarly} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {pendingLateEarly ? pendingLateEarly : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>Late Early</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.card}
          onPress={() => navigation.navigate('InactiveUser', {id: id})}>
          <View>
            <Icon name="users-slash" style={style.InactiveuserIcon} />
          </View>
          <View>
            <Text style={styles.textHeading}>
              {inActiveStaffs ? inActiveStaffs : 0}
            </Text>
          </View>
          <View>
            <Text style={styles.lable}>Inactive Staff</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: 140,
    height: 120,
    margin: 10,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: textColor,
    padding: 20,
    alignItems: 'start',
    justifyContent: 'center',
  },
  userIcon: {
    color: 'white',
    fontSize: 15,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#318ce7',
  },

  InactiveuserIcon: {
    color: 'white',
    fontSize: 15,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#d2122e',
  },

  checkinIcon: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#1cac78',
  },
  checkoutIcon: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#de3163',
  },
  leaveRequest: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffc72c',
  },
  lateEarly: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#e3963e',
  },
});
