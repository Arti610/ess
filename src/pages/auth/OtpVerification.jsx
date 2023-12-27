import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';

const OtpVerification = props => {
  const handlePress = () => {
    props.navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.container}>
      <View style={loginStyles.logincontainer}>
        <View style={loginStyles.loginHeader}>
          <Text style={styles.textHeading}>OTP Verification</Text>
          <Text style={styles.textDesc}>Enter your OTP and verify</Text>
        </View>
        <View style={loginStyles.loginBody}>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>OTP</Text>
            <TextInput style={styles.textInput} placeholder="Enter your OTP" />
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
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpVerification;
