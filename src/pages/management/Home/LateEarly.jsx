import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import Loader from "../../../utils/ActivityIndicator";
import UserCard from "../../../utils/UserCard";

const LateEarly = () => {

    const route = useRoute()
    const { id } = route.params;

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getLateEarlyList(id);
                if (res.status === 200) {
                    setLoading(false)
                    setUserData(res.data)
                }

            } catch (error) {
                setLoading(false)
                console.log('error got during get the data of late early', error);
            }
        }
        fetchData()
    }, [])

    return (
       loading ? <Loader/> : <ScrollView>
        <UserCard item={userData} id= {id}/>
       </ScrollView>
    )
}

export default LateEarly;