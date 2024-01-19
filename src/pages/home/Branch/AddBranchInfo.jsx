import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { styles } from "../../../../style";
import DateTimePicker from "@react-native-community/datetimepicker";
import branchApi, { getAllBranch } from "../../../redux/slices/branch/branchApi";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";

const AddBranchInfo = () => {
  const dispatch = useDispatch()
  const [checkinShow, setCheckinShow] = useState(false);
  const [checkoutShow, setCheckoutShow] = useState(false);
  const [placesList, setPlacesList] = useState([])
  const [branchName, setBranchName]  = useState([])
 
 
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

  console.log('formData',formData);

  const onChangeCheckin = (event, selectedDate) => {
    
    setCheckinShow(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      check_in_time: selectedDate ? selectedDate : prevFormData.check_in,
    }));
  };
  
  const onChangeCheckout = (event, selectedDate) => {
  
    setCheckoutShow(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      check_out_time: selectedDate ? selectedDate : prevFormData.check_out,
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
    
      if(res){
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
    fData.append('check_in_time', formData.check_in_time.toLocaleTimeString())
    fData.append('check_out_time', formData.check_out_time.toLocaleTimeString())
    fData.append('break_time1', formData.break_time1)
    fData.append('total_office_time1',formData.total_office_time1)
    fData.append('place',formData.place)
    fData.append('branch',formData.branch)
    console.log('cliked');
    try {
     
     const response = await branchApi.createBranchInfo(fData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
     console.log("response-----------------",response)
     
    } catch (error) {
      console.log('Error during branch info creation', error);
    }
  };
  
  useEffect(()=>{
    const fetchBranch = async()=>{
      try {
          const res = await getAllBranch(dispatch)
          if(res.data){
            setBranchName(res.data)
          }
        
      } catch (error) {
         console.log(`Error got during fetch branch in branch info`,error);
      }
    }
    fetchBranch()
  },[])

  useEffect(() => {
    if (formData.check_in_time && formData.check_out_time && formData.break_time1 ) {
      const checkInDateTime = formData.check_in_time;
      const checkOutDateTime = formData.check_out_time;
      console.log('checkInDateTime',checkInDateTime);
      console.log('checkOutDateTime',checkOutDateTime);
      // Calculate the time difference in milliseconds
      const timeDifferenceInMilliseconds = checkOutDateTime - checkInDateTime;
      console.log('timeDifferenceInMilliseconds',timeDifferenceInMilliseconds);
    
      const adjustedTimeDifference = timeDifferenceInMilliseconds - Number(formData.break_time1) * 60 *1000;
      console.log('adjustedTimeDifference',adjustedTimeDifference);

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(adjustedTimeDifference / 3600000);
      const minutes = Math.floor((adjustedTimeDifference % 3600000) / 60000);

      setFormData((prev) => {
        return {
          ...prev,
          total_office_time1: parseFloat(hours + "." + minutes).toFixed(2),
        };
      });
    }
  }, [formData.check_in_time && formData.check_out_time && formData.break_time1 ]);

  return (
    <ScrollView>
      <View style={styles.container}>
    
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>CheckIn Time</Text>
                <TouchableOpacity onPress={() => setCheckinShow(true)} style={styles.textInput}>
                  <Text>{formData.check_in_time ? formData.check_in_time.toLocaleTimeString() : 'Select Time'}</Text>
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
                <Text style={styles.lable}>CheckOut Time</Text>
                <TouchableOpacity onPress={() => setCheckoutShow(true)} style={styles.textInput}>
                  <Text>{formData.check_out_time ? formData.check_out_time.toLocaleTimeString() : 'Select Time'}</Text>
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
                <Text style={styles.lable}>BreakTime in Minute</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 30"
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
                  value={formData.total_office_time1}
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
                  <Text style={styles.lable}>Selcet Place</Text>
                  <Picker
                    style={styles.textInput}
                    selectedValue={formData.place}
                    onValueChange={(itemValue) => setFormData((prevData) => ({ ...prevData, place: itemValue }))}
                  >
                    {placesList.map((item, i) => (
                      <Picker.Item label={item.label} value={item.value} key={i} />
                    ))}
                  </Picker>             
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Branch</Text>
                  <Picker
                    style={styles.textInput}
                    selectedValue={formData.branch}
                    onValueChange={(itemValue) => setFormData((prevData) => ({ ...prevData, branch: itemValue }))}
                  >
                    {branchName.map((item, i) => (
                      <Picker.Item label={item.name} value={item.id} key={i} />
                    ))}
                  </Picker>             
                </View>
             
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          
      </View>
    </ScrollView>
  );
};

export default AddBranchInfo;
