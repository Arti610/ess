import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import { useRoute } from "@react-navigation/native";
import Loader from "../../../utils/ActivityIndicator";
import UserCard from "../../../utils/UserCard";

const LeaveRequest = () => {
    const route = useRoute()
    const { id } = route.params;


    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getLeaveList(id)
                if (res.status === 200) {
                    setUserData(res.data)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log('error got during fetch the leave request data', error);
            }
        }
        fetchData();
    }, [id])

    return (
        loading ? <Loader /> : <ScrollView>
            <UserCard item={userData} id={id} />
        </ScrollView>
    )
}


export default LeaveRequest;