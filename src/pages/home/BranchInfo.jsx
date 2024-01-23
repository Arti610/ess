import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import { styles } from '../../../style'
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import branchApi from "../../redux/slices/branch/branchApi";
import BranchInfoCard from "../../utils/BranchInfoCard";

const BranchInfo = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])
   
    useEffect(() => {
        try { 
            const fetchBranchInfo = async () => {
                const res = await branchApi.getAllBranchInfo()
                
                if (res) {
                    setData(res.data)
                }
            }
            fetchBranchInfo()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <ScrollView>  
                <View style={styles.container}>
                    {data && data.map((item, i) =>
                        <BranchInfoCard item={item} key={i} />)}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddBranchInfo')}>
                    <IconAdd name='add' style={styles.addIcon} />
                </TouchableOpacity>
            </View>
            <Toast />
        </>
    )
}

export default BranchInfo;


