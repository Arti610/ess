import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import UserCard from "../../../utils/UserCard";
import { useRoute } from "@react-navigation/native";
import getApi from "../../../redux/slices/utils/getApi";

const NotCheckInUser = () => {
    const route = useRoute();
    const { id } = route.params;

    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getApi.getStaffList(id)
                if (res.status = 200) {
                    const filteredUserData = res.data.filter(user => user.status == 'Not In Office');
                    setUserData(filteredUserData);
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
            <UserCard item={userData} id={id} />
        </ScrollView>
    )
}


export default NotCheckInUser