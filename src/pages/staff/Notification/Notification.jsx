import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { currentUser } from "../../../utils/currentUser";
import getApi from "../../../redux/slices/utils/getApi";

const Notification = () => {
    const [branchId, setBranchId] = useState(null)
    const [data, setData] = useState(null)

    console.log('data', data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await currentUser()
                setBranchId(res.data.branch.id)
            } catch (error) {

            }
        }
        fetchData()

        if (branchId) {
            const fetchNotification = async () => {
                try {
                    const res = await getApi.getNotification(branchId)
                    console.log('res.data', res.data);
                    if (res.data) {

                        setData(res.data)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchNotification()
        }
    }, [])
    return (
        <View>
            <Text>Notification</Text>
        </View>
    )
}

export default Notification