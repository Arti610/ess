import {Formik} from 'formik';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../../../style';
import {loginStyles} from '../../auth/Login';
import Toast from 'react-native-toast-message';
import {addBranch} from '../../../utils/validationSchema';

const AddBranch = () => {
  const initialState = {
    country: null,
    name: null,
    city: null,
    image: null,
    address: null,
  };
  const handlePress = () => {};
  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={initialState}
          validationSchema={addBranch}
          onSubmit={values => handlePress(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.formContainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>Add Branch</Text>
                <Text style={styles.textDesc}>
                  Integrate a new branch seamlessly into your existing project
                  workflow.
                </Text>
              </View>
              <View style={styles.loginBody}>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Country</Text>
                  <TextInput
                    style={styles.textInput}
                    required
                    onChange={handleChange('country')}
                    onBlur={handleBlur('country')}
                  />
                  {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    required
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>City</Text>
                  <TextInput
                    style={styles.textInput}
                    onChange={handleChange('city')}
                    onBlur={handleBlur('city')}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Address</Text>
                  <TextInput
                    style={styles.textInput}
                    onChange={handleChange('address')}
                    onBlur={handleBlur('address')}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Image</Text>
                  <TextInput
                    style={styles.textInput}
                    onChange={handleChange('image')}
                  />
                </View>
              </View>
              <View style={styles.loginFooter}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.primaryButton}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
  );
};

export default AddBranch;
