import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';

const ForgetPassword = props => {
  const handlePress = () => {
    props.navigation.navigate('OTP');
  };

  return (
    <View style={styles.container}>
      <View style={loginStyles.logincontainer}>
        <View style={loginStyles.loginHeader}>
          <Text style={styles.textHeading}>Forgot Password</Text>
          <Text style={styles.textDesc}>
            Enter your e-mail address and we'll send you a OTP to reset your
            password
          </Text>
        </View>
        <View style={loginStyles.loginBody}>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="example@gmail.com"
            />
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
          <TouchableOpacity style={styles.primaryButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;
