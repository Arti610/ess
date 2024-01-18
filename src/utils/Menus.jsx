import { useNavigation } from "@react-navigation/native";
import {  Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {styles} from '../../style';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEdit from 'react-native-vector-icons/FontAwesome5'

const Menus = ({ id, getEdit, path, getDelete, name}) => {
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
                getDelete(id, dispatch)
            }
        } catch (error) {
            console.log('Error got during delete brach by id', error)
        }
    }

    return (
        <>
            <View style={styles.launchImageOption}>
             
                <TouchableOpacity onPress={() => handleEdit(id)} style={styles.touchableOpacity}><IconEdit name = 'edit' style={styles.icon} /><Text style={styles.lable}>{`Edit ${name}`}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(id)} style={styles.touchableOpacity}><IconDelete name='delete'  style={styles.icon} /><Text style={styles.lable}>{`Delete ${name}`}</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default Menus;


