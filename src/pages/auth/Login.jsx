import React from 'react';
import {TouchableOpacity, Text, TextInput, View} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';
import {Formik} from 'formik';
import {LoginSchema} from '../../utils/validationSchema.js';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const initialValues = {email: '', password: ''};
  const handlePress = () => {};

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handlePress}>
        {({handleBlur, handleChange, handleSubmit, values, errors}) => (
          <View style={loginStyles.logincontainer}>
            <View style={loginStyles.loginHeader}>
              <Text style={styles.textHeading}>Login</Text>
              <Text style={styles.textDesc}>
                Welcome back ! Please enter your details.
              </Text>
            </View>
            <View style={loginStyles.loginBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="example@gmail.com"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text
                  style={styles.navigateText}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  Forgot Password
                </Text>
              </View>
            </View>
            <View style={loginStyles.loginFooter}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
