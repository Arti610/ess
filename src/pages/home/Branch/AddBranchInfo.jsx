import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {styles} from '../../../../style';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Loader from '../../../utils/ActivityIndicator';
import {useDispatch} from 'react-redux';
import {SelectList} from 'react-native-dropdown-select-list';
import updateApi from '../../../redux/slices/utils/updateApi';
import createApi from '../../../redux/slices/utils/createApi';
import getApi from '../../../redux/slices/utils/getApi';
import ButtonLoader from '../../../utils/BtnActivityIndicator';
import moment from 'moment';

const AddBranchInfo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const receivedId = route.params?.data || null;

  const [checkinShow, setCheckinShow] = useState(false);
  const [checkoutShow, setCheckoutShow] = useState(false);
  const [placesList, setPlacesList] = useState([]);
  const [branchName, setBranchName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectBranch, setSelectBranch] = useState(false);

  const [formData, setFormData] = useState({
    check_in_time: null,
    check_out_time: null,
    break_time1: null,
    total_office_time1: null,
    city: null,
    place: null,
    latitude: null,
    longitude: null,
    branch: null,
  });

  const onChangeCheckin = (event, selectedDate) => {
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      setCheckinShow(false);
      setFormData(prevFormData => ({
        ...prevFormData,
        check_in_time: formattedTime,
      }));
    }
  };

  const onChangeCheckout = (event, selectedDate) => {
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      setCheckoutShow(false);
      setFormData(prevFormData => ({
        ...prevFormData,
        check_out_time: formattedTime,
      }));
    }
  };

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCityChange = async place => {
    try {
      const res = await getApi.get_places(place);

      if (res) {
        setPlacesList(
          res.data.map(item => {
            return {label: item, value: item};
          }),
        );
      }
    } catch (error) {
      console.log('Error during fetching API for places');
    }
  };

  const handleSubmit = async () => {
    const fData = new FormData();
    fData.append(
      'check_in_time',
      receivedId ? formData.check_in_time : formData.check_in_time
       
    );
    fData.append(
      'check_out_time',
      receivedId ? formData.check_out_time : formData.check_in_time
    ),
      fData.append(
        'break_time1',
        Number(formData.break_time1 ? formData.break_time1 : null),
      );
    fData.append(
      'total_office_time1',
      formData.total_office_time1 ? formData.total_office_time1 : null,
    );
    fData.append('place', formData.place ? formData.place : '');
    fData.append('branch', selectBranch.key ? selectBranch.key : selectBranch);

    console.log('fData', fData);

    try {
      setLoading(true);
      if (receivedId) {
        const response = await updateApi.updateBranchInfo(receivedId, fData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200 || response.status === 201) {
          navigation.navigate('BranchInfo');
          setLoading(false);
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'BranchInfo updated successfully',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      } else {
        const response = await createApi.createBranchInfo(fData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200 || response.status === 201) {
          navigation.navigate('BranchInfo');
          setLoading(false);

          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'BranchInfo created successfully',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong during branchInfo creation or update',
        visibilityTime: 4000,
        autoHide: true,
      });
      console.log(
        'Error during branch info creation or update',
        error.response,
      );
    }
  };

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await getApi.getAllBranch();

        if (res.data) {
          const transformBranchData = res.data.map(item => ({
            key: item.id.toString(),
            value: `${item.name}`,
          }));
          setBranchName(transformBranchData);
        }
      } catch (error) {
        console.log(`Error got during fetch branch in branch info`, error);
      }
    };
    fetchBranch();
  }, []);

  useEffect(() => {
    if (receivedId) {
      try {
        setIsLoading(true);
        const fetchBranchInfoById = async () => {
          const res = await getApi.getBranchInfoById(receivedId);

          if (res.data) {
            setFormData(prevData => ({
              ...prevData,

              check_in_time: res.data.check_in_time
                ? res.data.check_in_time.split(':').slice(0, 2).join(':')
                : null,
              check_out_time: res.data.check_out_time
                ? res.data.check_out_time.split(':').slice(0, 2).join(':')
                : null,
              break_time1: res.data.break_time1
                ? res.data.break_time1.toString()
                : null,
              total_office_time1: res.data.total_office_time1
                ? res.data.total_office_time1
                : null,
              city: res.data.place ? res.data?.place : null,
              place: res.data.place ? res.data?.place : null,
              latitude: res.data.latitude || null,
              longitude: res.data.longitude || null,
            }));

            const transformedCountryData = {
              key: res.data.branch.id,
              value: res.data.branch.name,
            };
            setSelectBranch(transformedCountryData);
            setIsLoading(false);
          }
        };
        fetchBranchInfoById(); // Moved this line outside of the try block
      } catch (error) {
        console.log('Get branch info by id error', error);
      }
    }
  }, [receivedId]);

  console.log('formdata==> ', formData);

  useEffect(() => {
    if (
      formData.check_in_time &&
      formData.check_out_time &&
      formData.break_time1
    ) {
      const checkInDateTime = new Date(
        `1970-01-01 ${formData.check_in_time}`,
      ).getTime();
      const checkOutDateTime = new Date(
        `1970-01-01 ${formData.check_out_time}`,
      ).getTime();

      // Calculate the time difference in milliseconds
      const timeDifferenceInMilliseconds = checkOutDateTime - checkInDateTime;

      const adjustedTimeDifference =
        timeDifferenceInMilliseconds - Number(formData.break_time1) * 60 * 1000;

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(adjustedTimeDifference / 3600000);
      const minutes = Math.floor((adjustedTimeDifference % 3600000) / 60000);

      // Calculate total office time as a number
      const totalOfficeTimeNumber = hours + minutes / 60;

      // Convert total office time to string
      const totalOfficeTimeString = totalOfficeTimeNumber.toFixed(2);

      setFormData(prev => ({
        ...prev,
        total_office_time1: totalOfficeTimeString,
      }));
    }
  }, [formData.check_in_time, formData.check_out_time, formData.break_time1]);

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Check In Time</Text>
              <TouchableOpacity
                onPress={() => setCheckinShow(true)}
                style={styles.textInput}>
                <Text>
                  {formData.check_in_time != null ? moment(formData.check_in_time, 'HH:mm').format('hh:mm A') : 'select checkin time'}
                </Text>
              </TouchableOpacity>

              {checkinShow && (
                <DateTimePicker
                  value={formData.check_in_time != null ? new Date(`1970-01-01 ${formData.check_in_time}`) : new Date()}
                  mode={'time'}
                  is24Hour={true}
                  onChange={onChangeCheckin}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Check Out Time</Text>
              <TouchableOpacity
                onPress={() => setCheckoutShow(true)}
                style={styles.textInput}>
                <Text>
                  {formData.check_out_time != null ? moment(formData.check_out_time, 'HH:mm').format('hh:mm A') : 'select checkout time'}
                </Text>
              </TouchableOpacity>

              {checkoutShow && (
                <DateTimePicker
                  value={formData.check_out_time != null ? new Date(`1970-01-01 ${formData.check_out_time}`) : new Date()}
                  mode={'time'}
                  is24Hour={true}
                  onChange={onChangeCheckout}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Break Time (Minute)</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={formData.break_time1}
                onChangeText={value => handleChange('break_time1', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Total office hour</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Total Office Time"
                editable={false}
                value={
                  formData.total_office_time1
                    ? formData.total_office_time1
                    : null
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>City</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleCityChange}
                value={formData.city}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Select Place</Text>

              <SelectList
                boxStyles={styles.textInput}
                dropdownStyles={styles.textInput}
                setSelected={val => handleChange('place', val)}
                data={placesList}
                save="value"
                placeholder={formData.place ? formData.place : 'Select Place'}
                notFoundText="Data not found"
                value={formData.place}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Branch</Text>

              <SelectList
                boxStyles={styles.textInput}
                dropdownStyles={styles.textInput}
                setSelected={val => setSelectBranch(val)}
                data={branchName}
                save="key"
                placeholder={
                  selectBranch ? selectBranch.value : 'Select Branch'
                }
                notFoundText="Data not found"
                value={selectBranch}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              {loading ? (
                <TouchableOpacity style={styles.primaryButton}>
                  <ButtonLoader />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddBranchInfo;
