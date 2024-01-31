import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../style";
import { Formik } from "formik";
import { changePasswordSchema } from "../../utils/validationSchema";
import updateApi from "../../redux/slices/utils/updateApi";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import ButtonLoader from "../../utils/BtnActivityIndicator";

const ChangePassword = () => {
    const navigation = useNavigation();
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const intialState = {
        old_password: null,
        new_password: null,
        confirm_password: null
    }

    const handlePress =async (values) => {

        const fData = new FormData();
        fData.append('old_password', values.old_password)
        fData.append('new_password', values.password)

        try {
            setIsLoading(true)
            const res = await updateApi.changePassword(fData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });
           
            if (res.status === 200) {
                setIsLoading(false)
                navigation.navigate('Profile')
                Toast.show({
                    type: 'success',
                    text1: 'Password changed successfully',
                    text2: 'Congratulations, you have changed your password successfully',
                    autoHide: true,
                    visibilityTime: 4000,
                    position: "top"
                })
            }
        } catch (error) {
            setIsLoading(false)
            console.log('error got during change user password', error.response.data);
            Toast.show({
                type: 'success',
                text1: "Password doesn't change",
                autoHide: true,
                visibilityTime: 4000,
                position: "top"
            })
        }
    }

    return (
        <Formik initialValues={intialState} validationSchema={changePasswordSchema} onSubmit={handlePress}>
            {({ handleSubmit, handleBlur, handleChange, touched, values, errors }) => (
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Old Password</Text>
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default" secureTextEntry={isPasswordHidden}
                            value={values.old_password} onChangeText={handleChange('old_password')} onBlur={handleBlur('old_password')} />
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 40, right: 8 }}
                            onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                            {isPasswordHidden ? <Icon name='eye-slash' style={styles.eyeIcon} /> : <Icon name='eye' style={styles.eyeIcon} />}
                        </TouchableOpacity>
                        {touched.old_password && errors.old_password ? <Text style={styles.errorText}>{errors.old_password}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>New Password</Text>
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default" secureTextEntry={isNewPasswordHidden}
                            value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} />
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 40, right: 8 }}
                            onPress={() => setIsNewPasswordHidden(!isNewPasswordHidden)}>
                            {isNewPasswordHidden ? <Icon name='eye-slash' style={styles.eyeIcon} /> : <Icon name='eye' style={styles.eyeIcon} />}
                        </TouchableOpacity>
                        {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Confirm Password</Text>
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default" secureTextEntry={isConfirmPasswordHidden}
                            value={values.confirm_password} onChangeText={handleChange('confirm_password')} onBlur={handleBlur('confirm_password')} />
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 40, right: 8 }}
                            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}>
                            {isConfirmPasswordHidden ? <Icon name='eye-slash' style={styles.eyeIcon} /> : <Icon name='eye' style={styles.eyeIcon} />}
                        </TouchableOpacity>
                        {touched.confirm_password && errors.confirm_password ? <Text style={styles.errorText}>{errors.confirm_password}</Text> : null}
                    </View>
                    <View>
                    {isLoading ? <TouchableOpacity style={styles.primaryButton}><ButtonLoader  /></TouchableOpacity> :   <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.buttonText} onPress={handleSubmit}>Submit</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            )}
        </Formik>
    )
}

export default ChangePassword