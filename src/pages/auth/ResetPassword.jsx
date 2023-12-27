import React from 'react';
import {TouchableOpacity, Text, TextInput, View} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';

const ResetPassword = props => {
  const handlePress = () => {
    props.navigation.navigate('Confirmation');
  };

  return (
    <View style={styles.container}>
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
            <TextInput style={styles.textInput} placeholder="••••••••" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Confirm Pasword</Text>
            <TextInput style={styles.textInput} placeholder="••••••••" />
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
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
