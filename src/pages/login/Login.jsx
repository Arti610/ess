/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../../../style';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logincontainer}>
        <View style={styles.loginContent}>
          <Text style={styles.loginContentTitle}>Login</Text>
          <Text style={styles.loginContentDesc}>
            Welcome back! Please enter your details.
          </Text>
        </View>
        <View style={styles.loginInputs}>
            <Text>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here to translate!"
            />
        </View>
        <View style={styles.loginbuttons}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logincontainer: {
    width: '90%',
    height: '80%',
  },
  loginContent: {
    flex: 1,
  },
  loginInputs: {
    // Add any other styles for the container here
  },
  textInput: {
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 5, 
    padding: 10, 
   },
  loginContentTitle: {
    color: '#101828',
    fontSize: 24,
    fontweight: 'bold',
    lineHeight: 32,
  },
  loginContentDesc: {
    color: '#475467',
    fontSize: 16,
    fontweight: 'bold',
    lineHeight: 32,
  },
  loginInputs: {
    flex: 5,
  },

  loginbuttons: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default Login;
