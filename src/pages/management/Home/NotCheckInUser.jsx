import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import UserCard from "../../../utils/UserCard";
import { useRoute } from "@react-navigation/native";
import getApi from "../../../redux/slices/utils/getApi";
import Loader from "../../../utils/ActivityIndicator";

const NotCheckInUser = () => {
    const route = useRoute();
    const { id } = route.params;

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getStaffList(id)
                if (res.status = 200) {
                    const filteredUserData = res.data.filter(user => user.status == 'Not In Office');
                    setUserData(filteredUserData);
                    setLoading(false)
                }
            }
            catch (error) {
                setLoading(false)
                console.log('User Errror during fetch active user', error);
            }
        }
        fetchData()
    }, [id])

    return (
        loading ? <Loader /> : (
            <ScrollView>
                <UserCard item={userData} id={id} />
            </ScrollView>
        )
    )
}


export default NotCheckInUser