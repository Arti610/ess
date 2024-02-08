import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, styles, textColor } from "../../../../style";
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";
import moment from "moment";
import Icon from 'react-native-vector-icons/AntDesign'
import Loader from "../../../utils/ActivityIndicator";

const Checkout = () => {
    const [status, setStatus] = useState('All');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
  
    const handleFilterData = (status) => {
        setStatus(status);
    }


    const filterData = (status, data) => {
        const today = new Date();
        switch (status) {
            case 'Weekly':
                const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                return data.filter(item => new Date(item.date_time) >= weekStart);
            case 'Monthly':
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                return data.filter(item => new Date(item.date_time) >= monthStart);
            case 'Yearly':
                const yearStart = new Date(today.getFullYear(), 0, 1);
                return data.filter(item => new Date(item.date_time) >= yearStart);
            default:
                return data;
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const res = await currentUser();

            if (res.token) {
                setToken(res.token)
            }
        }
        fetchCurrentUser()

        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getApi.getAllCheckinoutList(token);

                if (res.data) {
                    setLoading(false)
                    setData(res.data.check_out)
                }
            } catch (error) {
                console.log('error during getting all checkin/checkout', error.response);
            }
        };
        fetchData()
    }, [])


    return (
        <>
            <View style={style.container}>
                <TouchableOpacity onPress={() => handleFilterData('All')}>
                    <Text style={status === 'All' ? style.inactive : style.active}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('Weekly')}>
                    <Text style={status === 'Weekly' ? style.inactive : style.active}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('Monthly')}>
                    <Text style={status === 'Monthly' ? style.inactive : style.active}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('Yearly')}>
                    <Text style={status === 'Yearly' ? style.inactive : style.active}>Yearly</Text>
                </TouchableOpacity>
            </View>
            {loading ? <Loader /> : 
                <View style={style.containercard}>
                   {data ?  <FlatList
                        data={filterData(status, data)}
                        renderItem={({ item }) => (
                            <View style={style.activityCard}>
                                <View style={{flexDirection: 'row',justifyContent: 'start', alignItems : 'flex-start', gap: 20}}>
                                    <Icon name='export2' style={[style.userIcon, { backgroundColor: 'pink' }]} />
                                  <View>
                                  <Text style={styles.lable}>Checkout</Text>
                                    <Text>{item.date_time ? moment(item.date_time).format('DD MMM YYYY') : null}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.lable}>{item.date_time ? new Date(item.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }) : null}</Text>
                                    <Text>{item.punctuality}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    /> : <Text>No Data Found</Text>}
                </View>
           }
        </>
    )
}

export default Checkout;

const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    active: {
        backgroundColor: primaryColor,
        paddingHorizontal: 15,
        marginHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 25,
        color: 'white'
    },
    inactive: {
        backgroundColor: secondaryColor,
        paddingHorizontal: 15,
        marginHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 25,
        color: 'black'
    },
    details: {
        padding: 20,
        gap: 10,
    },
    card: {
        height: 80,
        gap: 7,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFF',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    containercard: {
        width: '100%',
        height: '100%',
        padding: 10,
        textAlign: 'center',
        paddingBottom: 80
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
        width: '98%',
        height: 70,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    }
});
