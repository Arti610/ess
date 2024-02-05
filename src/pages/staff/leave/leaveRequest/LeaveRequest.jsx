import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { primaryColor, styles } from "../../../../../style";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import getApi from "../../../../redux/slices/utils/getApi";

const LeaveRequest = () => {
    const navigation = useNavigation();


    const [data, setData] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getApi.getAllLeaveRequest()
            
            if(res.data){
                setData(res.data)
            }
        }   
        fetchData()
    },[])
    
    return (
        <>
            <View style={style.container}>
                <TouchableOpacity ><Text style={style.text}>All</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={style.text}>Approved</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={style.text}>Pending</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={style.text}>Declined</Text></TouchableOpacity>
            </View>
            <View style={style.details}>
                <Text>Hello</Text>
            </View>
            <View style={styles.buttonContainer}>
              
                <TouchableOpacity onPress={() => navigation.navigate('ApplyLR')}>
                    <IconAdd name='add' style={styles.addIcon} />
                </TouchableOpacity>
            </View>
         
        </>
    )
}

export default LeaveRequest

const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        backgroundColor: primaryColor,
        paddingHorizontal: 15,
        marginHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 25,
        color: 'white'
    },
    details: {
        padding: 20,
    },
   
})
