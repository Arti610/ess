import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../style";
import { Formik } from "formik";
import { changePasswordSchema } from "../../utils/validationSchema";
import updateApi from "../../redux/slices/utils/updateApi";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
    const navigation = useNavigation()
    const intialState = {
        old_password: null,
        new_password: null,
        confirm_password: null
    }
    const handlePress = async (values) => {
       
        const fData = new FormData();
        fData.append('old_password',values.old_password)
        fData.append('new_password',values.password)
      
        try {
            const res = await updateApi.changePassword(fData, {
                headers:{
                    "content-type" : "application/json"
                }
            });
            console.log('res', res);
            if(res.status === 200){
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
            console.log('error got during change user password',error.response.data);
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
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default"
                             value={values.old_password} onChangeText={handleChange('old_password')} onBlur={handleBlur('old_password')} />
                        {touched.old_password && errors.old_password ? <Text style={styles.errorText}>{errors.old_password}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>New Password</Text>
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default"
                             value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} />
                        {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.lable}>Confirm Password</Text>
                        <TextInput style={styles.textInput} placeholder="••••••••" keyboardType="default"
                             value={values.confirm_password} onChangeText={handleChange('confirm_password')} onBlur={handleBlur('confirm_password')} />
                        {touched.confirm_password && errors.confirm_password ? <Text style={styles.errorText}>{errors.confirm_password}</Text> : null}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.buttonText}  onPress={handleSubmit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}

export default ChangePassword