import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, styles, textColor } from "../../../../style";
import Icon from 'react-native-vector-icons/AntDesign'
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/ActivityIndicator";
import createApi from "../../../redux/slices/utils/createApi";
import Toast from "react-native-toast-message";
const Dashboard = () => {

    const navigation = useNavigation()
    const currentDate = new Date();
    const [currentTime, setCurrentTime] = useState('');


    useEffect(() => {
        const timer = setInterval(() => {
            const currentDate = new Date();
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const formattedTime = currentDate.toLocaleTimeString('en-US', options);
            setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [inoutData, setInoutData] = useState(null)
    const [token, setToken] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchCurrentUser = async () => {
            const res = await currentUser()

            if (res) {

                setToken(res.token)
                setCurrentUserId(res.data)
            }
        }
        fetchCurrentUser()

        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getAllCheckinoutList(token);

                if (res.data) {
                    setLoading(false)
                    setInoutData(res.data);
                }
            } catch (error) {
                console.log('error during getting all checkin/checkout', error.response);
            }
        };
        fetchData()
    }, [])

    const hanldeCheckin = async () => {
        const payload = {
            checkin_checkout: 'CheckIn',
            date_time: new Date(),
            user: currentUserId && currentUserId.id ? currentUserId.id : null,
            branch: currentUserId && currentUserId.branch && currentUserId.branch.id ? currentUserId.branch.id : null,
        }
        console.log('payload', payload);
        try {
            const res = await createApi.createCheckin(payload)
            console.log('checkin response', res);
            if (res.status === 201 || res.status === 200) {
                Toast.show({
                    type: "success",
                    text1: 'Checkin successfully',
                    text2: 'congratulations, you are checkin successfully',
                    autoHide: 3000
                })
            }
        } catch (error) {
            console.log('error duting checkin', error);
        }
    }
    return (
        loading ? <Loader /> : <View style={style.container}>
            {/*Header @start */}
            <View style={style.header}>
                <TouchableOpacity style={style.card} onPress={hanldeCheckin}>
                    <View style={{ justifyContent: 'center' }}>
                        <View><Text >checkin</Text></View>
                        <View><Text style={[styles.lable, { fontSize: 15 }]}>{currentTime}</Text></View>
                    </View>
                    <View><Icon name='export' style={[style.userIcon, { backgroundColor: secondaryColor }]} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={style.card}>
                    <View style={{ justifyContent: 'center' }}>
                        <View><Text >checkout</Text></View>
                        <View><Text style={[styles.lable, { fontSize: 15 }]}>{currentTime}</Text></View>
                    </View>
                    <View><Icon name='export2' style={[style.userIcon, { backgroundColor: 'pink' }]} /></View>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Clock')}><Text style={{ fontSize: 12, fontWeight: 'bold' }}>View All</Text></TouchableOpacity>
                </View>

                {inoutData && inoutData.check_in && inoutData.check_in.slice(0, 1).map((item, i) => (
                    <View style={style.activityCard} key={i}>
                        <View><Icon name='export' style={[style.userIcon, { backgroundColor: secondaryColor }]} /></View>
                        <View>
                            <Text style={styles.lable}>Checkin</Text>
                            <Text>{item.date_time ? moment(item.date_time).format('DD MMM YYYY') : null}</Text>
                        </View>
                        <View>
                            <Text style={styles.lable}>{item.date_time ? new Date(item.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }) : null}</Text>
                            <Text>{item.punctuality}</Text>
                        </View>
                    </View>
                ))}
                {inoutData && inoutData.check_out && inoutData.check_out.slice(0, 1).map((item, i) => (
                    <View style={style.activityCard} key={i}>
                        <View><Icon name='export2' style={[style.userIcon, { backgroundColor: 'pink' }]} /></View>
                        <View>
                            <Text style={styles.lable}>Checkout</Text>
                            <Text>{item.date_time ? moment(item.date_time).format('DD MMM YYYY') : null}</Text>
                        </View>
                        <View>
                            <Text style={styles.lable}>{item.date_time ? new Date(item.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }) : null}</Text>
                            <Text>{item.punctuality}</Text>
                        </View>
                    </View>
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
        flex: 3,
        // backgroundColor: 'red'
    },
    footer: {
        flex: 2,
        gap: 8
    },
    card: {
        width: 150,
        height: 100,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'start',
        justifyContent: 'space-between',

    },

    userIcon: {
        fontSize: 25,
        textAlign: 'center',
        color: primaryColor,
        padding: 8, height: 40, width: 40, borderRadius: 20
    },

    activityCard: {
        width: '100%',
        height: 70,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    }
})  