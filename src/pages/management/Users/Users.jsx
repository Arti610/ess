import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import { secondaryColor, styles, textColor } from "../../../../style"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import userApi from "../../../redux/slices/users/userApi"
import API_CONFIG from "../../../config/apiConfig"
import Toast from "react-native-toast-message"

const Users = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    const {id} = route.params;
    const [data, setData] = useState(null)

    const handleNavigate = (userId) => {
        navigation.navigate('UserProfile', { userId: userId, id : id});
    }
    

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
                <View style={style.container}> 
                {data && data.map((item, i) => (
                    <TouchableOpacity key={i} style={style.card} onPress={()=>handleNavigate(item.id)}>
                       { item?.profile_image ?  <Image source={{ uri: `${API_CONFIG.imageUrl}${item?.profile_image}` }} style={style.userIcon} /> : <Image source={require('../../../assests/userProfile.webp')} style={style.userIcon}/>}
                        <Text style={styles.lable}>{item.first_name ? `${item.first_name} ${item.last_name}` : 'User Name'}</Text>
                        <Text style={style.text}>{item.designation.name ? item.designation.name : 'No Designation'}</Text>
                        <Text style={style.text}>{item.user_type ? item.user_type : 'No User Type'}</Text>
                    </TouchableOpacity>
                ))}
                   
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('UserForm', {id : id})}>
                <IconAdd name='add' style={styles.addIcon} />
                </TouchableOpacity>
            </View>
            <Toast/>
        </>
    )
}

export default Users;


const style = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "row",
        flexWrap :"wrap",
        alignItems: 'center',
        justifyContent: 'start',
      },
    
      card: {
        width: 150,
        height: 150,
        margin: 5,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: 'white',
        borderColor: textColor,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userIcon:{ 
        padding: 5,
        marginBottom: 5,
        height: 50,
        width: 50,
        borderRadius: 25,
        padding:10,  
      },
      text:{
        color: '#5f6368',
        fontSize: 12
      }
      
})