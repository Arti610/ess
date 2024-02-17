import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  styles,
  textColor,
} from '../../../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';
import getApi from '../../../redux/slices/utils/getApi';
import {currentUser} from '../../../utils/currentUser';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../utils/ActivityIndicator';
import createApi from '../../../redux/slices/utils/createApi';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {SkypeIndicator} from 'react-native-indicators';
import userApi from '../../../redux/slices/users/userApi';
import {
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from '../../../redux/slices/users/userSlice';
import {useDispatch} from 'react-redux';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [branchLatitude, setBranchLatitude] = useState(null);
  const [branchLongitude, setBranchLongitude] = useState(null);
  const [checkinLoading, setcheckinLoading] = useState(false);
  const [checkoutLoading, setcheckoutLoading] = useState(false);
  const [attendence, setAttendence] = useState(null);
  const [inoutData, setInoutData] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [totalWorkingHours, setTotalWorkingHours] = useState([
    '00',
    '00',
    '00',
  ]);

  const currentDate = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formattedTime = currentDate.toLocaleTimeString('en-US', options);
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentDate]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await currentUser();

      if (res) {
        setToken(res.token);
        setCurrentUserId(res.data);
      }
    };
    fetchCurrentUser();

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getApi.getAllCheckinoutList(token);

        if (res.data) {
          setLoading(false);
          setInoutData(res.data);
        }
      } catch (error) {
        console.log(
          'error during getting all checkin/checkout',
          error.response,
        );
      }
    };
    fetchData();
  }, []);
  // Get BranInformation\

  useEffect(() => {
    const branchId = currentUserId && currentUserId.branch && currentUserId.branch.id ? currentUserId.branch.id : null;
    const fetchData = async () => {
      try {
        if (branchId) {
          const res = await getApi.getBranchsBranchInfo(branchId);

          if (res.data) {
            setBranchLatitude(
              res.data[0] && res.data[0].latitude ? res.data[0].latitude : null,
            );
            setBranchLongitude(
              res.data[0] && res.data[0].longitude
                ? res.data[0].longitude
                : null,
            );
          }
        }
      } catch (error) {
        console.log(
          'error during getting branchinfo in staff dashboard',
          error.response,
        );
      }
    };
    fetchData();

    const fetchUser = async () => {
      try {
        dispatch(getUserStart());

        const res = await userApi.getUserById(currentUserId.id);
        if (res) {
          setAttendence(res.data);
        }
        dispatch(getUserSuccess());
      } catch (error) {
        console.log(error);
        dispatch(getUserFailed());
      }
    };

    fetchUser();
  }, [currentUserId]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };


