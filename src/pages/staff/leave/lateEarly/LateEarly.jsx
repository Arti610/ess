import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, styles } from "../../../../../style";
import IconAdd from 'react-native-vector-icons/MaterialIcons'

const LateEarly = () => {
    return (
        <>
            <View style={style.container}>
                <TouchableOpacity ><Text style={style.text}>Approved</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={style.text}>Pending</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={style.text}>Declined</Text></TouchableOpacity>
            </View>
            <View style={style.details}>
                <Text>Hello</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <IconAdd name='add' style={styles.addIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default LateEarly
const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        backgroundColor: primaryColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        color: 'white'
    },
    details: {
        padding: 20,

    }
})