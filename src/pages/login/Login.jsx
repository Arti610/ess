import React, { useState } from 'react'
import { TouchableOpacity, Text, TextInput, View } from 'react-native'
import { styles } from '../../../style'
import {loginStyles} from './Login.js'

const Login = () => {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };
  
  const handlePress = () => {

  }

  return (
    <View style={styles.container}>
      <View style={loginStyles.logincontainer}>
        <View style={loginStyles.loginHeader}>
          <Text style={styles.textHeading}>Login</Text>
          <Text style={styles.textDesc}>Welcome back !  Please enter your details.</Text>
        </View>      
        <View style={loginStyles.loginBody}>
        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Email</Text>
          <TextInput style={styles.textInput} placeholder='example@gmail.com'/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Password</Text>
          <TextInput style={styles.textInput} placeholder='••••••••'/>
        </View>
        <View style={styles.inputContainer}>
          {/* <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checked]} />
            <Text style={styles.lable}>Remember for 30 days</Text>
          </TouchableOpacity> */}
            <Text style={styles.navigateText}>Forgot Password</Text>
        </View>

        </View>      
        <View style={loginStyles.loginFooter}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>      
      </View>
    </View>
  )
}

export default Login