import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';
import {Formik} from 'formik';
import {LoginSchema} from '../../utils/validationSchema.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../redux/slices/auth/authSlice.js';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ButtonLoader from '../../utils/BtnActivityIndicator.jsx';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';
import createApi from '../../redux/slices/utils/createApi.js';
import DeviceInfo from 'react-native-device-info';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isLoading} = useSelector(state => state.auth);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);
  const [loginValues, setLoginValues] = useState({email: '', password: ''});

  const fireInitialize = async () => {
    if (Platform.OS === 'android') {
      // Code specific to Android platform
      console.log('Running on Android');
      try {
        const androidCredentials = {
          appId: '1:374720264061:android:3fdb536512755a75597e14',
          apiKey: 'AIzaSyBJYm6AbCdNj_vlUT-iTahUZbRZd0zBSEE',
          databaseURL: '',
          storageBucket: 'essnative-d9772.appspot.com',
          messagingSenderId: '374720264061',
          projectId: 'essnative-d9772',
        };

        const config = {
          name: 'ANDROID',
        };
        if (!firebase.apps.length) {
          await firebase.initializeApp(androidCredentials, config);
        }
      } catch (error) {
        console.log('error when regstering the app ====', error);
      }
    }
  };

  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log('requesting for notification permissions');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS?.POST_NOTIFICATIONS,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted', granted);
        } else {
          console.log('Notification permission denied ', granted);
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const getFirebasePermissions = async () => {
    messaging()
      .requestPermission({
        carPlay: false,
        sound: true,
        announcement: true,
        provisional: false,
      })
      .then(async authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          const registered = messaging().isDeviceRegisteredForRemoteMessages;

          if (registered === true) {
            await messaging()
              .getAPNSToken()
              .then(async apnsToken => {
                const token = await messaging().getToken();
                console.log(token, 'token');
                if (token != null) {
                  setDeviceToken(token);
                }
              });
          }
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const getDeviceInfo = async () => {
    try {
      const deviceId = DeviceInfo.getDeviceId();
      const deviceType = DeviceInfo.getDeviceType();

      setDeviceInfo({deviceId, deviceType});
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  };

  const payload = {
    token: deviceToken && deviceToken,
    deviceType:
      deviceInfo && deviceInfo.deviceType ? deviceInfo.deviceType : null,
    deviceid: deviceInfo && deviceInfo.deviceId ? deviceInfo.deviceId : null,
    username: loginValues && loginValues.email ? loginValues.email : null,
  };

  useEffect(() => {
    fireInitialize();
    requestNotificationPermission();
    getFirebasePermissions();
    getDeviceInfo();
  }, []);

  const handleChange = (name, value) => {
    setLoginValues(prevState => ({...prevState, [name]: value}));
  };

  const navigateToDashboard = userType => {
    const route =
      userType === 'Management'
        ? 'Base'
        : userType === 'Manager'
        ? 'managerDashboard'
        : 'StaffBase';
    navigation.navigate(route, {id: null});
  };

  const handleLogin = async () => {
    try {
      dispatch(loginStart());
      const res = await authApi.Login(loginValues);
      console.log('res.status', res.status);
      if (res.status === 200 || res.data) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('currentUser', JSON.stringify(res.data));

        dispatch(loginSuccess(res.data));
        navigateToDashboard(res.data.user_type);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Login successful',
          text2: 'Congratulations! You are logged in.',
          visibilityTime: 4000,
          autoHide: true,
        });
        if (
          payload.token &&
          payload.deviceType &&
          payload.deviceid &&
          payload.username
        ) {
          const res = await createApi.createNotificationFCM(payload);

          if (res.status === 200) {
            console.log('post FCM notification successfully');
          }
        }
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Invalid Credentials',
          text2: 'Please check your email and password. mai hu else',
          visibilityTime: 4000,
          autoHide: true,
        });
        dispatch(loginFailure());
      }
    } catch (error) {
      console.log('error====>', error.response.data.Message);
      if (error === undefined) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Invalid Credentials',
          text2: 'Please check your email and password. mai hu else',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
      dispatch(loginFailure());
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({handleBlur, handleSubmit, errors}) => (
              <View style={loginStyles.logincontainer}>
                <View style={loginStyles.loginHeader}>
                  <IconA name="login" style={[styles.icon, style.loginIcon]} />
                  <Text style={styles.textHeading}>Login</Text>
                  <Text style={styles.textDesc}>
                    Welcome back! Please enter your details.
                  </Text>
                </View>
                <View style={loginStyles.loginBody}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.lable}>Email</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => handleChange('email', text)}
                      onBlur={handleBlur('email')}
                      value={loginValues.email}
                      placeholder="example@gmail.com"
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.lable}>Password</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => handleChange('password', text)}
                      onBlur={handleBlur('password')}
                      value={loginValues.password}
                      placeholder="••••••••"
                      secureTextEntry={isPasswordHidden}
                    />
                    <TouchableOpacity
                      style={{position: 'absolute', top: 40, right: 8}}
                      onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                      <Icon
                        name={isPasswordHidden ? 'eye-slash' : 'eye'}
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Forgot Password')}>
                    <Text style={styles.navigateText}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
                <View style={loginStyles.loginFooter}>
                  {isLoading ? (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      disabled={isLoading}>
                      <ButtonLoader />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleSubmit}
                      disabled={isLoading}>
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      {/* <Toast /> */}
    </>
  );
};

export default Login;

const style = StyleSheet.create({
  loginIcon: {
    textAlign: 'center',
    fontSize: 180,
    marginBottom: 50,
  },
});
