import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import {  secondaryColor, styles } from '../../style';
import deleteApi from '../redux/slices/utils/deleteApi';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import getApi from '../redux/slices/utils/getApi';

const DeleteModal = ({ modalVisible, handleModalVisible,  text, userid, path }) => {
    const navigation = useNavigation();

    const handleDelete = async () => {
      
            try {
                const res = await deleteApi.deleteUser(userid);
                if (res.status === 200) {
                    navigation.navigate(path);
                    Toast.show({
                        type: "success",
                        text1: `${text} deleted successfully`,
                        position: 'top',
                        visibilityTime: 4000,
                        autoHide: true
                    });
                    await getApi.getStaffList(userid)
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: `${text} not deleted, try again`,
                    position: 'top',
                    visibilityTime: 4000,
                    autoHide: true
                });
            
        }
    };

    return (
        <View style={style.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    handleModalVisible;
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Icon name='delete' style={[styles.icon, style.icon]}/>
                        <Text style={styles.textHeading}>{`Are you sure ?`}</Text>
                        <Text style={styles.textDesc}>{`You are about to delete ${text}`}</Text>
                        <View style={style.buttonContainer}>
                            <Pressable
                                style={styles.secondaryButton}
                                onPress={handleModalVisible}>
                                <Text style={styles.secondaryButtonText}>No</Text>
                            </Pressable>
                            <Pressable
                                style={styles.ModalPrimaryButton}
                                onPress={handleDelete}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
   
    icon:{
        backgroundColor: secondaryColor,
        borderRadius: 25,
        height:50,
        width: 50,
        textAlign: 'center',
        padding: 15

    }
});

export default DeleteModal;


const DeleteOptionModal = ({ modalVisible, handleModalVisible,  text, handleDelete })=>{
 
    return(
        <View style={style.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    handleModalVisible;
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Icon name='delete' style={[styles.icon, style.icon]}/>
                        <Text style={styles.textHeading}>{`Are you sure ?`}</Text>
                        <Text style={styles.textDesc}>{`You are about to delete ${text}`}</Text>
                        <View style={style.buttonContainer}>
                            <Pressable
                                style={styles.secondaryButton}
                                onPress={handleModalVisible}>
                                <Text style={styles.secondaryButtonText}>No</Text>
                            </Pressable>
                            <Pressable
                                style={styles.ModalPrimaryButton}
                                onPress={handleDelete}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export {DeleteOptionModal}