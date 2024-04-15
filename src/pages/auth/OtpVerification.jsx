import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../style';
import { loginStyles } from './Login.js';
import { Formik } from 'formik';
import { OTPSchema } from '../../utils/validationSchema.js';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerificationFailure,  otpVerificationStart,  otpVerificationSuccess } from '../../redux/slices/auth/authSlice.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonLoader from '../../utils/BtnActivityIndicator.jsx';

const OtpVerification = props => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const handlePress = async values => {
    const storedEmail = await AsyncStorage.getItem('userEmail');

    try {
      dispatch(otpVerificationStart());
      const payload = {
        email: storedEmail,
        otp: values.otp,
      };

      const res = await authApi.verifyOtp(payload);
      if (res.status === 200) {
        dispatch(otpVerificationSuccess());
        props.navigation.navigate('Reset Password');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'OTP verify successfully',
          text2:
            'Your entered OTP verified, enter your new password for reset password and confirm it',
          visibilityTime: 4000,
          autoHide: true,
        });
      }

      return res;
    } catch (error) {
      dispatch(otpVerificationFailure());
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid OTP',
        text2:
          'you have entered invalid OTP, please check your email and verify it',
        visibilityTime: 4000,
        autoHide: true,
      });
      throw error;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={OTPSchema}
          onSubmit={values => handlePress(values)}>
          {({ handleSubmit, handleChange, handleBlur, errors, values }) => (
            <View style={loginStyles.logincontainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>OTP Verification</Text>
                <Text style={styles.textDesc}>Enter your OTP and verify</Text>
              </View>
              <View style={loginStyles.loginBody}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>OTP</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your OTP"
                    onChangeText={handleChange('otp')}
                    onBlur={handleBlur('otp')}
                    value={values.otp}
                  />
                  <Text style={styles.errorText}>{errors.otp}</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={styles.navigateText}
                    onPress={() => props.navigation.navigate('Login')}>
                    Back To Login
                  </Text>
                </View>
              </View>
              <View style={loginStyles.loginFooter}>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSubmit}>
                  {isLoading ? <ButtonLoader /> : <Text style={styles.buttonText}>Verify OTP</Text>}
                </TouchableOpacity>

              </View>
            </View>
          )}
        </Formik>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default OtpVerification;