const requestLocationPermission = async () => {
  try {
    // Check if permission is already granted
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    );
    console.log('granted',granted);
    // If permission is already granted, proceed
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      // If permission is not granted, request it
      const permissionRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      // Check if the permission request is granted
      if (permissionRequest === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};


  useEffect(() => {
    requestLocationPermission();
  }, []);

  const dateTime = new Date();

  function timeToMilliseconds(hours, minutes, seconds) {
    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
    return totalMilliseconds;
  }

  function millisecondsToTime(milliseconds) {
    // Calculate hours
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    // Calculate remaining milliseconds after subtracting hours
    let remainingMilliseconds = milliseconds % (1000 * 60 * 60);

    // Calculate minutes
    const minutes = Math.floor(remainingMilliseconds / (1000 * 60));

    // Calculate remaining milliseconds after subtracting minutes
    remainingMilliseconds %= 1000 * 60;

    // Calculate seconds
    const seconds = Math.floor(remainingMilliseconds / 1000);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  const localcurrentTime = new Date();

  useEffect(() => {
    if (inoutData) {
      const formattedDate = dateTime.toLocaleDateString();

      const intervalId = setInterval(() => {
        try {
          const filteredData =
            inoutData &&
            inoutData.check_in &&
            inoutData.check_in.filter(item => {
              const itemDate = new Date(item.date_time);
              const itemDateOnly = itemDate.toLocaleDateString();
              const matchDate = itemDateOnly === formattedDate;
              return matchDate;
            });

          const filteredCheckoutData =
            inoutData &&
            inoutData.check_out &&
            inoutData.check_out.filter(item => {
              const itemDate = new Date(item.date_time);
              const itemDateOnly = itemDate.toLocaleDateString();
              const matchDate = itemDateOnly === formattedDate;
              return matchDate;
            });
          const checkout_time = new Date(
            filteredCheckoutData &&
              filteredCheckoutData.length > 0 &&
              filteredCheckoutData[0].date_time,
          ).getTime();

          const checkin_time = new Date(
            filteredData &&
              filteredData.length > 0 &&
              filteredData[0].date_time,
          ).getTime();

          if (filteredCheckoutData.length > 0) {
            const timeDifferenceCheckout = checkout_time - checkin_time;

            const differenceTimecheckout = new Date(timeDifferenceCheckout);
            // Get the time components
            const hours = differenceTimecheckout.getUTCHours();
            const minutes = differenceTimecheckout.getUTCMinutes();
            const seconds = differenceTimecheckout.getUTCSeconds();

            // Format the time
            const time = `${hours.toString().padStart(2, '0')}:${minutes
              .toString()
              .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            setTotalWorkingHours(time.split(':'));
          } else if (filteredData.length > 0) {
            const checkintime = new Date(checkin_time);

            const checkinhour = checkintime.getUTCHours();
            const checkinminut = checkintime.getUTCMinutes();
            const checkinsecond = checkintime.getUTCSeconds();

            const cuttenthour = localcurrentTime.getHours();
            const cuttentminut = localcurrentTime.getMinutes();
            const cuttentsecond = localcurrentTime.getSeconds();

            const differenceInMiliSecond =
              timeToMilliseconds(cuttenthour, cuttentminut, cuttentsecond) -
              timeToMilliseconds(checkinhour, checkinminut, checkinsecond);

            let hours = millisecondsToTime(differenceInMiliSecond);

            setTotalWorkingHours([hours.hours, hours.minutes, hours.seconds]);
          } else {
            setTotalWorkingHours(['00', '00', '00']);
          }
        } catch (error) {
          console.log('error', error);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [inoutData, totalWorkingHours]);

  const date_time = new Date();

  // Extracting individual components of the date and time
  const year = date_time.getFullYear();
  const month = String(date_time.getMonth() + 1).padStart(2, '0');
  const day = String(date_time.getDate()).padStart(2, '0');
  const hours = String(date_time.getHours()).padStart(2, '0');
  const minutes = String(date_time.getMinutes()).padStart(2, '0');
  const seconds = String(date_time.getSeconds()).padStart(2, '0');

  // Creating the desired string format
  const formatted_date_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  // GeoLocation @end
  const hanldeCheckin = async () => {
    getCurrentLocation();
    const enableResult = await promptForEnableLocationIfNeeded();

    const payload = {
      checkin_checkout: 'CheckIn',
      date_time: formatted_date_time ? formatted_date_time : new Date(),
      user: currentUserId && currentUserId.id ? currentUserId.id : null,
      branch:
        currentUserId && currentUserId.branch && currentUserId.branch.id
          ? currentUserId.branch.id
          : null,
    };
    console.log([
      enableResult,
      latitude,
      longitude,
      branchLongitude,
      branchLatitude,
    ]);
    if (
      enableResult &&
      latitude &&
      longitude &&
      branchLongitude &&
      branchLatitude
    ) {
      // Calculate distance between user and branch
      const distance = calculateDistance(
        latitude,
        longitude,
        branchLatitude,
        branchLongitude,
      );

      // Set a threshold distance for considering user at branch location
      const thresholdDistance = 500; // in meters

      if (distance <= thresholdDistance) {
        try {
          setcheckinLoading(true);

          const res = await createApi.createCheckin(payload);
          if (res.status === 201 || res.status === 200) {
            Toast.show({
              type: 'success',
              text1: 'Check-in successfully',
              text2: 'Congratulations, you have checked in successfully',
              autoHide: 3000,
            });
            setcheckinLoading(false);
            getApi.getAllCheckinoutList(token);
          }
        } catch (error) {
          setcheckinLoading(false);
          console.log('Error during check-in', error.response.data);
          Toast.show({
            type: 'error',
            text1: error.response.data,
            text2: 'Please try again on the following day.',
            autoHide: 3000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You are not at the correct location for check-in.',
          autoHide: 3000,
        });
      }
    } else {
      console.log(
        'Location services are not enabled or user location not available.',
      );
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'Location services are not enabled or user location not available.',
        autoHide: 3000,
      });
    }
  };

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in meters
    return d;
  };

  // Function to convert degrees to radians
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const handleCheckout = async () => {
    const payload = {
      checkin_checkout: 'CheckOut',
      date_time: formatted_date_time ? formatted_date_time : new Date(),
      user: currentUserId && currentUserId.id ? currentUserId.id : null,
      branch:
        currentUserId && currentUserId.branch && currentUserId.branch.id
          ? currentUserId.branch.id
          : null,
    };

    try {
      setcheckoutLoading(true);
      const res = await createApi.createCheckout(payload);

      if (res.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Check-out successfully',
          text2: 'Congratulations, you have checked out successfully',
          autoHide: 3000,
        });
        setcheckoutLoading(false);
        getApi.getAllCheckinoutList(token);
        getApi.getAllCheckinoutList(token);
      } else {
        setcheckoutLoading(false);
        Toast.show({
          type: 'error',
          text1: res.data,
          text2: 'Please try again on the following day.',
          autoHide: 3000,
        });
      }
    } catch (error) {
      setcheckoutLoading(false);
      console.log('Error during check-in', error.response);
      Toast.show({
        type: 'error',
        text1: error.response.data,
        text2: 'Please try again on the following day.',
        autoHide: 3000,
      });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={style.container}>
        {/*Header @start */}
        <View style={style.header}>
          <TouchableOpacity style={style.card} onPress={hanldeCheckin}>
            {checkinLoading ? (
              <SkypeIndicator color={primaryColor} size={35} />
            ) : (
              <>
                <View style={{justifyContent: 'center'}}>
                  <Text>checkin</Text>
                  <Text style={[styles.lable, {fontSize: 15}]}>
                    {currentTime}
                  </Text>
                </View>
                <View>
                  <Icon
                    name="export"
                    style={[style.userIcon, {backgroundColor: secondaryColor}]}
                  />
                </View>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={style.card} onPress={handleCheckout}>
            {checkoutLoading ? (
              <SkypeIndicator color={primaryColor} size={35} />
            ) : (
              <>
                <View style={{justifyContent: 'center'}}>
                  <Text>checkout</Text>
                  <Text style={[styles.lable, {fontSize: 15}]}>
                    {currentTime}
                  </Text>
                </View>
                <View>
                  <Icon
                    name="export2"
                    style={[style.userIcon, {backgroundColor: 'pink'}]}
                  />
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>
        {/*Header @end */}
        <View >
          <Text  style={styles.textSubHeading}>Total Working Hours</Text>
          <View style={style.progressTimer}>
          <View style={style.timerBox}>
              <Text style={styles.textHeading}>{totalWorkingHours[0]}</Text>
              <Text style={style.text}>Hours</Text>
            </View>
            <View style={{alignItems: 'start', height: '70%'}}>
              <Text style={styles.textHeading}>:</Text>
            </View>
            <View style={style.timerBox}>
              <Text style={styles.textHeading}>{totalWorkingHours[1]}</Text>
              <Text style={style.text}>Minuts</Text>
            </View>
            <View style={{alignItems: 'start', height: '70%'}}>
              <Text style={styles.textHeading}>:</Text>
            </View>
            <View style={style.timerBox}>
              <Text style={styles.textHeading}>{totalWorkingHours[2]}</Text>
              <Text style={style.text}>Seconds</Text>
            </View>
          </View>
        </View>

        {/*Body @start */}
        <View style={style.body}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textSubHeading}>Explore</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginVertical: 10,
            }}>
            <View style={style.exploreCard}>
              <IconE name="calendar" style={{color: 'red', fontSize: 30}} />
              <Text style={styles.lable}>
                {attendence && attendence.check_in ? attendence.check_in : 0}
              </Text>
              <Text>Attendence</Text>
            </View>
            <View style={style.exploreCard}>
              <IconM
                name="featured-play-list"
                style={{color: 'pink', fontSize: 30}}
              />
              <Text style={styles.lable}>
                {attendence && attendence.leaves ? attendence.leaves : 0}
              </Text>
              <Text>Leave</Text>
            </View>
            <View style={style.exploreCard}>
              <IconF name="money" style={{color: 'green', fontSize: 30}} />
              <Text style={styles.lable}>
                {' '}
                {attendence &&
                attendence.monthly_salary &&
                attendence.monthly_salary.length > 0
                  ? attendence.monthly_salary[0].total_salary
                  : 0}
              </Text>
              <Text>Salary</Text>
            </View>
          </View>
        </View>
        {/*Body @end */}
        {/*Footer @start */}
        <View style={style.footer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.textSubHeading}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Clock')}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>View All</Text>
            </TouchableOpacity>
          </View>

          {inoutData &&
            inoutData.check_in &&
            inoutData.check_in.slice(0, 1).map((item, i) => (
              <View style={style.activityCard} key={i}>
                <View>
                  <Icon
                    name="export"
                    style={[style.userIcon, {backgroundColor: secondaryColor}]}
                  />
                </View>
                <View>
                  <Text style={styles.lable}>Checkin</Text>
                  <Text>
                    {item.date_time
                      ? moment(item.date_time).format('DD MMM YYYY')
                      : null}
                  </Text>
                </View>
                <View>
                  <Text style={styles.lable}>
                    {item.date_time
                      ? new Date(item.date_time).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                          timeZone: 'UTC',
                        })
                      : null}
                  </Text>
                  <Text>{item.punctuality}</Text>
                </View>
              </View>
            ))}
          {inoutData &&
            inoutData.check_out &&
            inoutData.check_out.slice(0, 1).map((item, i) => (
              <View style={style.activityCard} key={i}>
                <View>
                  <Icon
                    name="export2"
                    style={[style.userIcon, {backgroundColor: 'pink'}]}
                  />
                </View>
                <View>
                  <Text style={styles.lable}>Checkout</Text>
                  <Text>
                    {item.date_time
                      ? moment(item.date_time).format('DD MMM YYYY')
                      : null}
                  </Text>
                </View>
                <View>
                  <Text style={styles.lable}>
                    {item.date_time
                      ? new Date(item.date_time).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                          timeZone: 'UTC',
                        })
                      : null}
                  </Text>
                  <Text>{item.punctuality}</Text>
                </View>
              </View>
            ))}
        </View>
        {/*Footer @end */}
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    gap: 10,
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'start',
  },

  footer: {
    gap: 8,
  },
  card: {
    width: 160,
    height: 100,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: textColor,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'start',
    justifyContent: 'space-between',
  },
  exploreCard: {
    width: 105,
    height: 100,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: textColor,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userIcon: {
    fontSize: 25,
    textAlign: 'center',
    color: primaryColor,
    padding: 8,
    height: 40,
    width: 40,
    borderRadius: 20,
  },

  activityCard: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: textColor,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTimer: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  timerBox: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    backgroundColor: primaryColor,
    color: '#fff',
    height: 30,
    width: '100%',
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
  },
});
