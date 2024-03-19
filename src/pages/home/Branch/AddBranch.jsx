import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {  getAllBranch} from '../../../redux/slices/branch/branchApi';
import API_CONFIG from '../../../config/apiConfig';
import {styles} from '../../../../style';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import ButtonLoader from '../../../utils/BtnActivityIndicator';
import {addBranch} from '../../../utils/validationSchema';
import Loader from '../../../utils/ActivityIndicator';
import {SelectList} from 'react-native-dropdown-select-list';
import getApi from '../../../redux/slices/utils/getApi';
import createApi from '../../../redux/slices/utils/createApi';
import updateApi from '../../../redux/slices/utils/updateApi';

const AddBranch = () => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const recivedId = route.params?.data || null;
  const [data, setData] = useState([]);
  const [loding, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectCountry, setSelectCountry] = useState(null);
  const [initialState, setInitialState] = useState({
    country: null,
    name: null,
    city: null,
    image: null,
    address: null,
  });

  const handleChooseImage = async source => {
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

  const handleImagePickerResponse = response => {
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

  const handlePress = async values => {
    try {
      let form_data = new FormData();
      recivedId
        ? image?.assets[0]
          ? form_data.append('image', {
              name: image.assets[0].fileName ? image.assets[0].fileName : '',
              type: image.assets[0].type ? image.assets[0].type : '',
              uri: image.assets[0].uri ? image.assets[0].uri : '',
            })
          : null
        : image?.assets[0]
        ? form_data.append('image', {
            name: image.assets[0].fileName ? image.assets[0].fileName : '',
            type: image.assets[0].type ? image.assets[0].type : '',
            uri: image.assets[0].uri ? image.assets[0].uri : '',
          })
        : null;
   
      form_data.append('country',  selectCountry.key ? selectCountry.key : selectCountry );
      form_data.append('name', values.name ? values.name : branchDataById.name);
      form_data.append('city', values.city ? values.city : branchDataById.city);
      form_data.append('address', values.address ? values.address : branchDataById.address);

      // const res =  recivedId ? await updateBrnach(recivedId, dispatch, form_data, navigation) : await createBranch(dispatch, form_data, navigation)
      console.log('form_data', form_data);

      if (recivedId) {
        setIsLoading(true);
        const res = await updateApi.updateBranch(recivedId, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
       
        if (res.status === 200 || res.status === 201) {
          setIsLoading(false);
          navigation.navigate('Base');
          Toast.show({
            type: 'success',
            text1: 'Branch updated successfully',
            text2: 'Congratulations, you have successfully create a new branch',
            autoHide: true,
          });
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Branch not updated',
            text2: 'Your branch has not updated, try again',
            autoHide: true,
          });
        }
      } else {
        setIsLoading(true);
        const res = await createApi.createBranch(form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });

        if (res.status === 200 || res.status === 201) {
          navigation.navigate('Base');
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Branch created successfully',
            text2: 'Congratulations, you have successfully create a new branch',
            autoHide: true,
          });
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Branch not created',
            text2: 'Your branch has not created, try again',
            autoHide: true,
          });
        }
      }
    } catch (error) {
      console.log(
        'Error occured during branch creation or updation : ',
        error.response,
      );
    }
  };

  useEffect(() => {
    // Fetch Country Data and initial state
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getApi.getCountry();

        if (res.data) {
          const transformCountryData = res.data.map(item => ({
            key: item.id.toString(),
            value: `${item.name}`,
          }));

          setData(transformCountryData);
        } else {
          console.error('Invalid data format from getCountry');
        }

        // Fetch branch data if recivedId exists
        if (recivedId) {
          const branchRes = await getApi.getBranchById(recivedId);
          if (branchRes.data) {
            const branchData = branchRes.data;

            const transformedCountryData = {
              key: branchData.country.id,
              value: branchData.country.name,
            };
            setInitialState({
              country: transformedCountryData,
              name: branchData.name,
              city: branchData.city,
              image: branchData.image,
              address: branchData.address,
            });
            setSelectCountry(transformedCountryData);
            setImage(branchData.image);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recivedId]);

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={initialState}
              validationSchema={addBranch}
              onSubmit={handlePress}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <View style={styles.loginBody}>
                    <View style={styles.profileContainer}>
                      {recivedId ? (
                        <View>
                          {image !== null ? (
                            <Image
                              source={{
                                uri: `${API_CONFIG.imageUrl}${image}`,
                              }}
                              style={styles.updateProfile}
                            />
                          ) : (
                            <Image
                              source={require('../../../assests/branch.jpg')}
                              style={styles.updateProfile}
                            />
                          )}

                          <TouchableOpacity
                            onPress={() => refRBSheet.current.open()}>
                            <Icons
                              name="edit"
                              style={styles.updateProfileBtn}
                            />
                          </TouchableOpacity>
                          <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                              wrapper: {
                                backgroundColor: 'transparent',
                              },
                              container: {
                                height: 150,
                              },
                              draggableIcon: {
                                backgroundColor: '#000',
                              },
                            }}>
                            <View style={styles.launchImageOption}>
                              <TouchableOpacity
                                onPress={() => handleChooseImage('camera')}
                                style={styles.touchableOpacity}>
                                <Icon name="camera" style={styles.icon} />
                                <Text style={styles.lable}>Use Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleChooseImage('gallary')}
                                style={styles.touchableOpacity}>
                                <IconF5 name="images" style={styles.icon} />
                                <Text style={styles.lable}>
                                  Upload from Gallary
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </RBSheet>
                        </View>
                      ) : (
                        <View>
                          {image ? (
                            <Image
                              source={{uri: image?.assets[0].uri}}
                              style={styles.updateProfile}
                            />
                          ) : (
                            <Image
                              source={require('../../../assests/branch.jpg')}
                              style={styles.updateProfile}
                            />
                          )}
                          <TouchableOpacity
                            onPress={() => refRBSheet.current.open()}>
                            <Icons
                              name="edit"
                              style={styles.updateProfileBtn}
                            />
                          </TouchableOpacity>
                          <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                              wrapper: {
                                backgroundColor: 'transparent',
                              },
                              container: {
                                height: 150,
                              },
                              draggableIcon: {
                                backgroundColor: '#000',
                              },
                            }}>
                            <View style={styles.launchImageOption}>
                              <TouchableOpacity
                                onPress={() => handleChooseImage('camera')}
                                style={styles.touchableOpacity}>
                                <Icon name="camera" style={styles.icon} />
                                <Text style={styles.lable}>Use Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleChooseImage('gallary')}
                                style={styles.touchableOpacity}>
                                <IconF5 name="images" style={styles.icon} />
                                <Text style={styles.lable}>
                                  Upload from Gallary
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </RBSheet>
                        </View>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.lable}>Country</Text>
                      <SelectList
                        boxStyles={styles.textInput}
                        dropdownStyles={styles.textInput}
                        setSelected={val => setSelectCountry(val)}
                        data={data}
                        save="key"
                        placeholder={
                          selectCountry
                            ? selectCountry.value
                            : 'Select Country e.g. (India)'
                        }
                        notFoundText="Data not found"
                        value={selectCountry} 
                        onBlur={handleBlur('country')}
                        onChangText={handleChange('country')}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.lable}>Name</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Branch Name (e.g., Downtown Branch)"
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
                        placeholder="City Name (e.g., Los Angeles)"
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
                        placeholder="Enter address (e.g., 123 Main St)"
                      />
                      {touched.address && errors.address ? (
                        <Text style={styles.errorText}>{errors.address}</Text>
                      ) : null}
                    </View>
                  </View>

                  <View style={styles.loginFooter}>
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleSubmit}>
                      {isLoading ? (
                        <ButtonLoader />
                      ) : (
                        <Text style={styles.buttonText}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
      <Toast />
    </>
  );
};

export default AddBranch;
