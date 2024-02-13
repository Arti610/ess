import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, styles } from "../../../../style";
import getApi from "../../../redux/slices/utils/getApi";
import { currentUser } from "../../../utils/currentUser";

const Timesheet = () => {
    const [branchId, setBranchId] = useState(null)
    const [data, setData] = useState([])
    const [status, setStatus] = useState('All');
    console.log('data', data);

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
                const res = await getApi.getTimeSheetList(branchId)
                setData(res.data)
            } catch (error) {
                console.log(error.response.data, 'error during fetching timesheet');
            }
        }
        fetchData()
    }, [])

    const handleFilterData = (status) => {
        setStatus(status);
    }

    return (
        <>
            <View style={style.container}>
                <TouchableOpacity style={style.header}>
                    <Text style={styles.lable}>Today </Text>
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
        </>
    )
}

export default Timesheet


const style = StyleSheet.create({
    container: {
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 8
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
})