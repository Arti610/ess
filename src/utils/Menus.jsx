import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

const Menus = ({ id, getEdit, path, getDelete}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleEdit = async(id) => {
        try {
            if (id) {
                await getEdit(id, dispatch)
                navigation.navigate(path, { data: id })
            }
        } catch (error) {
            console.log('Error got during get brach by id', error);
        }

    }

    const handleDelete = (id) => {
        try {
            if (id) {
                console.log('id get duting delete', id);
                getDelete(id, dispatch)
            }
        } catch (error) {
            console.log('Error got during delete brach by id', error)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleEdit(id)}><Text>Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(id)}><Text>Delete</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default Menus;


const styles = StyleSheet.create({
    container: {
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