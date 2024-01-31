import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../style";
import DeleteModal from "../../../utils/DeleteModal";
import Toast from "react-native-toast-message";

const UserProfile =  () => {
    const navigation = useNavigation()
    const route = useRoute();
    const {userId} = route.params;
    const {id} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
 
    const handleModalVisible = ()=>{
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <View><Text>User Profile {userId}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('UserForm', {userId : userId, id : id})}><Text>Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleModalVisible(userId)}><Text>Delete</Text></TouchableOpacity>
            </View>
            <DeleteModal modalVisible ={modalVisible} handleModalVisible={handleModalVisible} text = "user" userid={userId} path ={"Users"}/>
            <Toast/>
        </>
    )
}

export default UserProfile