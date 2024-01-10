import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const Menus = ({id, getEdit, path}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

  const handleEdit = (id)=>{
   try {
        if(id){
            getEdit(id, dispatch)
            navigation.navigate(path, { data: id })
        }
   } catch (error) {
        console.log('Error got during get brach by id', error);
   }

  }

  const handleDelete = (id)=>{
    console.log('id get duting edit', id);
  }

return (
    <>
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> handleEdit(id)}><Text>Edit</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=> handleDelete(id)}><Text>Delete</Text></TouchableOpacity>
        </View>
    </>
)
}

export default Menus;


const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        width: 100,
        borderColor: '#D0D5DD',
        backgroundColor: '#FFF',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        position: 'absolute',
        right: 15,
        top: 15
    }
})