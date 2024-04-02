import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {primaryColor, styles} from '../../../../../style';
import {currentUser} from '../../../../utils/currentUser';
import getApi from '../../../../redux/slices/utils/getApi';
import {SelectList} from 'react-native-dropdown-select-list';
import Loader from '../../../../utils/ActivityIndicator';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import createApi from '../../../../redux/slices/utils/createApi';
import ButtonLoader from '../../../../utils/BtnActivityIndicator';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const ApplyLR = () => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const [leaveType, setLeaveType] = useState([]);
  const [selectLeaveType, setSelectLeaveType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    from_date: null,
    to_date: null,
  });

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        const userData = await currentUser();
        if (userData) {
          setId(userData.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id && id.id) {
      const fetchData = async () => {
        try {
          
          const res = await getApi.getAllUserList(id.id);

          if (res.data) {
            setUserDetails(res.data);
            
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    // Fetch leave types
    const fetchLeaveType = async () => {
      try {
        setLoading(true);
        if (id && id.branch && id.branch.id) {
          const res = await getApi.getLeaveTypeList(id.branch.id);
          if (res.data) {
            const transformedData = res.data.map(item => ({
              key: item.id.toString(),
              value: item.name,
            }));
            setLeaveType(transformedData);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching leave type list:', error);
      }
    };
    fetchLeaveType();
  }, [id]);

  const showDateTimePicker = isFromDate => {
    // Show the DateTimePicker based on the type of date
    if (isFromDate) {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };

  const handleDateChange = selectedDate => {
    setShowFromDatePicker(false);
    setShowToDatePicker(false);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setFormValues(values => ({
      ...values,
      [showFromDatePicker ? 'from_date' : 'to_date']: formattedDate,
    }));
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (doc) {
        setDocument(doc);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document selection cancelled', error);
      } else {
        console.log(error);
      }
    }
  };


  const handlePress = async values => {
    const fData = new FormData();
    fData.append('title', values.title ? values.title : null);
    fData.append('leave_type', selectLeaveType ? selectLeaveType : null);
    fData.append(
      'from_date',
      formValues.from_date ? formValues.from_date : null,
    );
    fData.append('to_date', formValues.to_date ? formValues.to_date : null);
    fData.append('description', values.description ? values.description : null);
    document ? fData.append('attachment', document ? document : null) : null;

    try {
      setIsLoading(true);
      const res = await createApi.createLeaveRequest(fData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (res.status === 201 || res.status === 200) {
        setIsLoading(false);
        userDetails && id && id.user_type === 'Staff'
          ? navigation.navigate('Leave')
          : navigation.navigate('Leaves', {data : userDetails});
        
        Toast.show({
          type: 'success',
          text1: 'Leave request submitted successfully',
          text2: 'Your leave request has been successfully submitted.',
          autoHide: 4000,
        });
        getApi.getAllLeaveRequest();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(`Request for leave failed`, error.response.data);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <Formik
        initialValues={{
          leaveType: null,
          title: '',
          from_date: formValues.from_date,
          to_date: formValues.to_date,
          description: '',
          attachment: null,
        }}
        onSubmit={values => {
          handlePress(values);
        }}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Leave Type</Text>
              <SelectList
                boxStyles={styles.textInput}
                dropdownStyles={styles.textInput}
                setSelected={val => setSelectLeaveType(val)}
                data={leaveType}
                save="key"
                placeholder={'Select Weekoff e.g. (Saturday)'}
                notFoundText="Data not found"
                value={selectLeaveType}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Title</Text>
              <TextInput
                value={values.title || ''}
                style={styles.textInput}
                placeholder="e.g. (One Day Leave)"
                onChangeText={handleChange('title')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>From Date</Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker(true)}
                style={styles.textInput}>
                <Text>{formValues.from_date || 'Select Date'}</Text>
              </TouchableOpacity>
              {showFromDatePicker && (
                <DateTimePicker
                  value={
                    formValues.from_date
                      ? new Date(formValues.from_date)
                      : new Date()
                  }
                  mode="date"
                  onChange={(event, selectedDate) =>
                    handleDateChange(selectedDate)
                  }
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>To Date</Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker(false)}
                style={styles.textInput}>
                <Text>{formValues.to_date || 'Select Date'}</Text>
              </TouchableOpacity>
              {showToDatePicker && (
                <DateTimePicker
                  value={
                    formValues.to_date
                      ? new Date(formValues.to_date)
                      : new Date()
                  }
                  mode="date"
                  onChange={(event, selectedDate) =>
                    handleDateChange(selectedDate)
                  }
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Description</Text>
              <TextInput
                name="description"
                value={values.description || ''}
                style={[
                  styles.textInput,
                  {textAlignVertical: 'top', textAlign: 'left'},
                ]}
                placeholder="Enter description for leave"
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('description')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Attachment</Text>
              <TouchableOpacity style={style.uploadUI} onPress={selectDoc}>
                <Icon name="cloud-upload-alt" style={style.icon} />
                {document && document.name ? (
                  <Text>{document.name}</Text>
                ) : (
                  <Text>Upload your files</Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit}>
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <Text style={styles.buttonText}> Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ApplyLR;

const style = StyleSheet.create({
  uploadUI: {
    padding: 10,
    height: 'fit-content',
    borderWidth: 4,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
  },
  icon: {
    fontSize: 50,
    color: primaryColor,
  },
  documentView: {
    padding: 10,
    height: 'fit-content',
    borderWidth: 4,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
  },
});
