import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../../../utils/ActivityIndicator";
import updateApi from "../../../redux/slices/utils/updateApi";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import getApi from "../../../redux/slices/utils/getApi";
import { styles } from "../../../../style";
import { SelectList } from 'react-native-dropdown-select-list'
import API_CONFIG from "../../../config/apiConfig";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ButtonLoader from "../../../utils/BtnActivityIndicator";
import moment from "moment";

const EditUserForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, userId } = route.params;
    const refRBSheet = useRef();

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const GenderData = [{ id: 'Male', value: 'Male' }, { id: 'Female', value: 'Female' }];
    const UsertypeData = [{ id: 'Staff', value: 'Staff' }, { id: 'Manager', value: 'Manager' }];

    const [formdata, setFormdata] = useState({
        profile_image: null,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        gender: "",
        manager: "",
        department: "",
        designation: "",
        user_type: "",
        week_off: "",
        address: "",
    });

    const [image, setImage] = useState(null)
    const [managerStaffData, setManagertaffData] = useState([])
    const [departmentData, setDepartmentData] = useState([])
    const [designationData, setDesignationData] = useState([])
    const [weekoffData, setWeekoffData] = useState([])
    const [shiftTimeData, setShiftTimeData] = useState([])

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedUsertype, setSelectedUsertype] = useState(null);
    const [selectManager, setSelectManager] = useState(null);
    const [selectDepartment, setSelectDepartment] = useState(null);
    const [selectDesignation, setSelectDesignation] = useState(null);
    const [selectWeekoff, setSelectWeekoff] = useState(null);
    const [selectShiftTime, setSelectShiftTime] = useState(null);
    const [branchInfo, setBranchInfo] = useState(null)

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
                const getBranchInfo = await getApi.getBranchsBranchInfo(id)
          
                if(getBranchInfo.data){
                    setLoading(false)
                    setBranchInfo(getBranchInfo.data[0])

                    const checkInTime = moment(getBranchInfo.data[0].check_in_time, 'HH:mm').format('hh:mm A');
                    const checkOutTime = moment(getBranchInfo.data[0].check_out_time, 'HH:mm').format('hh:mm A');
                    
                    const shiftTimeData = `${checkInTime} to ${checkOutTime}`;

                    const shiftTimeDatakey = [
                        { key: shiftTimeData, value: shiftTimeData },
                     
                    ];
                      setShiftTimeData(shiftTimeDatakey);
                }
            } catch (error) {
                console.log('Error got during get apis', error);
            }
        }
        fetchData();
    }, [])

    const handlePress = async () => {
        try {
            setIsLoading(true);
            const fData = new FormData();
            if (image === null) {
               
            } else {
                fData.append('profile_image', {
                    name: image.assets[0]?.fileName || '',
                    type: image.assets[0]?.type || '',
                    uri: image.assets[0]?.uri || '',
                });
                
            }
           
            fData.append('first_name', formdata.first_name)
            fData.append('last_name', formdata.last_name)
            fData.append('email', formdata.email)
            fData.append('phone_number', formdata.phone_number)
            fData.append('address', formdata.address)
            fData.append('gender', selectedGender)
            fData.append('user_type', selectedUsertype)
            if (selectedUsertype === "Staff") { fData.append('manager', selectManager) }
            fData.append('department', selectDepartment)
            fData.append('designation', selectDesignation)
            fData.append('week_off', selectWeekoff)
            if(selectShiftTime != null) { fData.append('branch_info', branchInfo.id) }
    
        
            const res = await updateApi.updateUser(userId, fData, {
                headers: {
                    'content-type': "multipart/form-data"
                }
            });
           
            if (res.status === 200 || res.status === 201) {
                setIsLoading(false);

                navigation.navigate('Users');
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'User updated successfully',
                    text2: 'User has been updated successfully',
                    visibilityTime: 4000,
                    autoHide: true,
                });
                getApi.getAllUserList(id)
                getApi.getAllUserList(id)
            }
        } catch (error) {
            console.log('error', error.response.data);
            setIsLoading(false);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'User not updated',
                text2: 'Error got during user creation, try again',
                visibilityTime: 4000,
                autoHide: true,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getApi.getIndividualUser(userId);
  
                if (res.data) {
                    setFormdata({
                        ...formdata,
                        profile_image: res.data.user_data.profile_image ? res.data.user_data.profile_image : null,
                        first_name: res.data.user_data.first_name ? res.data.user_data.first_name : null,
                        last_name: res.data.user_data.last_name ? res.data.user_data.last_name : null,
                        email: res.data.user_data.email ? res.data.user_data.email : null,
                        phone_number: res.data.user_data.phone_number ? res.data.user_data.phone_number : null,
                        gender: res.data.user_data.gender ? res.data.user_data.gender : null,
                        manager: res.data.user_data.manager ? `${res.data.user_data.manager.first_name} ${res.data.user_data.manager.last_name}` : null,
                        department: res.data.user_data.department ? res.data.user_data.department.name : null,
                        designation: res.data.user_data.designation ? res.data.user_data.designation.name : null,
                        user_type: res.data.user_data.user_type ? res.data.user_data.user_type : null,
                        week_off: res.data.user_data.week_off ? res.data.user_data.week_off.name : null,
                        address: res.data.user_data.address ?  res.data.user_data.address : null,
                    });
                    setSelectedGender(res.data.user_data.gender ? res.data.user_data.gender : null)
                    setSelectedUsertype(res.data.user_data.user_type ? res.data.user_data.user_type : null)
                    setSelectManager(res.data.user_data.manager ? res.data.user_data.manager.id : null)
                    setSelectDepartment(res.data.user_data.department ? res.data.user_data.department.id : null)
                    setSelectDesignation(res.data.user_data.designation ? res.data.user_data.designation.id : null)    
                    setSelectWeekoff(res.data.user_data.week_off ? res.data.user_data.week_off.id : null)
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error during fetch individual data details for filling up the form fields', error);
            }
        };
        fetchData();
    }, []);

    return (
        loading ? <Loader /> : (
            <ScrollView>

                <View style={styles.formContainer}>
                    <View style={styles.profileContainer}> 
                       
                           {image != null ?  <Image source={image !== null ? { uri: image.assets[0].uri ? image.assets[0].uri : null } : require('../../../assests/userProfile.webp')} style={styles.updateProfile} />
                            : <Image source={formdata.profile_image ? { uri: (`${API_CONFIG.imageUrl}${formdata.profile_image}`) } : require('../../../assests/userProfile.webp')} style={styles.updateProfile} />
                    }
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
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>First Name</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formdata.first_name}
                            onChangeText={(text) => setFormdata({ ...formdata, first_name: text })}
                            placeholder="First name e.g. (John)"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Last Name</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formdata.last_name}
                            onChangeText={(text) => setFormdata({ ...formdata, last_name: text })}
                            placeholder="Last name"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formdata.email}
                            onChangeText={(text) => setFormdata({ ...formdata, email: text })}
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Phone Number</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            value={formdata.phone_number}
                            onChangeText={(text) => setFormdata({ ...formdata, phone_number: text })}
                            placeholder="Phone number"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Gender </Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectedGender(val)}
                            data={GenderData}
                            save="value"
                            placeholder={selectedGender ? selectedGender : 'Select Gender e.g. (Female)'}
                            notFoundText="Data not found"
                            value={selectedGender}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>User Type</Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectedUsertype(val)}
                            data={UsertypeData}
                            save="value"
                            placeholder={selectedUsertype ? selectedUsertype : 'Select User Type e.g. (Staff)'}
                            notFoundText="Data not found"
                            value={selectedUsertype}
                        />
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
                                placeholder={formdata.manager != null ? formdata.manager : 'Select Department e.g. (IT)'}
                                notFoundText="Data not found"
                                value={selectManager}
                            />
                        </View> : null
                    }
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Department</Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectDepartment(val)}
                            data={departmentData}
                            save="key"
                            placeholder={formdata.department != null ? formdata.department : 'Select Department e.g. (IT)'}
                            notFoundText="Data not found"
                            value={selectDepartment}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Designation</Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectDesignation(val)}
                            data={designationData}
                            save="key"
                            placeholder={formdata.designation != null ? formdata.designation : 'Select Designation e.g. (Developer)'}
                            notFoundText="Data not found"
                            value={selectDesignation}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Shift Time</Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectShiftTime(val)}
                            data={shiftTimeData || []}
                            save="key"
                            placeholder={'SelectShift Time e.g. (10:00 AM to 06:00 PM'}
                            notFoundText="Data not found"
                            value={selectShiftTime}
                           
                        />
                               
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Week Off</Text>
                        <SelectList
                            boxStyles={styles.textInput}
                            dropdownStyles={styles.textInput}
                            setSelected={(val) => setSelectWeekoff(val)}
                            data={weekoffData}
                            save="key"
                            placeholder={formdata.week_off != null ? formdata.week_off : 'Select Designation e.g. (Developer)'}
                            notFoundText="Data not found"
                            value={selectWeekoff}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Address</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formdata.address}
                            onChangeText={(text) => setFormdata({ ...formdata, address: text })}
                            placeholder="Address e.g. (Street Road 05)"
                        />
                    </View>
                    
                    <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
                         {isLoading ? <ButtonLoader /> : <Text style={styles.buttonText}>Submit</Text>}
                    </TouchableOpacity>
                </View>

                <Toast />
            </ScrollView>
        )
    );
};

export default EditUserForm;
