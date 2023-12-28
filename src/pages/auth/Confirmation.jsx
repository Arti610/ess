import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../../style';
import {loginStyles} from './Login.js';
import Toast from 'react-native-toast-message';

const Confirmation = props => {
  return (
    <>
      <View style={styles.container}>
        <View style={loginStyles.logincontainer}>
          <View style={loginStyles.resetCard}>
            <Text style={styles.textHeading}>Password Reset Successfully</Text>
            <Text style={styles.textDesc}>
              Password reset successful. You can now log in with your new
              password. Thank you!
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
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default Confirmation;
