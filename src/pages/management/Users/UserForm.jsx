import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../style";
import { Formik } from "formik";
import { addUserSchema } from "../../../utils/validationSchema";
import { SelectList } from 'react-native-dropdown-select-list'
import getApi from "../../../redux/slices/utils/getApi";
import { useRoute } from "@react-navigation/native";
import createApi from "../../../redux/slices/utils/createApi";

const UserForm = () => {
    const route = useRoute()
    const { id } = route.params;

    const GenderData = [{ id: 'Male', value: 'Male' }, { id: 'Female', value: 'Female' }];
    const UsertypeData = [{ id: 'Staff', value: 'Staff' }, { id: 'Manager', value: 'Manager' }];

    const [managerStaffData, setManagertaffData] = useState([])
    const [isManagerFieldDisabled, setIsManagerFieldDisabled] = useState(false);
    const [departmentData, setDepartmentData] = useState([])
    const [designationData, setDesignationData] = useState([])
    const [weekoffData, setWeekoffData] = useState([])
  
    const handleUserTypeChange = (value) => {
        setSelectedUsertype(value);
        if (value === "Staff") {
            setIsManagerFieldDisabled(true)
        } else {
            setIsManagerFieldDisabled(false)
        }
        setSelectManager("");
    }

    const initialState = {
        profile_image: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        gender: null,
        manager: null,
        department: null,
        designation: null,
        user_type: null,
        week_off: null,
        address: null,
        password: null,
        confirm_password: null,
    }

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedUsertype, setSelectedUsertype] = useState(null);
    const [selectManager, setSelectManager] = useState(null);
    const [selectDepartment, setSelectDepartment] = useState(null);
    const [selectDesignation, setSelectDesignation] = useState(null);
    const [selectWeekoff, setSelectWeekoff] = useState(null);
