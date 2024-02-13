import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, styles } from "../../../../style";
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";
import Loader from "../../../utils/ActivityIndicator";
import moment from "moment";


const Weekly = () => {
    const [branchId, setBranchId] = useState(null)
    const [data, setData] = useState([])
    const [status, setStatus] = useState('All');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await currentUser()

                if (res) {
                    setBranchId(res.data.branch.id)
                }
            } catch (error) {
                console.log(error, 'error during fetching currentuser in timesheet');
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                const res = await getApi.getTimeSheetList(branchId)
                setData(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error.response.data, 'error during fetching timesheet');
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        filterData(status);
    }, [status, data]);


    const filterData = (status) => {
        let newData;
        const currentWeek = moment().week();
        console.log('currentWeek',currentWeek);
        if (status === 'All') {
            newData = data.filter(item => moment(item.date).week() === currentWeek);

        } else {
            newData = data.filter(item => item.attendance === status && moment(item.date).week() === currentWeek);
        }

        setFilteredData(newData);

    }

    const handleFilterData = (status) => {
        setStatus(status);
    }

    return (
        <>

       
            <View style={style.container}>
                <TouchableOpacity onPress={() => handleFilterData('All')}>
                    <Text style={status === 'All' ? style.inactive : style.active}>All {`(${data && data.filter(item => moment(item.date).week() === moment().week() ).length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('P')}>
                    <Text style={status === 'P' ? style.inactive : style.active}>Present {`(${data && data.filter(item => item.attendance === 'P' && moment(item.date).week() === moment().week()).length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('A')}>
                    <Text style={status === 'A' ? style.inactive : style.active}>Absent {`(${data && data.filter(item => item.attendance === 'A' && moment(item.date).week() === moment().week()).length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('W')}>
                    <Text style={status === 'W' ? style.inactive : style.active}>Week Off {`(${data && data.filter(item => item.attendance === 'W' && moment(item.date).week() === moment().week()).length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('H')}>
                    <Text style={status === 'H' ? style.inactive : style.active}>Holiday {`(${data && data.filter(item => item.attendance === 'H' && moment(item.date).week() === moment().week()).length})`}</Text>
                </TouchableOpacity>
            </View>

            {loading ? <Loader /> :
                <ScrollView>
                    <View style={style.details}>
                        {filteredData.length > 0 ? filteredData.map((item) => (
                            <View style={style.card} key={item.id}>
                                <Text>{moment(item && item.date ? item.date : null).format('DD MMM YYYY')}</Text>
                                <Text style={styles.lable}>{item && item.attendance ? item.attendance : null}</Text>
                            </View>
                        )) : <Text>No Data Found</Text>}
                    </View>
                </ScrollView>
            }
        </>
    )
}

export default Weekly


const style = StyleSheet.create({
    topcontainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 5
    },
    header: {
        height: 80,
        width: 80,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    active: {
        backgroundColor: primaryColor,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        paddingVertical: 15,
        color: 'white',
        fontSize: 12,
    },
    inactive: {
        backgroundColor: secondaryColor,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        paddingVertical: 15,
        color: 'black',
        fontSize: 12,
    },
    details: {
        padding: 20,
        gap: 10,
    },
    card: {
        height: 'fit-content',
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

})