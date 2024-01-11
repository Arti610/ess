import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getUserFailed, getUserStart, getUserSuccess } from "../../redux/slices/users/userSlice";
import userApi from "../../redux/slices/users/userApi";
import { styles } from "../../../style";
import { Formik } from "formik";
import { loginStyles } from "../auth/Login";
import { addUserSchema } from "../../utils/validationSchema";
import Loader from "../../utils/ActivityIndicator";
import Toast from "react-native-toast-message";

const EditProfile = ({ route }) => {
    const { userId } = route.params;
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)

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
                // Set loading to false once the operation is complete
                setIsLoading(false);
            }
        };
    
        fetchUser();
    }, []);

    const initialState = {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        gender: null,
        address: null,
        profile_image: null,
    }

    const handlePress = async (values) => {
        console.log('values', values);
        try {
            let formData = new FormData();
            formData.append('first_name', values.first_name ? values?.first_name : userData?.first_name)
            formData.append('last_name', values.last_name ? values?.last_name : userData?.last_name)
            formData.append('email', values.email ? values?.email : userData?.email)
            formData.append('phone_number', values.phone_number ? values?.phone_number : userData?.phone_number)
            formData.append('gender', values.gender ? values?.gender : userData?.gender)
            formData.append('address', values.address ? values?.address : userData?.address)

        } catch (error) {
            console.log('Error occured during user profile udation : ', error);
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
     isLoading ? <Loader/> :  
      <ScrollView>
            <View style={styles.container}>
                <Formik
                    initialValues={userId ? { ...userData } : initialState}
                    // validationSchema={addUserSchema}
                    onSubmit={values => handlePress(values)}
                >
                    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View style={loginStyles.loginBody}>
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
                            </View>
                            <View style={loginStyles.loginFooter}>
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

export default EditProfile