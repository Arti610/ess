import {Formik, useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import {styles} from '../../../style';
import ButtonLoader from '../../utils/BtnActivityIndicator';
import {SelectList} from 'react-native-dropdown-select-list';
import getApi from '../../redux/slices/utils/getApi';
import DocumentPicker from 'react-native-document-picker';
import createApi from '../../redux/slices/utils/createApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {currentUser} from '../../utils/currentUser';
import Loader from '../../utils/ActivityIndicator';

const AddDocument = ({route}) => {
  
  const navigation = useNavigation();
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentUserData, setcurrentUserData] = useState(null);

  const initialValues = {
    document_name: null,
    user: null,
    branch: null,
    document: null,
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
        setLoading(true)
        if (currentUserData && currentUserData.user_type === 'Manager') {
          const res = await getApi.getManagerStaffList(
            currentUserData && currentUserData.id,
          );
    
          if (res.data) {
            const transformUserData = res.data.map(item => ({
              key: item.id.toString(),
              value: `${item.first_name} ${item.last_name}`,
            }));
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
          }
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchUser();
  }, []);

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
        console.log(error);
      }
    }
  };

  const handleSubmit = async values => {
    setIsLoading(true);

    try {
      const fData = new FormData();
      fData.append(
        'document_name',
        values.document_name ? values.document_name : null,
      );
      fData.append('user', selectedUser ? selectedUser : null);
      fData.append('branch', id ? id : (currentUserData && currentUserData.branch && currentUserData.branch.id ));
      selectedDocument
        ? fData.append('document', selectedDocument ? selectedDocument : null)
        : null;

      const response = await createApi.createDocUpload(fData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        navigation.navigate('Document', {id: id ? id : (currentUserData && currentUserData.branch && currentUserData.branch.id )});
        Toast.show({
          type: 'success',
          text1: 'Document uploded success',
          text2: 'your document uploded successfully',
          autoHide: true,
        });
        setIsLoading(false);
      }
    } catch (error) {
    
      navigation.navigate('Document', {id: id ? id : (currentUserData && currentUserData.branch && currentUserData.branch.id )});
      Toast.show({
        type: 'error',
        text1: 'Document uploded failed',
        text2: 'you are failed to upload document',
        autoHide: true,
      });
      setIsLoading(false);
    }
  };

  return (
    loading ? <Loader/> :  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
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
            <Text style={styles.lable}>Document Name</Text>
            <TextInput
              placeholder="Document Name (e.g. National Id Card)"
              style={styles.textInput}
              onChangeText={handleChange('document_name')}
              onBlur={handleBlur('document_name')}
              value={values.document_name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Select Document</Text>
            <TouchableOpacity
              style={styles.textInput}
              onPress={handleDocumentPick}>
              <Text>
                {selectedDocument ? selectedDocument.name : 'Select Document'}
              </Text>
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
