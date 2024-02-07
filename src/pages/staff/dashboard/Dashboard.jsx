import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, styles, textColor } from "../../../../style";
import Icon from 'react-native-vector-icons/AntDesign'

const Dashboard = () => {
    const currentDate = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = currentDate.toLocaleTimeString('en-US', options);

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
                <Text>Header</Text>
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