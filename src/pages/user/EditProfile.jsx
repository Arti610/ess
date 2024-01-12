import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux";
import { getUserFailed, getUserStart, getUserSuccess, updateUserSuccess } from "../../redux/slices/users/userSlice";
import userApi from "../../redux/slices/users/userApi";
import { styles } from "../../../style";
import { Formik } from "formik";
import { Picker } from '@react-native-picker/picker';
import Loader from "../../utils/ActivityIndicator";
import Toast from "react-native-toast-message";
import { updateBranchStart } from "../../redux/slices/branch/branchSlice";
import { useNavigation } from "@react-navigation/native";
import ButtonLoader from "../../utils/BtnActivityIndicator";
import Icons from 'react-native-vector-icons/MaterialIcons'
import API_CONFIG from "../../config/apiConfig";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const EditProfile = ({ route }) => {
    const { userId } = route.params;
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [image, setImage] = useState(null)
    const [selectedGender, setSelectedGender] = useState(userData?.gender || '');

    const initialState = {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        gender: null,
        address: null,
        profile_image: null,
    }

    const options = {
        maxWidth: 200,
        maxHeight: 200,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(getUserStart());
                setIsLoading(true)
                const res = await userApi.getUserById(userId);
                if (res) {
                    setUserData(res?.data);
                }
                dispatch(getUserSuccess());
            } catch (error) {
                console.log(error);
                dispatch(getUserFailed());
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);


    const handleChooseImage = async () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setImage(response);
            }
        });
    };

    const handlePress = async (values) => {

        try {
            let formData = new FormData();
            (image?.assets[0] ? formData.append('profile_image', {
                name: image.assets[0].fileName ? image.assets[0].fileName : '',
                type: image.assets[0].type ? image.assets[0].type : '',
                uri: image.assets[0].uri ? image.assets[0].uri : '',
              })
                : null)
            formData.append('first_name', values.first_name ? values?.first_name : userData?.first_name)
            formData.append('last_name', values.last_name ? values?.last_name : userData?.last_name)
            formData.append('email', values.email ? values?.email : userData?.email)
            formData.append('phone_number', values.phone_number ? values?.phone_number : userData?.phone_number)
            formData.append('phone_number', values.phone_number ? values?.phone_number : userData?.phone_number)
            formData.append('gender', selectedGender || userData?.gender)
            formData.append('address', values.address ? values?.address : userData?.address)
console.log('formData',formData);
            const id = userData.id
            dispatch(updateBranchStart())
            setUpdateLoading(true)
            const res = await userApi.updateUser(id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.status === 200 || res.status === 201) {
                dispatch(updateUserSuccess(res.data))
                setUpdateLoading(false)
                navigation.navigate("Profile")
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Profile updated successfully',
                    text2: 'Your profile has been updated successfully',
                    visibilityTime: 4000,
                    autoHide: true
                });
                return res
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Something went wrong during user profile updation',
                    visibilityTime: 4000,
                    autoHide: true,
                })
            }

        } catch (error) {
            console.log('Error occured during user profile updation : ', error);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Something went wrong during user profile updation ',
                visibilityTime: 4000,
                autoHide: true,
            });
        }
    }


    return (
        isLoading ? <Loader /> :
            <ScrollView>
                <View style={styles.container}>
                    <Formik
                        initialValues={userId ? { ...userData } : initialState}
                        // validationSchema={addUserSchema}
                        onSubmit={values => handlePress(values)}
                    >
                        {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                            <View style={styles.formContainer}>

                                <View style={styles.profileContainer}>
                                    {userData && userData.profile_image ?
                                        <View>
                                            <Image source={image !== null ? { uri: image?.assets[0].uri } : { uri: `${API_CONFIG.imageUrl}${userData?.profile_image}` }} style={styles.updateProfile} />
                                            <TouchableOpacity onPress={handleChooseImage}><Icons name='edit' style={styles.updateProfileBtn} /></TouchableOpacity>
                                        </View> :
                                        <View>
                                            {image ? <Image source={{ uri: image?.assets[0].uri }} style={styles.updateProfile} /> : <Image source={require('../../assests/userProfile.webp')} style={styles.updateProfile} />}
                                            <TouchableOpacity onPress={handleChooseImage}><Icons name='edit' style={styles.updateProfileBtn} /></TouchableOpacity>
                                        </View>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>First Name</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="First Name (e.g., Steve)"
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
                                        placeholder="Last Name (e.g., Millery)"
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
                                        placeholder="Enter Email (e.g., example.google.com)"
                                        onBlur={handleBlur('email')}
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>Gender</Text>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={selectedGender}
                                        onValueChange={(itemValue) => setSelectedGender(itemValue)}
                                    >
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                    {touched.gender && errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>Phone Number</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Phone Number (e.g., 1234567890"
                                        onBlur={handleBlur('phone_number')}
                                        onChangeText={handleChange('phone_number')}
                                        value={values.phone_number}
                                    />
                                    {touched.phone_number && errors.phone_number ? <Text style={styles.errorText}>{errors.phone_number}</Text> : null}
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.lable}>Address</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter address (e.g., 123 Main St)"
                                        onBlur={handleBlur('address')}
                                        onChangeText={handleChange('address')}
                                        value={values.address}
                                    />
                                    {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                                </View>

                                <View >
                                    {updateLoading ? <ButtonLoader /> : <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>}
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
    )
}

export default EditProfile