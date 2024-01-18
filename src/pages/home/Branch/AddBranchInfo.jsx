import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { styles } from "../../../../style";
import { Formik } from "formik";
import * as Yup from 'yup';
import DateTimePicker from "@react-native-community/datetimepicker";

const addBranchInfoValidationSchema = Yup.object({
  checkin: Yup.date().required('CheckIn Time is required'),
  checkout: Yup.date().required('CheckOut Time is required'),
  breakTime: Yup.number().typeError('BreakTime must be a number').min(0, 'BreakTime must be greater than or equal to 0'),
  totalOfficeHour: Yup.number().typeError('Total office hour must be a number').min(0, 'Total office hour must be greater than or equal to 0'),
  city: Yup.string().required('City is required'),
});

const AddBranchInfo = () => {
  const [checkinshow, setCheckinShow] = useState(false);
  const [checkoutshow, setCheckoutShow] = useState(false);
  const [checkinTime, setCheckinTime] = useState(new Date());
  const [checkoutTime, setCheckoutTime] = useState(new Date());

  const onChangeCheckin = (event, selectedDate) => {
    setCheckinShow(false);
    setCheckinTime(selectedDate || checkinTime);
  };

  const onChangeCheckout = (event, selectedDate) => {
    setCheckoutShow(false);
    setCheckoutTime(selectedDate || checkoutTime);
  };

  const handlePress = () => {
    // Handle form submission here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={{
            checkin: '',
            checkout: '',
            breakTime: '',
            totalOfficeHour: '',
            city: '',
          }}
          validationSchema={addBranchInfoValidationSchema}
          onSubmit={handlePress}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>CheckIn Time</Text>
                <TouchableOpacity onPress={() => setCheckinShow(true)} style={styles.textInput}>
                  <Text>{checkinTime ? checkinTime.toLocaleTimeString() : 'Select Time'}</Text>
                </TouchableOpacity>
                {/* {touched.checkin && errors.checkin && <Text style={styles.errorText}>{errors.checkin}</Text>} */}
                {checkinTime && errors.checkin && <Text style={styles.errorText}>{errors.checkin}</Text>}
                {checkinshow && (
                  <DateTimePicker
                    value={values.checkin || new Date()}
                    mode={"time"}
                    is24Hour={true}
                    onChange={onChangeCheckin}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>CheckOut Time</Text>
                <TouchableOpacity onPress={() => setCheckoutShow(true)} style={styles.textInput}>
                  <Text>{checkoutTime ? checkoutTime.toLocaleTimeString() : 'Select Time'}</Text>
                </TouchableOpacity>
                {/* {touched.checkin && errors.checkin && <Text style={styles.errorText}>{errors.checkin}</Text>} */}
                {checkoutTime && errors.checkin && <Text style={styles.errorText}>{errors.checkin}</Text>}
                {checkoutshow && (
                  <DateTimePicker
                    value={values.checkout || new Date()}
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
                  onChangeText={handleChange('breakTime')}
                  onBlur={handleBlur('breakTime')}
                  value={values.breakTime}
                />
                {touched.breakTime && errors.breakTime && <Text style={styles.errorText}>{errors.breakTime}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>Total office hour</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Read Only"
                  editable={false}
                  value={values.totalOfficeHour}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.lable}>City</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                {touched.city && errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
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
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddBranchInfo;
