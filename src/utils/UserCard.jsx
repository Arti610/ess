import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles, textColor } from "../../style";
import API_CONFIG from "../config/apiConfig";
import { useNavigation } from "@react-navigation/native";

const UserCard = ({ item, id }) => {
    const navigation = useNavigation();

    const handleNavigate = (userId) => {
        navigation.navigate('UserProfile', { userId: userId, id: id });
    }
    return (
        <View style={styles.container}>
            <View style={style.container}>
                {item && item.map((item, i) => (
                    <TouchableOpacity key={i} style={style.card} onPress={() => handleNavigate(item.id)}>
                        {item.profile_image && item.profile_image ? <Image source={{ uri: `${API_CONFIG.imageUrl}${item.profile_image}` }} style={style.userIcon} /> : <Image source={require('../assests/userProfile.webp')} style={style.userIcon} />}
                        <Text style={[styles.lable, { textAlign: 'center' }]}>{item.first_name && item.last_name ? `${item.first_name} ${item.last_name}` : 'User Name'}</Text>
                        <Text style={style.text}>{item.designation && item.designation.name ? item.designation.name : 'No Designation'}</Text>
                        <Text style={style.text}>{item.user_type && item.user_type ? item.user_type : 'No User Type'}</Text>
                        <Text style={style.text}>{item.status && item.status ? item.status : 'No User Type'}</Text>

                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default UserCard;

const style = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'start',
    },

    card: {
        width: 150,
        height: 150,
        margin: 5,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        padding: 5,
        marginBottom: 5,
        height: 50,
        width: 50,
        borderRadius: 25,
        padding: 10,
    },
    text: {
        color: '#5f6368',
        fontSize: 12
    }

})