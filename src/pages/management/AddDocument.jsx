import {Formik, useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {primaryColor, styles} from '../../../style';
import ButtonLoader from '../../utils/BtnActivityIndicator';
import {SelectList} from 'react-native-dropdown-select-list';
import getApi from '../../redux/slices/utils/getApi';
import DocumentPicker from 'react-native-document-picker';
import createApi from '../../redux/slices/utils/createApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {currentUser} from '../../utils/currentUser';
import Loader from '../../utils/ActivityIndicator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {documentValidationSchema} from '../../utils/validationSchema';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddDocument = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [docType, setDocType] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [currentUserData, setcurrentUserData] = useState(null);
  const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
  const [showExpityDatePicker, setShowExpiryDatePicker] = useState(false);

  const [formValues, setFormValues] = useState({
    issue_date: null,
    expiry_date: null,
  });

  const initialValues = {
    document_name: null,
    document_type: null,
    user: null,
    branch: null,
    document: null,
  };

  const handleToShowIssueDatePicker = isFromDate => {
    if (isFromDate) {
      setShowIssueDatePicker(true);
    } else {
      setShowExpiryDatePicker(true);
    }
  };

  const handleDateChange = selectedDate => {
    setShowIssueDatePicker(false);
    setShowExpiryDatePicker(false);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setFormValues(values => ({
      ...values,
      [showIssueDatePicker ? 'issue_date' : 'expiry_date']: formattedDate,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await currentUser();
      if (res.data) {
        setcurrentUserData(res.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (currentUserData && currentUserData.user_type === 'Manager') {
          const res = await getApi.getManagerStaffList(currentUserData.id);

          if (res.data) {
            const transformUserData = res.data.map(item => ({
              key: item.id.toString(),
              value: `${item.first_name} ${item.last_name}`,
            }));

            setLoading(false);
            setData(transformUserData);
          }
        } else {
          const res = await getApi.getStaffList(id);
          if (res.data) {
            const transformUserData = res.data.map(item => ({
              key: item.id.toString(),
              value: `${item.first_name} ${item.last_name}`,
            }));
            setData(transformUserData);
            setLoading(false);
          }
        }

        const res = await getApi.getDocumentType(id);

        if (res.data) {
          const transformUserData = res.data.map(item => ({
            key: item.id.toString(),
            value: item.name,
          }));
          setDocType(transformUserData);
          setLoading(false);
        }
      } catch (error) {
        console.log('error fetching users for add documents', error);
      }
    };
    fetchUser();
  }, [currentUserData]);

  const handleDocumentPick = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      if (doc) {
        setSelectedDocument(doc);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document selection cancelled', error);
      } else {
        console.log('error', error);
      }
    }
  };

  const handleSubmit = async values => {
    setIsLoading(true);
    console.log('values', values);
    // try {
    //   const fData = new FormData();
    //   fData.append(
    //     'document_name',
    //     values.document_name ? values.document_name : null,
    //   );
    //   fData.append(
    //     'issue_date',
    //     formValues.issue_date ? values.issue_date : null,
    //   );
    //   fData.append(
    //     'expiry_date',
    //     formValues.expiry_date ? values.expiry_date : null,
    //   );

    //   fData.append('user', selectedUser ? selectedUser : null);
    //   fData.append('document_type', selectedDocType ? selectedDocType : null);
    //   fData.append(
    //     'branch',
    //     id
    //       ? id
    //       : currentUserData &&
    //           currentUserData.branch &&
    //           currentUserData.branch.id,
    //   );
    //   selectedDocument
    //     ? fData.append('document', selectedDocument ? selectedDocument : null)
    //     : null;

    //   const response = await createApi.createDocUpload(fData, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.status === 201 || response.status === 200) {
    //     navigation.navigate('Document', {
    //       id: id
    //         ? id
    //         : currentUserData &&
    //           currentUserData.branch &&
    //           currentUserData.branch.id,
    //     });
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Document uploded success',
    //       text2: 'your document uploded successfully',
    //       autoHide: true,
    //     });
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   navigation.navigate('Document', {
    //     id: id
    //       ? id
    //       : currentUserData &&
    //         currentUserData.branch &&
    //         currentUserData.branch.id,
    //   });
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Document uploded failed',
    //     text2: 'you are failed to upload document',
    //     autoHide: true,
    //   });
    //   setIsLoading(false);
    // }
  };

  return loading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={documentValidationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>User</Text>
            <SelectList
              boxStyles={styles.textInput}
              dropdownStyles={styles.textInput}
              setSelected={val => setSelectedUser(val)}
              data={data}
              save="key"
              placeholder={'Select User'}
              notFoundText="Data not found"
              value={selectedUser}
              onBlur={handleBlur('user')}
              onChangeText={handleChange('user')}
            />
          
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Document Type</Text>
            <SelectList
              boxStyles={styles.textInput}
              dropdownStyles={styles.textInput}
              setSelected={val => setSelectedDocType(val)}
              data={docType}
              save="key"
              placeholder={'Select Document Type'}
              notFoundText="Data not found"
              value={selectedDocType}
              onBlur={handleBlur('document_type')}
              onChangeText={handleChange('document_type')}
            />
         
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Issue Date</Text>
            <TouchableOpacity
              onPress={() => handleToShowIssueDatePicker(true)}
              style={styles.textInput}>
              <Text>{formValues.issue_date || 'Select Date'}</Text>
            </TouchableOpacity>
            {showIssueDatePicker && (
              <DateTimePicker
                value={
                  formValues.issue_date
                    ? new Date(formValues.issue_date)
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
            <Text style={styles.lable}>Expiry Date</Text>
            <TouchableOpacity
              onPress={() => handleToShowIssueDatePicker(false)}
              style={styles.textInput}>
              <Text>{formValues.expiry_date || 'Select Date'}</Text>
            </TouchableOpacity>
            {showExpityDatePicker && (
              <DateTimePicker
                value={
                  formValues.expiry_date
                    ? new Date(formValues.expiry_date)
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
            <Text style={styles.lable}>Document Name</Text>
            <TextInput
              placeholder="Document Name (e.g. National Id Card)"
              style={styles.textInput}
              onChangeText={handleChange('document_name')}
              onBlur={handleBlur('document_name')}
              value={values.document_name}
              required
            />
            {touched.document_name && errors.document_name ? (
              <Text style={styles.errorText}>{errors.document_name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Attachment</Text>
            <TouchableOpacity
              style={style.uploadUI}
              onPress={handleDocumentPick}>
              <Icon name="cloud-upload-alt" style={style.icon} />
              {selectedDocument && selectedDocument.name ? (
                <Text>{selectedDocument.name}</Text>
              ) : (
                <Text>Upload your files</Text>
              )}
            </TouchableOpacity>
           
          </View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddDocument;

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
});
