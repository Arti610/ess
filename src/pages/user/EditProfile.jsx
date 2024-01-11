import { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux";
import { getUserFailed, getUserStart, getUserSuccess } from "../../redux/slices/users/userSlice";
import userApi from "../../redux/slices/users/userApi";
import { styles } from "../../../style";
import { Formik } from "formik";
import { loginStyles } from "../auth/Login";

const EditProfile = ({ route }) => {
    const { userId } = route.params;
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(getUserStart())
                const res = await userApi.getUserById(userId)
                console.log('res', JSON.parse(res.data));
                dispatch(getUserSuccess())
            } catch (error) {
                dispatch(getUserFailed())
            }
        }
        fetchUser()
    }, [])

    const initialState = {
        profile_image: null,
        gender: null,
        email: null,
        phone_number: null,
        address: null
    }
    const handlePress = async () => {

    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialState}
                onSubmit={values => handlePress(values)}
            >
                {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                    <View style={styles.formContainer}>

                        <View style={loginStyles.loginBody}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.lable}>First Name</Text>
                                <TextInput style={styles.textInput} placeholder="First Name (e.g., John)" />
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
    )
}

export default EditProfile