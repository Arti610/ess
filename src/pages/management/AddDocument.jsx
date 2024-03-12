import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Button, TouchableOpacity} from 'react-native';
import {styles} from '../../../style';
import ButtonLoader from '../../utils/BtnActivityIndicator';
import {SelectList} from 'react-native-dropdown-select-list';
import getApi from '../../redux/slices/utils/getApi';

const AddDocument = ({route}) => {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [selectCountry, setSelectCountry] = useState(null);

  const initialValues = {document: '', user: ''};
  console.log('selectCountry==>', selectCountry);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await getApi.getStaffList(id);
        if (res.data) {
          const transformCountryData = res.data.map(item => ({
            key: item.id.toString(),
            value: `${item.first_name} ${item.last_name}`,
          }));

          setData(transformCountryData);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = values => {                        
    console.log('Submitted:', values);                                      
  };                       

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>User</Text>
            <SelectList
              boxStyles={styles.textInput}
              dropdownStyles={styles.textInput}
              setSelected={val => setSelectCountry(val)}
              data={data}
              save="key"
              placeholder={'Select User'}
              notFoundText="Data not found"
              value={selectCountry}
              onBlur={handleBlur('user')}
              onChangText={handleChange('user')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Document Name</Text>
            <TextInput
              placeholder="Document Name (e.g. National Id Card)"
              style={styles.textInput}
              onChangeText={handleChange('document')}
              onBlur={handleBlur('document')}
              value={values.document}
            />
          </View>
          <View>
            <Text style={styles.lable}>Select Document</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
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
