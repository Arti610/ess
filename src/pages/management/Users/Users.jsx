import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import { styles } from "../../../../style"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import userApi from "../../../redux/slices/users/userApi"

const Users = ()=>{
    const navigation = useNavigation();
    const route = useRoute()
    const {id} = route.params
    const [data, setData] = useState(null)

    useEffect(()=>{
        const fetchusers = async ()=>{
            try {
                
                const res = await userApi.getBranchUsers(id)
                if(res.status === 200){
                    setData(res.data)
                }
            } catch (error) {
                
            }
        }
        fetchusers();
    },[])

    return(
        <>
            <ScrollView>
                {data && data.map((item, i)=>{
                    return(
                        <Text key={i}>{item.first_name ? item.first_name : 'User Name'}</Text> 

                    )
                })}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('UserForm', {id : id})}>
                <IconAdd name='add' style={styles.addIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Users