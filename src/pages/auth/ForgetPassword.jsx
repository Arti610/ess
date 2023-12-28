import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';
import {Formik} from 'formik';
import {forgetPasswordSchema} from '../../utils/validationSchema.js';
import authApi from '../../redux/slices/auth/authApi.js';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgetPasswordFailure,
  forgetPasswordStart,
  forgetPasswordSuccess,
} from '../../redux/slices/auth/authSlice.js';

const ForgetPassword = props => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.auth);

  const handlePress = async values => {
    try {
      dispatch(forgetPasswordStart());
      const res = await authApi.forgetPassword(values);

      if (res.status === 200) {
        dispatch(forgetPasswordSuccess(values.email));
        props.navigation.navigate('OTP Verification');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'OTP send successfully',
          text2:
            'OTP send to your registered email, please check your email and verify it',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid email',
        text2: 'Please provide your registered email to get OTP',
        visibilityTime: 4000,
        autoHide: true,
      });
      dispatch(forgetPasswordFailure());
      throw error;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Formik
          initialValues={{email: ''}}
          validationSchema={forgetPasswordSchema}
          onSubmit={values => handlePress(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={loginStyles.logincontainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>Forgot Password</Text>
                <Text style={styles.textDesc}>
                  Enter your e-mail address and we'll send you a OTP to reset
                  your password
                </Text>
              </View>
              <View style={loginStyles.loginBody}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="example@gmail.com"
                  />
                  <Text style={styles.errorText}>{errors.email}</Text>
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
                {isLoading ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default ForgetPassword;
