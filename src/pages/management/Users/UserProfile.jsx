import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DeleteModal from "../../../utils/DeleteModal";
import Toast from "react-native-toast-message";
import { styles } from "../../../../style";
import updateApi from "../../../redux/slices/utils/updateApi";
import IconA from 'react-native-vector-icons/AntDesign'
import ButtonLoader from "../../../utils/BtnActivityIndicator";

const UserProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userData } = route.params;
    const { id } = route.params;
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const handleModalVisible = () => {
        setModalVisible(!modalVisible)
    }

    const deactivateStaff = {
        status: "Deactivated",
        is_active: false
    }
    const activateStaff = {
        status: "Not In Office",
        is_active: true
    }
    const handleSubmit = async (userId) => {

        try {
            let res;
            setLoading(true)
            if (userData.status === 'Deactivated') {

                res = await updateApi.updateUser(userId, activateStaff);
                if (res.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: `${userData.first_name} ${userData.last_name} activate successfully`,
                        text2: `Congratulations, now you can use your credentials`,
                        autoHide: 4000,
                        position: "top"
                    })
                    setLoading(false)
                }
            } else {

                res = await updateApi.updateUser(userId, deactivateStaff);
                if (res.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: `${userData.first_name} ${userData.last_name} deactivate successfully`,
                        text2: `Your credentials are deactivate now, you not be able to use credentials`,
                        autoHide: 4000,
                        position: "top"
                    })
                    setLoading(false)
                }
            }
        } catch (error) {
            console.log('Error occurred during activate or deactivate user', error);
        }
    };

    return (
        <View style={styles.formContainer}>
            <View>
                <Text>User Profile </Text>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('EditUserForm', { id: id, userId: userData.id })}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={handleModalVisible}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={() => handleSubmit(userData.id)}>{loading ? <ButtonLoader/> :<Text style={styles.buttonText}> {userData.status === 'Deactivated' ? 'Activate Staff' : 'Deactivate Staff'}</Text>}</TouchableOpacity>
            </View>

            <DeleteModal modalVisible={modalVisible} handleModalVisible={handleModalVisible} text="user" userid={userData.id} path={"Users"} />
            <Toast />
        </View>
    )
}

export default UserProfile