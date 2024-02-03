import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import getApi from "../../../redux/slices/utils/getApi";
import UserCard from "../../../utils/UserCard";
import Loader from "../../../utils/ActivityIndicator";

const CheckInUser = () => {
    const route = useRoute();
    const { id } = route.params;

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getApi.getStaffList(id);
                if (res.status === 200) {
                    const filteredUserData = res.data.filter(user => user.status === 'In Office');
                    setUserData(filteredUserData);
                }
            } catch (error) {
                console.log('User Error during fetch active user', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); 

    return (
        loading ? <Loader /> : (
            <ScrollView>
                <UserCard item={userData} id={id} />
            </ScrollView>
        )
    );
};

export default CheckInUser;
