import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';
import {Formik} from 'formik';
import {LoginSchema} from '../../utils/validationSchema.js';
import {useDispatch} from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../redux/slices/auth/authSlice.js';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi.js';

const Login = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async values => {
    try {
      setIsLoading(true);
      dispatch(loginStart());

      const res = await authApi.Login(values);

      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
        setIsLoading(false);
        props.navigation.navigate('Home');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Login successfully',
          text2: 'congratulation! you are logged in successfully',
          visibilityTime: 4000,
          autoHide: true,
        });
      } else {
        setIsError(res.data.message);
        dispatch(loginFailure());
      }

      return res;
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Credential',
        text2: 'Please check your email and password.',
        visibilityTime: 4000,
        autoHide: true,
      });
      dispatch(loginFailure());
    }
    setIsLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={values => handleLogin(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={loginStyles.logincontainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>Login</Text>
                <Text style={styles.textDesc}>
                  Welcome back ! Please enter your details.
                </Text>
              </View>
              <View style={loginStyles.loginBody}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Email:</Text>
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
                  <Text style={styles.lable}>Password:</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default Login;
