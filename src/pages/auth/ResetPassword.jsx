import React from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../../../style';
import { loginStyles } from './Login.js';
import { Formik } from 'formik';
import { changePasswordSchema } from '../../utils/validationSchema.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
} from '../../redux/slices/auth/authSlice.js';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonLoader from '../../utils/BtnActivityIndicator.jsx';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const handlePress = async values => {
    console.log('values',values);
    const storedEmail = await AsyncStorage.getItem('userEmail');
    try {
      dispatch(resetPasswordStart());
      const payload = {
        email: storedEmail,
        new_password: values.password,
        confirm_password: values.confirm_password,
      };

      const res = await authApi.passwordReset(payload);
      if (res.status === 200) {
        dispatch(resetPasswordSuccess());
        props.navigation.navigate('Confirmation');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Password reset successfully',
          text2:
            'Congratulations, your password reset successfully back to login with your new password',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    } catch (error) {
      dispatch(resetPasswordFailure());
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Password',
        text2: 'your new password & confirm password is invlid, retry it',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Formik
          initialValues={{ password: '', confirm_password: '' }}
          validationSchema={changePasswordSchema}
          onSubmit={values => console.log('values', values)}>
          {({ handleSubmit, handleChange, handleBlur, errors, values }) => (
            <View style={loginStyles.logincontainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>Reset Password</Text>
                <Text style={styles.textDesc}>
                  Enter your new password and confirm it.
                </Text>
              </View>
              <View style={loginStyles.loginBody}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>New Password</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Confirm Pasword</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                  />
                  <Text style={styles.errorText}>
                    {errors.confirm_password}
                  </Text>
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
                  {isLoading ? <ButtonLoader /> : <Text style={styles.buttonText}>Reset Password</Text>}
                </TouchableOpacity>

              </View>
            </View>
          )}
        </Formik>
      </View>
      <Toast />
    </>
  );
};

export default ResetPassword;
