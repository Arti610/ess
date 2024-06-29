import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ScrollView,
  Alert,
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
import LogoutModal from '../../../utils/LogoutModal';


const Dashboard = () => {
  const navigation = useNavigation();

  const [currentTime, setCurrentTime] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [branchLatitude, setBranchLatitude] = useState(null);
  const [branchLongitude, setBranchLongitude] = useState(null);
  const [checkinLoading, setcheckinLoading] = useState(false);
  const [checkoutLoading, setcheckoutLoading] = useState(false);
  const [startBreakLoading, setStartBreakLoading] = useState(false);
  const [endBreakLoading, setEndBreakLoading] = useState(false);
  const [breakTimeData, setBreakTimeData] = useState(null);
  const [attendence, setAttendence] = useState(null);
  const [inoutData, setInoutData] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalTWH, setFinalTWH] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalWorkingHours, setTotalWorkingHours] = useState([
    '00',
    '00',
    '00',
  ]);
  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

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

      if (res.data) {
        setToken(res.token);
        setCurrentUserId(res.data);
      }
    };
    fetchCurrentUser();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (
        currentUserId &&
        currentUserId.id &&
        currentUserId.user_type === 'Manager'
      ) {
        const res = await getApi.getCheckinCheckoutManager(currentUserId.id);
        if (res.data) {
          setLoading(false);
          setInoutData(res.data);
        }
      } else {
        const res = await getApi.getAllCheckinoutList(token);
        if (res.data) {
          setLoading(false);
          setInoutData(res.data);
        }
      }
    } catch (error) {
      console.log('error during getting all checkin/checkout', error.response);
    }
  };

  const fetchBreakTime = async () => {
    try {
      setLoading(true);
      const payload = {date: moment(currentDate).format('YYYY-MM-DD')};
      const id = currentUserId && currentUserId.id;
      const res = await getApi.getBreakHours(id, payload);
      if (res.data) {
        setBreakTimeData(res.data);
      }
    } catch (error) {
      console.log('get error during getting the breaktime', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalWH = async () => {
    try {
      const id = currentUserId && currentUserId?.id;
      const year = moment(currentDate).format('YYYY');
      const month = moment(currentDate).format('MM');

      const response = await getApi.getTotalWorkingHours(id, year, month);
      setFinalTWH(response.data);
    } catch (error) {
      console.log('get error during getting the totalworking hours', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBreakTime();
    fetchTotalWH();
  }, [currentUserId]);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
      
        
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
        const res = await getApi.getIndividualUser(currentUserId.id);
        if (res) {
        
          setAttendence(res.data);
          console.log(res.data);
          setBranchLatitude(res.data.user_data.location_master.latitude)
          setBranchLongitude(res.data.user_data.location_master.longitude)
        }
      } catch (error) {
        console.log(error);
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
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  const requestLocationPermission = async () => {
    try {
      // Check if permission is already granted
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('granted', granted);
      // If permission is already granted, proceed
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        showAlertAndGetLocation();
      } else {
        // If permission is not granted, request it
        const permissionRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
          showAlertAndGetLocation();
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showAlertAndGetLocation = () => {
    Alert.alert(
      "Location Usage",
      "Your location is used for check-in.",
      [
        {
          text: "OK",
          onPress: () => getCurrentLocation()
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     // {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
  //   );
  // };

  // const requestLocationPermission = async () => {
  //   try {
  //     // Check if permission is already granted
  //     const granted = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  //     );
  //     console.log('granted', granted);
  //     // If permission is already granted, proceed
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       // If permission is not granted, request it
  //       const permissionRequest = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  //         {
  //           title: 'Location Permission',
  //           message: 'App needs access to your location',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );

  //       // Check if the permission request is granted
  //       if (permissionRequest === PermissionsAndroid.RESULTS.GRANTED) {
  //         getCurrentLocation();
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

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

  function isToday(dateString) {
    const dateField = new Date(dateString);
    const today = new Date();

    // Compare year, month, and day parts of the two dates
    return (
      dateField.getFullYear() === today.getFullYear() &&
      dateField.getMonth() === today.getMonth() &&
      dateField.getDate() === today.getDate()
    );
  }

  const date_time = new Date();
  let checkinMilliseconds;
  let checkoutMilliseconds;
  let startBreakMiliseconds;
  let endBreakMiliseconds;

  useEffect(() => {
    try {
      let intervalId;

      const handleTimer = () => {
        if (
          inoutData &&
          inoutData.check_in &&
          inoutData.check_in.length > 0 &&
          isToday(inoutData.check_in[0].date_time)
        ) {
          const checkintime = inoutData.check_in[0].date_time
            .split('T')[1]
            .slice(0, -1);

          const [checkinHour, checkinMinute, checkinSecond] = checkintime
            .split(':')
            .map(Number);
          checkinMilliseconds = timeToMilliseconds(
            checkinHour,
            checkinMinute,
            checkinSecond,
          );
        }
        if (
          inoutData &&
          inoutData.check_out &&
          inoutData.check_out.length > 0 &&
          isToday(inoutData.check_out[0].date_time)
        ) {
          const checkouttime = inoutData.check_out[0].date_time
            .split('T')[1]
            .slice(0, -1);

          const [checkoutHour, checkoutMinute, checkoutSecond] = checkouttime
            .split(':')
            .map(Number);
          checkoutMilliseconds = timeToMilliseconds(
            checkoutHour,
            checkoutMinute,
            checkoutSecond,
          );
        }

        if (breakTimeData && breakTimeData.length > 0) {
          const breakStartTime =
            breakTimeData &&
            breakTimeData[0].break_out_time &&
            breakTimeData[0].break_out_time.split(':');

          const [hours, minutes, seconds] = breakStartTime.map(Number);

          // Convert each unit to milliseconds
          const hoursInMilliseconds = hours * 60 * 60 * 1000;
          const minutesInMilliseconds = minutes * 60 * 1000;
          const secondsInMilliseconds = seconds * 1000;

          // Sum up the milliseconds
          startBreakMiliseconds =
            hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
        }

        if (breakTimeData && breakTimeData.length > 0) {
          const breakEndTime =
            breakTimeData &&
            breakTimeData[0].break_in_time &&
            breakTimeData[0].break_in_time.split(':');

          endBreakMiliseconds =
            breakEndTime &&
            timeToMilliseconds(
              parseInt(breakEndTime[0], 10),
              parseInt(breakEndTime[1], 10),
              parseInt(breakEndTime[2], 10),
            );
        }

        if (checkinMilliseconds && !startBreakMiliseconds) {
          const currentTime = moment(date_time).format('HH:mm:ss');

          const [currentHour, currentMinute, currentSecond] = currentTime
            .split(':')
            .map(Number);
          const currentTimeMilliseconds = timeToMilliseconds(
            currentHour,
            currentMinute,
            currentSecond,
          );
          const elapsedMilliseconds =
            currentTimeMilliseconds - checkinMilliseconds;
          const remainingTime = millisecondsToTime(elapsedMilliseconds);

          setTotalWorkingHours([
            remainingTime.hours,
            remainingTime.minutes,
            remainingTime.seconds,
          ]);
        } else if (startBreakMiliseconds && !endBreakMiliseconds) {
          const difference = startBreakMiliseconds - checkinMilliseconds;

          const remainingTime = millisecondsToTime(difference);

          setTotalWorkingHours([
            remainingTime.hours,
            remainingTime.minutes,
            remainingTime.seconds,
          ]);
        } else if (endBreakMiliseconds && !checkoutMilliseconds) {
          const currentTime = moment(date_time).format('HH:mm:ss');
          const [currentHour, currentMinute, currentSecond] = currentTime
            .split(':')
            .map(Number);
          const currentTimeMilliseconds = timeToMilliseconds(
            currentHour,
            currentMinute,
            currentSecond,
          );

          // Calculate time elapsed since check-in
          const elapsedMilliseconds = currentTimeMilliseconds - checkinMilliseconds;

          // If there was a break, subtract break time from the total elapsed time
          const breakTimeElapsed = endBreakMiliseconds - startBreakMiliseconds;
          const remainingTimeAfterBreak =
            elapsedMilliseconds - breakTimeElapsed;

          // Convert remaining milliseconds to hours, minutes, and seconds
          const remainingTime = millisecondsToTime(remainingTimeAfterBreak);

          // Set total working hours
          setTotalWorkingHours([
            remainingTime.hours,
            remainingTime.minutes,
            remainingTime.seconds,
          ]);
          console.log('Timer resumed');
        } else if (checkoutMilliseconds) {
          const value = checkoutMilliseconds - checkinMilliseconds;
          const breakvalue = startBreakMiliseconds - endBreakMiliseconds;
          const remainingTimeAfterCheckout = value - breakvalue;

          const remainingTime = millisecondsToTime(remainingTimeAfterCheckout);
          
          setTotalWorkingHours([
            remainingTime.hours,
            remainingTime.minutes,
            remainingTime.seconds,
          ]);
          // Stop the timer by clearing the interval
          clearInterval(intervalId);
        }
      };

      intervalId = setInterval(handleTimer, 1000);

      return () => clearInterval(intervalId);
    } catch (error) {
      console.log('error', error);
    }
  }, [inoutData, breakTimeData, totalWorkingHours]);

  // Extracting individual components of the date and time
  const year = date_time.getFullYear();
  const month = String(date_time.getMonth() + 1).padStart(2, '0');
  const day = String(date_time.getDate()).padStart(2, '0');
  const hours = String(date_time.getHours()).padStart(2, '0');
  const minutes = String(date_time.getMinutes()).padStart(2, '0');
  const seconds = String(date_time.getSeconds()).padStart(2, '0');

  // Creating the desired string format
  const formatted_date_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

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
      const distance = calculateDistance(
        latitude,
        longitude,
        branchLatitude,
        branchLongitude,
      );

      const thresholdDistance = 500;

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
            fetchData();
          }
        } catch (error) {
          setcheckinLoading(false);
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
          text1: 'Incorrect location',
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
      // Check if the user has already checked in today
      const hasCheckedInToday = inoutData.check_in.some(item => {
        return (
          new Date(item.date_time).toDateString() === new Date().toDateString()
        );
      });

      if (!hasCheckedInToday) {
        Toast.show({
          type: 'error',
          text1: 'Please check in first',
          text2: 'You must check in before checking out.',
          autoHide: 3000,
        });
        setModalVisible(false)
        return;
      }

      if (
        breakTimeData &&
        breakTimeData.length > 0 &&
        breakTimeData[0].break_in_time === null
      ) {
        Toast.show({
          type: 'error',
          text1: 'Please End break first',
          text2: "You cann't be checkout without ending your break",
          autoHide: 3000,
        });
        setModalVisible(false);
        return;
      }

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
        setModalVisible(false);
        fetchData();
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

      Toast.show({
        type: 'error',
        text1: error.response.data,
        text2: 'Please try again on the following day.',
        autoHide: 3000,
      });
    }
  };

  const handleStartBreak = async () => {
    try {
      setStartBreakLoading(true);

      const dateTime = new Date();

      const payload = {
        time: moment(dateTime).format('HH:mm:ss'),
        date: moment(dateTime).format('YYYY-MM-DD'),
        type: 'break_out',
      };

      if (
        inoutData.check_in &&
        inoutData.check_in[0] &&
        inoutData.check_in[0].date_time
      ) {
        const checkInDate = new Date(inoutData.check_in[0].date_time);
        const currentDate = new Date();

        // Comparing date parts
        if (
          checkInDate.getDate() === currentDate.getDate() &&
          checkInDate.getMonth() === currentDate.getMonth() &&
          checkInDate.getFullYear() === currentDate.getFullYear()
        ) {
          const res = await createApi.createBreakHours(payload);

          if (res.status === 200 || res.data) {
            Toast.show({
              type: 'success',
              text1: 'Break time started',
              text2: 'Do not forget to end your break to continue your work',
              autoHide: 3000,
            });

            fetchBreakTime();
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Please check in first',
            text2: 'You must check in before start break.',
            autoHide: 3000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please check in first',
          text2: 'You must check in before start break.',
          autoHide: 3000,
        });
      }
    } catch (error) {
      console.error('Error starting break:', error);
      // Handle error - show error message to the user, etc.
      Toast.show({
        type: 'error',
        text1: 'Error starting break',
        text2: 'An error occurred while starting the break. Please try again.',
        autoHide: 3000,
      });
    } finally {
      // Clear loading state regardless of success or failure
      setStartBreakLoading(false);
    }
  };

  const handleEndBreak = async () => {
    try {
      setEndBreakLoading(true);
      const dateTime = new Date();

      const payload = {
        time: moment(dateTime).format('HH:mm:ss'),
        date: moment(dateTime).format('YYYY-MM-DD'),
        type: 'break_in',
      };

      if (breakTimeData && breakTimeData[0].break_out_time != null) {
        const res = await createApi.createBreakHours(payload);
        if (res.status === 200 || res.data) {
          Toast.show({
            type: 'success',
            text1: 'Break ended',
            text2: 'You can now resume your work',
            autoHide: 3000,
          });
          fetchBreakTime();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'No active break',
          text2: 'You must start a break before ending it.',
          autoHide: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Please start break first',
        text2: 'You must start a break before ending it.',
        autoHide: 3000,
      });
    } finally {
      setEndBreakLoading(false);
    }
  };

  const checkInDateTime = moment.utc(
    inoutData && inoutData.check_in.length >0 && inoutData.check_in[0].date_time,
  );
  const current = moment.utc();

  const isCheckedInToday =
    checkInDateTime.year() === current.year() &&
    checkInDateTime.month() === current.month() &&
    checkInDateTime.date() === current.date();

  const checkOutDateTime = moment.utc(
    inoutData && inoutData.check_out.length >0 && inoutData.check_out[0].date_time,
  );

  const isCheckeoutToday =
    checkOutDateTime.year() === current.year() &&
    checkOutDateTime.month() === current.month() &&
    checkOutDateTime.date() === current.date() &&
    breakTimeData &&
    breakTimeData.length > 0 &&
    breakTimeData[0].break_in_time != null;

  const checkinbuttonStyles = isCheckedInToday
    ? {backgroundColor: secondaryColor, opacity: 0.5}
    : {};

  const checkoutbuttonStyles = isCheckeoutToday
    ? {backgroundColor: secondaryColor, opacity: 0.5}
    : {};

  const isBreakStartToday =
    breakTimeData &&
    breakTimeData.length > 0 &&
    breakTimeData.some(
      breakData =>
        breakData.break_out_time &&
        breakData.break_in_time === null &&
        moment.utc(breakData.date).isSame(currentDate, 'day'),
    );

  const startBreakstyles =
    isBreakStartToday || isCheckeoutToday
      ? {backgroundColor: secondaryColor, opacity: 0.5}
      : {};
  const endBreakstyles = isCheckeoutToday
    ? {backgroundColor: secondaryColor, opacity: 0.5}
    : {};

  return loading ? (
    <Loader />
  ) : (
    <>
      <ScrollView>
        <View style={style.container}>
          {/*Header @start */}

          <View style={style.header}>
            <TouchableOpacity
              style={[style.card, checkinbuttonStyles]}
              onPress={hanldeCheckin}
              disabled={isCheckedInToday}>
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
                      style={[
                        style.userIcon,
                        {backgroundColor: secondaryColor},
                      ]}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.card, checkoutbuttonStyles]}
              onPress={() => setModalVisible(true)}
              disabled={isCheckeoutToday}>
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
            </TouchableOpacity>
          </View>
          <View style={style.header}>
            <TouchableOpacity
              style={[style.card, startBreakstyles]}
              onPress={handleStartBreak}
              disabled={isBreakStartToday}>
              {startBreakLoading ? (
                <SkypeIndicator color={primaryColor} size={35} />
              ) : (
                <>
                  <View style={{justifyContent: 'center'}}>
                    <Text>Start Break</Text>
                    <Text style={[styles.lable, {fontSize: 15}]}>
                      {currentTime}
                    </Text>
                  </View>
                  <View>
                    <Icon
                      name="export"
                      style={[
                        style.userIcon,
                        {backgroundColor: secondaryColor},
                      ]}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.card, endBreakstyles]}
              onPress={handleEndBreak}
              disabled={isCheckeoutToday}>
              {endBreakLoading ? (
                <SkypeIndicator color={primaryColor} size={35} />
              ) : (
                <>
                  <View style={{justifyContent: 'center'}}>
                    <Text>End Break</Text>
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
          {/* <Text>{finalTWH}</Text> */}
          {/*Header @end */}
          <View>
            <Text style={styles.textSubHeading}>Total Working Hours</Text>
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
              {currentUserId && currentUserId.user_type === 'Manager' ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('checkin/checkout', {data: attendence})
                  }>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Clock')}>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {breakTimeData &&
              // breakTimeData[0].break_in_time != null &&
              breakTimeData
                .filter(item => isToday(item.date))
                .slice()
                .reverse()
                .map((item, i) => (
                  <View style={style.activityCard} key={i}>
                    <View>
                      <Icon
                        name="export2"
                        style={[style.userIcon, {backgroundColor: 'pink'}]}
                      />
                    </View>
                    <View>
                      <Text style={styles.lable}>End Break</Text>
                      <Text>
                        {item.date
                          ? moment(item.date).format('DD MMM YYYY')
                          : null}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.lable}>
                        {item.break_in_time
                          ? moment(item.break_in_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )
                          : 'Not ended'}
                      </Text>
                    </View>
                  </View>
                ))}
            {breakTimeData &&
              // breakTimeData[0].break_out_time != null &&
              breakTimeData
                .filter(item => isToday(item.date))
                .slice()
                .reverse()
                .map((item, i) => (
                  <View style={style.activityCard} key={i}>
                    <View>
                      <Icon
                        name="export"
                        style={[
                          style.userIcon,
                          {backgroundColor: secondaryColor},
                        ]}
                      />
                    </View>
                    <View>
                      <Text style={styles.lable}>Start Break</Text>
                      <Text>
                        {item.date
                          ? moment(item.date).format('DD MMM YYYY')
                          : null}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.lable}>
                        {item.break_out_time
                          ? moment(item.break_out_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )
                          : null}
                      </Text>
                    </View>
                  </View>
                ))}
            {inoutData && inoutData.check_in ? (
              inoutData.check_in
                .filter(item => isToday(item.date_time))
                .slice(0, 1)
                .map((item, i) => (
                  <View style={style.activityCard} key={i}>
                    <View>
                      <Icon
                        name="export"
                        style={[
                          style.userIcon,
                          {backgroundColor: secondaryColor},
                        ]}
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
                          ? new Date(item.date_time).toLocaleTimeString(
                              'en-US',
                              {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'UTC',
                              },
                            )
                          : null}
                      </Text>
                      <Text>{item.punctuality}</Text>
                    </View>
                  </View>
                ))
            ) : (
              <Text style={{textAlign: 'center', marginVertical: 20}}>
                No Recent Activity !
              </Text>
            )}
            {inoutData &&
              inoutData.check_out &&
              inoutData.check_out
                .filter(item => isToday(item.date_time))
                .slice(0, 1)
                .map((item, i) => (
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
                          ? new Date(item.date_time).toLocaleTimeString(
                              'en-US',
                              {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'UTC',
                              },
                            )
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

      <LogoutModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        handleLogout={handleCheckout}
        loading={checkoutLoading}
        text="Checkout"
      />
    </>
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
