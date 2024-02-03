
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import UserCard from "../../../utils/UserCard";
import Loader from "../../../utils/ActivityIndicator";
import Toast from "react-native-toast-message";

const ActiveUser = () => {
    const route = useRoute();
    const { id } = route.params;


    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getStaffList(id)
                if (res.status = 200) {
                    const filteredData = res.data.filter(user => user.status !== 'Deactivated')
                    setLoading(false)
                    setUserData(filteredData)
                }
            }
            catch (error) {
                setLoading(false)
                console.log('User Errror during fetch active user', error);
            }
        }
        fetchData()
    }, [])

    return (<>
        {loading ? <Loader /> : (<ScrollView>
            <UserCard item={userData} />
        </ScrollView>)}

        <Toast />
    </>
    )
};

export default ActiveUser;
