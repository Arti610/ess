import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, styles, textColor } from "../../../../style";
import Icon from 'react-native-vector-icons/AntDesign'
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";
const Dashboard = () => {
    const currentDate = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = currentDate.toLocaleTimeString('en-US', options);

    const [inoutData, setInoutData] = useState(null)
    const [token, setToken] = useState(null)
    console.log('inoutData', inoutData);
    console.log('token', token);

    useEffect(() => {

        const fetchCurrentUser = async () => {
            const res = await currentUser()

            if (res.token) {
                setToken(res.token)
            }
        }
        fetchCurrentUser()

        const fetchData = async () => {
            try {
                const res = await getApi.getAllCheckinoutList(token);
                console.log('res.data', res);
                if (res.data) {
                    setInoutData(res.data);
                }
            } catch (error) {
                console.log('error during getting all checkin/checkout', error.response);
            }
        };
        fetchData()
    }, [])

    return (
        <View style={style.container}>
            {/*Header @start */}
            <View style={style.header}>
                <TouchableOpacity style={style.card} >
                    <View style={{ justifyContent: 'center' }}>
                        <View><Text style={[styles.lable, { fontSize: 17 }]}>{formattedTime}</Text></View>
                        <View><Text >checkin</Text></View>
                    </View>
                    <View><Icon name='export' style={style.userIcon} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={style.card} >
                    <View style={{ justifyContent: 'center' }}>
                        <View><Text style={[styles.lable, { fontSize: 17 }]}>{formattedTime}</Text></View>
                        <View><Text >checkout</Text></View>
                    </View>
                    <View><Icon name='export2' style={style.userIcon} /></View>
                </TouchableOpacity>
            </View>
            {/*Header @end */}
            {/*Body @start */}
            <View style={style.body}>
                <Text>Header</Text>
            </View>
            {/*Body @end */}
            {/*Footer @start */}
            <View style={style.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.textSubHeading}>Recent Activity</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>View All</Text>
                </View>

                {inoutData && inoutData.check_in && inoutData.check_in.map((item) => (
                    <View><Text>{item && item.date_time ? item.date_time : null}</Text></View>
                ))}
            </View>
            {/*Footer @end */}

        </View>
    )
}

export default Dashboard;

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10

    },
    header: {
        flex: 1,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    body: {
        flex: 2,
        backgroundColor: 'red'
    },
    footer: {
        flex: 2,
        backgroundColor: 'pink'

    },
    card: {
        width: 150,
        height: 100,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-between',

    },

    userIcon: {
        fontSize: 25,
        textAlign: 'center',
        color: primaryColor
    },
})  