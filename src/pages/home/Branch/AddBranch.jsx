import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../../style';
import { loginStyles } from '../../auth/Login';
import Toast from 'react-native-toast-message';
import { getCountry } from '../../../redux/slices/utils/countryApi';
import Dropdown from '../../../utils/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { branchFailure } from '../../../redux/slices/branch/branchSlice';
import { createBranch } from '../../../redux/slices/branch/branchApi';
import { launchImageLibrary } from 'react-native-image-picker';

const AddBranch = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [image, setImage] = useState(null)
  const [cvalues, setcValues] = useState({
    country: null,
  });

  const options = {
    maxWidth: 200,
    maxHeight: 200,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  const { isLoading } = useSelector((state) => state.branch)

  const initialState = {
    country: null,
    name: null,
    city: null,
    image: null,
    address: null,
  };

  const handleChooseImage = async () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
           setImage(response);
      }
    });
  };

  const handlePress = async (values) => {
    const payload = {
      country: cvalues? cvalues : null,
      name: values.name ? values.name : null,
      city: values.city ? values.city : null,
      image: image && image.assets.length > 0 ? image.assets[0].uri : null,
      address: values.address ? values.address : null,
    };

    console.log('Payload:', payload);

    try {
      const res = await createBranch(dispatch, payload)
      console.log('res', res);
      if (res.status === 200) {
        console.log('branch created successfully');
      }
    } catch (error) {
      dispatch(branchFailure())
    }
  };

  const func = (text) => {

    setcValues(text)
  }
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await getCountry();

        if (res) {
          setData(res.data);
        } else {
          console.error("Invalid data format from getCountry");
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={initialState}
          // validationSchema={addBranch}
          onSubmit={values => handlePress(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                  <Dropdown
                    handleDD={func}
                    name="country"
                    data={data} // Assuming 'data' contains the list of countries with 'id' and 'name'
                    onChangeText={(selectedCountry) => handleChange('country')(selectedCountry)}
                    onBlur={handleBlur('country')}
                    value={values.country ? values.country.name : null}
                    required
                  />
                  {/* {console.log('values.country',selectedCountry)} */}
                  {errors.country ? (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    required
                    value={values.name}
                    placeholder='Branch Name (e.g., Downtown Branch)'
                  />

                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>City</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    required
                    value={values.city}
                    placeholder='City Name (e.g., Los Angeles)'

                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Address</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    required
                    value={values.address}
                    placeholder='Enter address (e.g., 123 Main St)'
                  />
                </View>

                <View style={styles.inputContainer}>
                  {/* <Text style={styles.lable}>Image</Text> */}

                  <Button title="Choose Image" onPress={handleChooseImage} />
                  {image && 
                    image.assets.map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 5, borderColor: 'gray' }}
                        onPress={() => handleChooseImage(item.uri)}
                      >
                        <Image
                          source={{ uri: item.uri }}
                          style={{ flex: 1, width: null, height: null, borderRadius: 50 }}
                        />
                       </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
              <View style={styles.loginFooter}>
                {isLoading ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                )}
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
