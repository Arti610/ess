import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { styles } from "../../../../style";
import DateTimePicker from "@react-native-community/datetimepicker";
import branchApi, { getAllBranch } from "../../../redux/slices/branch/branchApi";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../../../utils/ActivityIndicator";
import { useDispatch } from "react-redux";

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

  const [formData, setFormData] = useState({
    check_in_time: new Date(),
    check_out_time: new Date(),
    break_time1: null,
    total_office_time1: null,
    city: null,
    place: null,
    latitude: null,
    longitude: null,
    branch: null
  })

  const onChangeCheckin = (event, selectedDate) => {
    setCheckinShow(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      check_in_time: selectedDate ? selectedDate : prevFormData.check_in_time, 
    }));
  };

  const onChangeCheckout = (event, selectedDate) => {
    setCheckoutShow(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      check_out_time: selectedDate ? selectedDate : prevFormData.check_out_time,
    }));
  };

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCityChange = async (place) => {

    try {
      const res = await branchApi.get_places(place);

      if (res) {
        setPlacesList(
          res.data.map((item) => {
            return { label: item, value: item };
          }))
      }
    } catch (error) {
      console.log('Error during fetching API for places');
    }
  }

  const handleSubmit = async () => {
    const fData = new FormData();
    fData.append('check_in_time', receivedId ? formData.check_in_time : formData.check_in_time.toLocaleTimeString())
    fData.append('check_out_time', receivedId ? formData.check_out_time : formData.check_out_time.toLocaleTimeString())
    fData.append('break_time1', Number(formData.break_time1));
    fData.append('total_office_time1', formData.total_office_time1);
    fData.append('place', formData.place);
    fData.append('branch', formData.branch);
    console.log('fData', fData);
    try {
      if (receivedId) {
        // Updating existing entry
        const response = await branchApi.updateBranchInfo(receivedId, fData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200 || response.status === 201) {
          navigation.navigate('BranchInfo');
          branchApi.getAllBranchInfo()
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'BranchInfo updated successfully',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      } else {
        // Creating a new entry
        const response = await branchApi.createBranchInfo(fData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200 || response.status === 201) {
          navigation.navigate('BranchInfo');
          branchApi.getAllBranchInfo()
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
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong during branchInfo creation or update',
        visibilityTime: 4000,
        autoHide: true,
      });
      console.log('Error during branch info creation or update', error);
    }
  };

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await getAllBranch(dispatch);
       
        if (res.data) {
          setBranchName(res.data)
        }

      } catch (error) {
        console.log(`Error got during fetch branch in branch info`, error);
      }
    }
    fetchBranch()
  }, [])

  useEffect(() => {

    if (receivedId) {
      try {
        setIsLoading(true);
        const fetchBranchInfoById = async () => {
          
          const res = await branchApi.getBranchInfoById(receivedId);
    
          if (res.data) {
            setFormData((prevData) => ({
              ...prevData,
              check_in_time: res.data.check_in_time ? res.data.check_in_time : new Date(),
              check_out_time: res.data.check_out_time ? res.data.check_out_time : new Date(),
              break_time1: res.data.break_time1 ? res.data.break_time1.toString() : null,
              total_office_time1: res.data.total_office_time1 ? res.data.total_office_time1 : null,
              city: res.data.place ? res.data?.place : null,
              place: res.data.place ? res.data?.place : null,
              latitude: res.data.latitude || null,
              longitude: res.data.longitude || null,
              branch: res.data.branch.id ? res.data?.branch?.id : null,
            }));
            setIsLoading(false);
          }
        };
        fetchBranchInfoById(); // Moved this line outside of the try block
      } catch (error) {
        console.log('Get branch info by id error', error);
      }
    }
  }, [receivedId]);
  

  useEffect(() => {
    if (formData.check_in_time && formData.check_out_time && formData.break_time1) {
      const checkInDateTime = formData.check_in_time;
      const checkOutDateTime = formData.check_out_time;

      // Calculate the time difference in milliseconds
      const timeDifferenceInMilliseconds = checkOutDateTime - checkInDateTime;

      const adjustedTimeDifference = timeDifferenceInMilliseconds - Number(formData.break_time1) * 60 * 1000;


      // Convert milliseconds to hours and minutes
      const hours = Math.floor(adjustedTimeDifference / 3600000);
      console.log('hew',hours);
      const minutes = Math.floor((adjustedTimeDifference % 3600000) / 60000);
      console.log('hewhdgdfhghh',minutes);

      setFormData((prev) => {
        return {
          ...prev,
          total_office_time1: hours + "." + minutes,
        };
      });
    }
  }, [formData.check_in_time && formData.check_out_time && formData.break_time1]);

  return (
    isLoading ? <Loader /> :
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.textHeading}>{receivedId ? 'Update BranchIfo' : 'Create BranchInfo'}</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Check In Time</Text>
                <TouchableOpacity onPress={() => setCheckinShow(true)} style={styles.textInput}>
                  <Text>{receivedId ? formData.check_in_time.toString() : formData.check_in_time.toLocaleTimeString()}</Text>
                </TouchableOpacity>

                {checkinShow && (
                  <DateTimePicker
                    value={formData.check_in_time || new Date()}
                    mode={"time"}
                    is24Hour={true}
                    onChange={onChangeCheckin}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Check Out Time</Text>
                <TouchableOpacity onPress={() => setCheckoutShow(true)} style={styles.textInput}>
                  <Text>{receivedId ? formData.check_out_time.toString() : formData.check_out_time.toLocaleTimeString()}</Text>
                </TouchableOpacity>

                {checkoutShow && (
                  <DateTimePicker
                    value={formData.check_out_time || new Date()}
                    mode={"time"}
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
                  onChangeText={(value) => handleChange('break_time1', value)}
                />

              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Total office hour</Text>
              
                <TextInput
                  style={styles.textInput}
                  placeholder="Total Office Time"
                  editable={false}
                  value={formData.total_office_time1 ? formData.total_office_time1 : null}
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

                <Picker
                  style={styles.textInput}
                  selectedValue={formData.place}
                  onValueChange={(itemValue) =>
                    setFormData((prevData) => ({ ...prevData, place: itemValue }))
                  }
                >
                  {placesList.map((item, i) => (
                    <Picker.Item
                      label={receivedId ? formData.place : item.label}
                      value={item.value}
                      key={i}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Branch</Text>
                
                  <Picker
                      style={styles.textInput}
                      selectedValue={formData.branch}
                      onValueChange={(itemValue) =>
                        setFormData((prevData) => ({ ...prevData, branch: itemValue }))
                      }
                  >        
                    {branchName && branchName.map((item, i) => (
                      <Picker.Item label={ item.name} value={ item.id} key={i} />
                    ))}
                    </Picker>
                </View>

            </View>
            <View style={styles.footer}>
              <View style={styles.inputContainer}>
              {isLoading ? (
                    <TouchableOpacity style={styles.primaryButton}>
                      <ButtonLoader />
                    </TouchableOpacity>
                ) : (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>)}
              </View>
            </View>
          </View>


        </View>
      </ScrollView>
  );
};

export default AddBranchInfo;
