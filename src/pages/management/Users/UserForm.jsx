import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../style";
import { Formik } from "formik";
import { addUserSchema } from "../../../utils/validationSchema";
import { SelectList } from 'react-native-dropdown-select-list'
import getApi from "../../../redux/slices/utils/getApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import createApi from "../../../redux/slices/utils/createApi";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import API_CONFIG from "../../../config/apiConfig";
import Loader from "../../../utils/ActivityIndicator";
import ButtonLoader from "../../../utils/BtnActivityIndicator";
import updateApi from "../../../redux/slices/utils/updateApi";

const UserForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, userId } = route.params;
 

    const refRBSheet = useRef();

    const GenderData = [{ id: 'Male', value: 'Male' }, { id: 'Female', value: 'Female' }];
    const UsertypeData = [{ id: 'Staff', value: 'Staff' }, { id: 'Manager', value: 'Manager' }];

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [image, setImage] = useState(null)
    const [managerStaffData, setManagertaffData] = useState([])
    const [departmentData, setDepartmentData] = useState([])
    const [designationData, setDesignationData] = useState([])
    const [weekoffData, setWeekoffData] = useState([])
    const [imgError, setImgError] = useState(null)


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

    useEffect(() => {
        const fetchData = async () => {
            try {

                const getManagerStaff = await getApi.getManagerStaff(id)
                if (getManagerStaff.data) {
                    const transformManagerData = getManagerStaff.data.map(item => ({
                        key: item.id.toString(),
                        value: `${item.first_name} ${item.last_name}`
                    }))

                    setManagertaffData(transformManagerData)
                }
                const getBranchDepartment = await getApi.getBranchDepartment(id)
                if (getBranchDepartment.data) {
                    const transformDepartmentData = getBranchDepartment.data.map(item => ({
                        key: item.id.toString(),
                        value: item.name,
                    }));
                    setDepartmentData(transformDepartmentData)
                }
                const getDesignation = await getApi.getBranchDesignation(id)
                if (getDesignation.data) {

                    const transformDesignationData = getDesignation.data.map(item => ({
                        key: item.id.toString(),
                        value: item.name
                    }))
                    setDesignationData(transformDesignationData)
                }
                const getWeekoff = await getApi.getWeekOff(id)
                if (getWeekoff.data) {

                    const transformWeeloffData = getWeekoff.data.map(item => ({
                        key: item.week_off_id.toString(),
                        value: item.name
                    }))
                    setWeekoffData(transformWeeloffData)
                }
            } catch (error) {
                console.log('Error got during get apis', error);
            }
        }
        fetchData();
    }, [])

    const handleImagePickerResponse = (response) => {
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

    const handleChooseImage = async (source) => {
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
    }

    const handlePress = async (values) => {
        { console.log('values', values) }
        const fData = new FormData();
        
        if (image === null) {
            setImgError('Image is required');
        } else {
            fData.append('profile_image', {
                name: image.assets[0]?.fileName || '',
                type: image.assets[0]?.type || '',
                uri: image.assets[0]?.uri || '',
            });
            setImgError('');
        }

        fData.append('branch', id)
        fData.append('first_name', values.first_name)
        fData.append('last_name', values.last_name)
        fData.append('email', values.email)
        fData.append('phone_number', values.phone_number)
        fData.append('address', values.address)
        fData.append('password', values.password)
        fData.append('confirm_password', values.confirm_password)
        fData.append('gender', selectedGender)
        if (selectedUsertype === "Staff") { fData.append('manager', selectManager) }
        fData.append('department', selectDepartment)
        fData.append('designation', selectDesignation)
        fData.append('user_type', selectedUsertype)
        fData.append('week_off', selectWeekoff)


        try {
            setIsLoading(true)
            const res = await createApi.createUser(fData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.status === 200 || res.status === 201) {
                setIsLoading(false)
                navigation.navigate('Users')
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'User created successfully',
                    text2: 'User has been created successfully',
                    visibilityTime: 4000,
                    autoHide: true
                });
                getApi.getAllUserList(id)
                getApi.getAllUserList(id)
            }
        } catch (error) {
           
            setIsLoading(false)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'User not created',
                text2: 'Error got during user creation, try again',
                visibilityTime: 4000,
                autoHide: true
            });
        }


    }

    // Get Individual User Details @start
    // useEffect(() => {

    //     const fetchData = async () => {
    //         if (userId) { // Check if userId is defined
    //             try {

    //                 setLoading(true);
    //                 const res = await getApi.getIndividualUser(userId);

    //                 // Inside the useEffect fetching user details
    //                 if (res.data) {
    //                     setData(res.data);
    //                     setSelectedGender(res.data.gender ? res.data.gender : null);
    //                     setSelectedUsertype(res.data.user_type ? res.data.user_type : null);
    //                     setSelectManager(res.data.manager ? `${res.data.manager.first_name} ${res.data.manager.last_name}` : null);
    //                     setSelectDepartment(res.data.department ? res.data.department.name : null);
    //                     setSelectDesignation(res.data.designation ? res.data.designation.name : null);
    //                     setSelectWeekoff(res.data.week_off ? res.data.week_off.name : null);
    //                     setLoading(false);
    //                 }
    //             } catch (error) {
    //                 console.log('Error got during fetch individual data details for filling up the form fields', error);
    //             }
    //         } else {
    //             console.log('Error got during fetch individual data details for filling up the form fields');
    //         }
    //     }
    //     fetchData();

    // }, [userId]);

    // Get Individual User Details @end

    return (
        loading ? <Loader /> : <ScrollView>
            <View style={styles.container}>
                <Formik
                    initialValues={initialState}
                    validationSchema={addUserSchema}
                    onSubmit={handlePress}
                >
                    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (

                        <View style={styles.formContainer}>
                            <View style={styles.profileContainer} >

                                <Image
                                    source={image !== null ? { uri: image.assets[0].uri ? image.assets[0].uri : null } : require('../../../assests/userProfile.webp')}
                                    style={styles.updateProfile}
                                />

                                <TouchableOpacity onPress={() => refRBSheet.current.open()} ><Icon name='camera' style={styles.updateProfileBtn} /></TouchableOpacity>
                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    closeOnPressMask={false}
                                    customStyles={{
                                        wrapper: {
                                            backgroundColor: "transparent",
                                        },
                                        container: {
                                            height: 150
                                        },
                                        draggableIcon: {
                                            backgroundColor: "#000",
                                        }
                                    }}
                                >
                                    <View style={styles.launchImageOption}>
                                        <TouchableOpacity onPress={() => handleChooseImage('camera')} style={styles.touchableOpacity}><Icon name='camera' style={styles.icon} /><Text style={styles.lable}>Use Camera</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleChooseImage('gallary')} style={styles.touchableOpacity}><IconF5 name='images' style={styles.icon} /><Text style={styles.lable}>Upload from Gallary</Text></TouchableOpacity>
                                    </View>
                                </RBSheet>
                                {imgError ? <Text style={styles.errorText}>{imgError}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>First Name </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="First name e.g. (John)"
                                    onBlur={handleBlur('first_name')}
                                    onChangeText={handleChange('first_name')}
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
                                    onChangeText={handleChange('last_name')}
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
                                    onChangeText={handleChange('email')}
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
                                    onChangeText={handleChange('phone_number')}
                                    value={values.phone_number}
                                    keyboardType="numeric"
                                />
                                {touched.phone_number && errors.phone_number ? <Text style={styles.errorText}>{errors.phone_number}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>Gender </Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectedGender(val)}
                                    data={GenderData}
                                    save="value"
                                    placeholder={'Select Gender e.g. (Female)'}
                                    notFoundText="Data not found"
                                    value={selectedGender && selectedGender}
                                />
                                {selectedGender === null && touched.gender && errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>User Type</Text>
                                <SelectList
                                    boxStyles={styles.textInput}
                                    dropdownStyles={styles.textInput}
                                    setSelected={(val) => setSelectedUsertype(val)}
                                    data={UsertypeData}
                                    save="value"
                                    placeholder={'Select User Type e.g. (Staff)'}
                                    notFoundText="Data not found"
                                    value={selectedUsertype}
                                    onBlur={handleBlur('user_type')}
                                    onChangText={handleChange('user_type')}
                                />
                                {selectedUsertype === null && touched.user_type && errors.user_type ? <Text style={styles.errorText}>{errors.user_type}</Text> : null}
                            </View>
                            {selectedUsertype === "Staff" ?
                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>Manager</Text>
                                    <SelectList
                                        boxStyles={styles.textInput}
                                        dropdownStyles={styles.textInput}
                                        setSelected={(val) => setSelectManager(val)}
                                        data={managerStaffData}
                                        save="key"
                                        placeholder={'Select Manager e.g. (John Doe)'}
                                        notFoundText="Data not found"
                                        // disabled={isManagerFieldDisabled}
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
                                    placeholder={'Select Department e.g. (IT)'}
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
                                    placeholder={'Select Designation e.g. (Developer)'}
                                    notFoundText="Data not found"
                                    value={selectDesignation}
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
                                    placeholder={'Select Weekoff e.g. (Saturday)'}
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
                                    onChangeText={handleChange('password')}
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
                                    onChangeText={handleChange('confirm_password')}
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
                                    onChangeText={handleChange('address')}
                                    value={values.address}
                                />
                                {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                            </View>
                            <View>
                                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                    {isLoading ? <ButtonLoader /> : <Text style={styles.buttonText}>Submit</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View >
            <Toast />
        </ScrollView >
    )
}

export default UserForm