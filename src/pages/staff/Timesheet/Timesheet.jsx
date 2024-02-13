import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, styles } from "../../../../style";
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";
import Loader from "../../../utils/ActivityIndicator";
import moment from "moment";


const Timesheet = () => {
    const [branchId, setBranchId] = useState(null)
    const [data, setData] = useState([])
    const [status, setStatus] = useState('All');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log('filteredData', filteredData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await currentUser()

                if (res) {
                    setBranchId(res.data.branch.id)
                }
            } catch (error) {
                console.log(error, 'error during fetching currentuser in timesheer');
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
        if (status === 'All') {
            newData = data;
        } else {
            newData = data.filter(item => item.attendance === status);
        }
        setFilteredData(newData);
    }

    const handleFilterData = (status) => {
        setStatus(status);
    }

    return (
        <>

            <View style={style.topcontainer}>
                <TouchableOpacity style={style.header}>
                    <Text style={styles.lable}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.header}>
                    <Text style={styles.lable}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.header}>
                    <Text style={styles.lable}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.header}>
                    <Text style={styles.lable}>Yearly</Text>
                </TouchableOpacity>
            </View>

            <View style={style.container}>
                <TouchableOpacity onPress={() => handleFilterData('All')}>
                    <Text style={status === 'All' ? style.inactive : style.active}>All {`(${data && data.length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('P')}>
                    <Text style={status === 'P' ? style.inactive : style.active}>Present {`(${data && data.filter(item => item.attendance === 'P').length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('A')}>
                    <Text style={status === 'A' ? style.inactive : style.active}>Absent {`(${data && data.filter(item => item.attendance === 'A').length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('W')}>
                    <Text style={status === 'W' ? style.inactive : style.active}>Week Off {`(${data && data.filter(item => item.attendance === 'W').length})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterData('H')}>
                    <Text style={status === 'H' ? style.inactive : style.active}>Holiday {`(${data && data.filter(item => item.attendance === 'H').length})`}</Text>
                </TouchableOpacity>
            </View>

            {loading ? <Loader /> :
                <ScrollView>
                    <View style={style.details}>
                        {filteredData.length > 0 ? filteredData.map((item) => (
                            <View style={style.card}>
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

export default Timesheet


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
        paddingVertical: 10,
        borderRadius: 25,
        color: 'white',
        fontSize: 12,
    },
    inactive: {
        backgroundColor: secondaryColor,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 25,
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