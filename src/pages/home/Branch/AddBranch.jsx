import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../../style';
import { loginStyles } from '../../auth/Login';
import Toast from 'react-native-toast-message';
import { getCountry } from '../../../redux/slices/utils/countryApi';
import { useDispatch, useSelector } from 'react-redux';
import { branchFailure } from '../../../redux/slices/branch/branchSlice';
import { createBranch, getAllBranch, getBranchById } from '../../../redux/slices/branch/branchApi';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../../utils/ActivityIndicator';
import API_CONFIG from '../../../config/apiConfig';
import SearchableDropdown from 'react-native-searchable-dropdown'


const AddBranch = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const route = useRoute()
  const navigation = useNavigation()
  const { isLoading, branchDataById } = useSelector((state) => state.branch)
  const recivedId = route.params?.data || null;

  const [data, setData] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  const onCountrySelect = (item) => {
    console.log('item', item);
    setSelectedCountry(item.id);
    setSelectedCountryName(item.name);
  };

  const [image, setImage] = useState(null)

  const options = {
    maxWidth: 200,
    maxHeight: 200,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

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
    try {

      let form_data = new FormData();
      form_data.append('image', {
        name: image.assets[0].fileName ? image.assets[0].fileName : "",
        type: image.assets[0].type ? image.assets[0].type : "",
        uri: image.assets[0].uri ? image.assets[0].uri : "",
      });

      form_data.append("country", selectedCountry ? selectedCountry : "")
      form_data.append("name", values.name ? values.name : "")
      form_data.append("city", values.city ? values.city : "")
      form_data.append("address", values.address ? values.address : "",)
      console.log('form_data', form_data);
      // const res = await createBranch(dispatch, form_data);

      if (res.status === 200) {
        navigation.navigate('Home')
        getAllBranch()
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Branch created successfully',
          visibilityTime: 4000,
          autoHide: true,
        });

      }
    } catch (error) {
      dispatch(branchFailure());
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong during branch creation',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };


  useEffect(() => {
    // Fetch Country Data 
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
  // console.log('cvalues',cvalues);

  return (
    isLoading ? <Loader /> :
      <ScrollView>
        <>
          <View style={styles.container}>
            <Formik
              initialValues={initialState}
              onSubmit={values => handlePress(values)}>
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.formContainer}>
                  <View style={loginStyles.loginHeader}>
                    <Text style={styles.textHeading}>{recivedId ? 'Update' : 'Add'} Branch</Text>
                    <Text style={styles.textDesc}>
                      Integrate a new branch seamlessly into your existing project
                      workflow.
                      <Text>{recivedId}</Text>
                    </Text>
                  </View>

                  <View style={styles.loginBody}>

                    <View style={styles.inputContainer}>
                      <Text style={styles.lable}>Country</Text>
                      {/* <Dropdown
                      handleDD={func}
                      cvalues={cvalues}
                      name="country"
                      data={data}
                      onChangeText={(selectedCountry) => handleChange('country')(selectedCountry)}
                      onBlur={handleBlur('country')}
                      value={cvalues ? cvalues?.name : null}
                      required
                    /> */}
                      <SearchableDropdown
                        multi={false}
                        containerStyle={{ padding: 0 }}
                        itemsContainerStyle={{ maxHeight: 170 }}
                        itemStyle={{
                          padding: 10,
                          marginTop: 2,
                          backgroundColor: '#ffffff',
                          borderColor: '#bbb',
                        }}
                        items={data}
                        itemTextStyle={{ color: '#000000' }}
                        onItemSelect={onCountrySelect}
                        resetValue={false}
                        textInputProps={{
                          // ref: inputRef,
                          placeholder: recivedId ? (selectedCountryName === null ? branchDataById.country.name : selectedCountryName) : (selectedCountryName === null ? 'select country' : selectedCountryName),
                          placeholderTextColor: '#000',
                          underlineColorAndroid: 'transparent',
                          style: {
                            paddingLeft: 10,
                          },
                        }}
                        listProps={{
                          nestedScrollEnabled: true,
                        }}
                      />
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
                        value={recivedId ? (branchDataById?.name ? branchDataById?.name : null) : (values?.name ? values?.name : null)}
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
                        value={recivedId ? (branchDataById?.city ? branchDataById?.city : null) : (values?.city ? values?.city : null)}
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
                        value={recivedId ? (branchDataById?.address ? branchDataById?.address : null) : (values?.address ? values?.address : null)}
                        placeholder='Enter address (e.g., 123 Main St)'
                      />
                    </View>

                    <View style={styles.inputContainer}>

                  
                      {!recivedId ?
                        <Image
                          source={{ uri: `${API_CONFIG.imageUrl}${branchDataById.image}` }}
                          style={{ flex: 1, width: null, height: null, borderRadius: 50 }}
                          onError={(error) => console.error('Image Error:', error)}
                        />
                        // <Text>{`${API_CONFIG.imageUrl}${branchDataById.image}`}</Text>
                        // <Text>h</Text>
                        :
                        // image?.assets.map((item, i) => (
                        //   <TouchableOpacity
                        //     key={i}
                        //     style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 5, borderColor: 'gray' }}
                        //     onPress={() => handleChooseImage(item.uri)}
                        //   >
                        //     <Image
                        //       source={{ uri: item.uri }}
                        //       style={{ flex: 1, width: null, height: null, borderRadius: 50 }}
                        //     />
                        //   </TouchableOpacity>
                        // ))
                        <Image
                        source={require('../../../assests/branch.jpg')}
                        style={{ flex: 1, width: null, height: null, borderRadius: 50 }}
                        onError={(error) => console.error('Image Error:', error)}
                      />
                      
                      // <Text>nhi</Text>
                      }

                      <TouchableOpacity onPress={handleChooseImage} style={styles.uploadUI}><Text>upload images</Text></TouchableOpacity>
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
          <Toast />
        </>
      </ScrollView>
  );
};


export default AddBranch;
