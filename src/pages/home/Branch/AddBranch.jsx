import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { getCountry } from '../../../redux/slices/utils/countryApi';
import { createBranch, updateBrnach } from '../../../redux/slices/branch/branchApi';
import API_CONFIG from '../../../config/apiConfig';
import { styles } from '../../../../style';
import { loginStyles } from '../../auth/Login';
import RBSheet from "react-native-raw-bottom-sheet";
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import ButtonLoader from '../../../utils/BtnActivityIndicator';

const AddBranch = () => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation()

  const { isLoading, branchDataById } = useSelector((state) => state.branch);

  const recivedId = route.params?.data || null;
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  const onCountrySelect = (item) => {
    setSelectedCountry(item.id);
    setSelectedCountryName(item.name);
  };

  const initialState = {
    country: '',
    name: '',
    city: '',
    image: '',
    address: '',
  };

  const handleChooseImage = async (source) => {
    const options = {
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if (source === 'camera') {
      launchCamera(options, handleImagePickerResponse);
    } else {
      launchImageLibrary(options, handleImagePickerResponse);
    }
  };

  const handleImagePickerResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setImage(response);
    }
  };

  const handlePress = async (values) => {

    try {
      let form_data = new FormData();
      recivedId ?
        (image?.assets[0] ? form_data.append('image', {
          name: image.assets[0].fileName ? image.assets[0].fileName : '',
          type: image.assets[0].type ? image.assets[0].type : '',
          uri: image.assets[0].uri ? image.assets[0].uri : '',
        })
          : null)
        : (image?.assets[0] ? form_data.append('image', {
          name: image.assets[0].fileName ? image.assets[0].fileName : '',
          type: image.assets[0].type ? image.assets[0].type : '',
          uri: image.assets[0].uri ? image.assets[0].uri : '',
        }) : null)

      form_data.append('country', selectedCountry ? selectedCountry : branchDataById?.country.id);
      form_data.append('name', values.name ? values.name : branchDataById.name);
      form_data.append('city', values.city ? values.city : branchDataById.city);
      form_data.append('address', values.address ? values.address : branchDataById.address);

      recivedId ? await updateBrnach(recivedId, dispatch, form_data, navigation) : await createBranch(dispatch, form_data, navigation)

    } catch (error) {
      console.log('Error occured during branch creation or updation : ', error);
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
          console.error('Invalid data format from getCountry');
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountry();
  }, []);

  return (

    <>
      <View style={styles.container}>
        <Formik
          initialValues={recivedId ? { ...branchDataById } : initialState}
          // validationSchema={addBranch}
          onSubmit={handlePress}   >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <View style={loginStyles.loginHeader}>
                <Text style={styles.textHeading}>{recivedId ? 'Update' : 'Add'} Branch</Text>
              </View>

              <View style={styles.loginBody}>

                <View style={styles.profileContainer}>
                  {recivedId ?
                    <View>
                      <Image source={image !== null ? { uri: image?.assets[0].uri } : { uri: `${API_CONFIG.imageUrl}${branchDataById?.image}` }} style={styles.updateProfile} />
                      <TouchableOpacity onPress={() => refRBSheet.current.open()} ><Icons name='edit' style={styles.updateProfileBtn} /></TouchableOpacity>

                      <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                          wrapper: {
                            backgroundColor: "transparent",
                          },
                          container: {
                            height: 150
                          },
                          draggableIcon: {
                            backgroundColor: "#000",
                          }
                        }}
                      >
                        <View style={styles.launchImageOption}>
                          <TouchableOpacity onPress={() => handleChooseImage('camera')} style={styles.touchableOpacity}><Icon name='camera' style={styles.icon} /><Text style={styles.lable}>Use Camera</Text></TouchableOpacity>
                          <TouchableOpacity onPress={() => handleChooseImage('gallary')} style={styles.touchableOpacity}><IconF5 name='images' style={styles.icon} /><Text style={styles.lable}>Upload from Gallary</Text></TouchableOpacity>
                        </View>
                      </RBSheet>
                    </View> :
                    <View>
                      {image ? <Image source={{ uri: image?.assets[0].uri }} style={styles.updateProfile} /> : <Image source={require('../../../assests/branch.jpg')} style={styles.updateProfile} />}
                      <TouchableOpacity onPress={() => refRBSheet.current.open()} ><Icons name='edit' style={styles.updateProfileBtn} /></TouchableOpacity>

                      <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                          wrapper: {
                            backgroundColor: "transparent",
                          },
                          container: {
                            height: 150
                          },
                          draggableIcon: {
                            backgroundColor: "#000",
                          }
                        }}
                      >
                        <View style={styles.launchImageOption}>
                          <TouchableOpacity onPress={() => handleChooseImage('camera')} style={styles.touchableOpacity}><Icon name='camera' style={styles.icon} /><Text style={styles.lable}>Use Camera</Text></TouchableOpacity>
                          <TouchableOpacity onPress={() => handleChooseImage('gallary')} style={styles.touchableOpacity}><IconF5 name='images' style={styles.icon} /><Text style={styles.lable}>Upload from Gallary</Text></TouchableOpacity>
                        </View>
                      </RBSheet>
                    </View>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Country</Text>
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
                    items={data?.map(item => ({ ...item, key: item.id }))}
                    itemTextStyle={{ color: '#000000' }}
                    onItemSelect={onCountrySelect}
                    resetValue={false}
                    textInputProps={{
                      placeholder: recivedId ? (selectedCountryName === null ? (branchDataById?.country?.name ? branchDataById?.country?.name : null) : selectedCountryName) : (selectedCountryName === null ? 'select country' : selectedCountryName),
                      placeholderTextColor: '#000',
                      underlineColorAndroid: 'transparent',
                      style: styles.textInput,

                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder='Branch Name (e.g., Downtown Branch)'
                  />
                  {touched.name && errors.name ? (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>City</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    placeholder='City Name (e.g., Los Angeles)'
                  />
                  {touched.city && errors.city ? (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Address</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder='Enter address (e.g., 123 Main St)'
                  />
                  {touched.address && errors.address ? (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  ) : null}
                </View>

              </View>

              <View style={styles.loginFooter}>
                {isLoading ? (
                  <TouchableOpacity
                  style={styles.primaryButton}
                  >
                    <ButtonLoader />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={
                      handleSubmit
                    }>
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
  );
};

export default AddBranch;
