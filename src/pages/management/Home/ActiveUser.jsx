
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import UserCard from "../../../utils/UserCard";


const ActiveUser = () => {
    const route = useRoute();
    const { id } = route.params;


    const [userData, setUserData] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getApi.getStaffList(id)
                if (res.status = 200) {
                    setUserData(res.data)
                }
            }
            catch (error) {
                console.log('User Errror during fetch active user', error);
            }
        }
        fetchData()
    }, [])

    return (
        <ScrollView>
            <UserCard item={userData} />
        </ScrollView>
    )
};

export default ActiveUser;
