import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import Loader from "../../../utils/ActivityIndicator";
import UserCard from "../../../utils/UserCard";
import Toast from "react-native-toast-message";

const InactiveStaff = () => {

    const route = useRoute()
    const { id } = route.params

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getStaffList(id)
                if (res.status = 200) {
                    const filteredData = res.data.filter(user => user.status === 'Deactivated')
                    setUserData(filteredData)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    return (
        <>
            {loading ? <Loader /> : (<ScrollView><UserCard item={userData} id={id} /></ScrollView>)}
            <Toast />
        </>
    )
}

export default InactiveStaff