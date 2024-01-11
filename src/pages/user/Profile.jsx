import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../../../style';
import API_CONFIG from '../../config/apiConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi';
import { logoutFailure, logoutStart, logoutSuccess } from '../../redux/slices/auth/authSlice';

const Profile = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);
          if (res && res.data) {
            setCurrentUser(res?.data)
          }
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);


  return (
    <View style={pStyles.container}>
      <View style={pStyles.userHeader}>
        {currentUser && currentUser.profile_image ?
          <Image source={{ uri: `${API_CONFIG.imageUrl}${currentUser?.profile_image}` }} style={pStyles.image} /> :
          <Image source={require('../../assests/userProfile.webp')} style={pStyles.image} />}
        <Text style={styles.textHeading}>{currentUser?.first_name}{currentUser?.last_name}</Text>
        <Icon name="rocket" size={30} color="#900" />
      </View>
      <View style={pStyles.userBody}></View>
      <View style={pStyles.userFooter}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { userId: currentUser?.id })}>
          <View style={pStyles.footerText} >
            <Text>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
          <View style={pStyles.footerText}><Text>Logout</Text></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const pStyles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 100,
    paddingHorizontal: 40,
    backgroundColor: 'yellow',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userHeader: {
    flex: 2,
    backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userBody: {
    backgroundColor: 'green',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userFooter: {
    backgroundColor: 'pink',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  image: {
    borderRadius: 20,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {

  }

})