console.log('selectedGender',selectedGender);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getManagerStaff = await getApi.getManagerStaff(1)
                if (getManagerStaff.data) {   
                    const transformManagerData = getManagerStaff.data.map(item => ({
                        key : item.id.toString(),
                        value :`${item.first_name} ${item.last_name}`
                    }))
                    setManagertaffData(transformManagerData)
                }
                const getBranchDepartment = await getApi.getBranchDepartment(1)
                if (getBranchDepartment.data) {
                    const transformDepartmentData = getBranchDepartment.data.map(item => ({
                        key: item.id.toString(),
                        value: item.name,
                    }));
                    setDepartmentData(transformDepartmentData)
                }
                const getDesignation = await getApi.getBranchDesignation(1)
                if (getDesignation.data) {
                    
                    const transformDesignationData = getDesignation.data.map(item => ({
                        key: item.id.toString(),
                        value: item.name
                    }))
                    setDesignationData(transformDesignationData)
                }
                const getWeekoff = await getApi.getWeekOff(1)
                if(getWeekoff.data){
                 
                    const transformWeeloffData = getWeekoff.data.map(item=>({
                        key : item.week_off_id.toString(),
                        value : item.name
                    }))
                    setWeekoffData(transformWeeloffData)
                }
            } catch (error) {
                console.log('Error got during get apis', error);
            }
        }
        fetchData()
    }, [])

    const handlePress = async (values) => {
        const fData = new FormData()
        fData.append('first_name', values.first_name)
        fData.append('last_name', values.last_name)
        fData.append('email', values.email)
        fData.append('phone_number', values.phone_number)
        fData.append('address', values.address)
        fData.append('password', values.password)
        fData.append('confirm_password', values.confirm_password)
        fData.append('gender', selectedGender)
        fData.append('manager', selectManager)
        fData.append('department', selectDepartment)
        fData.append('designation', selectDesignation)
        fData.append('user_type', selectedUsertype)
        fData.append('week_off', selectWeekoff)

        console.log('fData', fData);
     
       try {
        const res = await createApi.createUser(fData)
        console.log('res', res);
       } catch (error) {
        console.log(error);
       }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Formik
                    initialValues={initialState}
                    validationSchema={addUserSchema}
                    onSubmit={handlePress}
                >
                    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>First Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="First name e.g. (John)"
                                    onBlur={handleBlur('first_name')}
                                    onChangTextText={handleChange('first_name')}
                                    value={values.first_name}
                                />
                                {touched.first_name && errors.first_name ? <Text style={styles.errorText}>{errors.first_name}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Last Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Last name e.g. (Deo)"
                                    onBlur={handleBlur('last_name')}
                                    onChangTextText={handleChange('last_name')}
                                    value={values.last_name}
                                />
                                {touched.last_name && errors.last_name ? <Text style={styles.errorText}>{errors.last_name}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email e.g. (example@google.com)"
                                    onBlur={handleBlur('email')}
                                    onChangTextText={handleChange('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Phone Number</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Phone Number e.g. (9876543210)"
                                    onBlur={handleBlur('phone_number')}
                                    onChangTextText={handleChange('phone_number')}
                                    value={values.phone_number}
                                />
                                {touched.phone_number && errors.phone_number ? <Text style={styles.errorText}>{errors.phone_number}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Gender</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectedGender(val)}
                                    data={GenderData}
                                    save="value"
                                    placeholder="Select Gender e.g. (Female)"
                                    notFoundText="Data not found"
                                    value = {selectedGender}
                                />
                                 {selectedGender === null && touched.gender && errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>User Type</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => handleUserTypeChange(val)}
                                    data={UsertypeData}
                                    save="value"
                                    placeholder="Select User Type e.g. (Staff)"
                                    notFoundText="Data not found"
                                    value={selectedUsertype}
                                    onBlur={handleBlur('user_type')}
                                    onChangText={handleChange('user_type')}
                                />
                                 {selectedUsertype === null && touched.user_type && errors.user_type ? <Text style={styles.errorText}>{errors.user_type}</Text> : null}
                            </View>
                            {isManagerFieldDisabled ?
                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>Manager</Text>
                                    <SelectList
                                        boxStyles={styles.textInput}
                                        dropdownStyles={styles.textInput}
                                        setSelected={(val) => setSelectManager(val)}
                                        data={managerStaffData}
                                        save="key"
                                        placeholder="Select Manager e.g. (John Doe)"
                                        notFoundText="Data not found"
                                        disabled={isManagerFieldDisabled}
                                        value={selectManager}
                                        onBlur={handleBlur('manager')}
                                        onChangText={handleChange('manager')}
                                    />
                                    {selectManager === null && touched.manager && errors.manager ? <Text style={styles.errorText}>{errors.manager}</Text> : null}
                                </View> : null}
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Department</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectDepartment(val)}
                                    data={departmentData}
                                    save="key"
                                    placeholder="Select Department e.g. (IT)"
                                    notFoundText="Data not found"
                                    value={selectDepartment}
                                    onBlur={handleBlur('department')}
                                    onChangText={handleChange('department')}
                                />
                                {selectDepartment === null && touched.department && errors.department ? <Text style={styles.errorText}>{errors.department}</Text> : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Designation</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectDesignation(val)}
                                    data={designationData}
                                    save="key"
                                    placeholder="Select Designation e.g. (Developer)"
                                    notFoundText="Data not found"
                                    value = {selectDesignation}
                                    onBlur={handleBlur('designation')}
                                    onChangText={handleChange('designation')}
                                />
                                {selectDesignation === null && touched.designation && errors.designation ? <Text style={styles.errorText}>{errors.designation}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Week Off</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectWeekoff(val)}
                                    data={weekoffData}
                                    save="key"
                                    placeholder="Select Weekoff e.g. (Saturday)"
                                    notFoundText="Data not found"
                                    value={selectWeekoff}
                                    onBlur={handleBlur('week_off')}
                                    onChangText={handleChange('week_off')}
                                />
                                {selectWeekoff === null && touched.week_off && errors.week_off ? <Text style={styles.errorText}>{errors.week_off}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="••••••••"
                                    onBlur={handleBlur('password')}
                                    onChangTextText={handleChange('password')}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Confirm Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="••••••••"
                                    onBlur={handleBlur('confirm_password')}
                                    onChangTextText={handleChange('confirm_password')}
                                    value={values.confirm_password}
                                />
                                {touched.confirm_password && errors.confirm_password ? <Text style={styles.errorText}>{errors.confirm_password}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Address</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={3}                          
                                    style={styles.textInput}
                                    placeholder="Address e.g. (Street Road 05)"
                                    onBlur={handleBlur('address')}
                                    onChangTextText={handleChange('address')}
                                    value={values.address}
                                />
                                {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                            </View>
                            <View>
                                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

export default UserForm