import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import API_CONFIG from '../config/apiConfig';
import { primaryColor, textColor } from '../../style';


const UserProfile = () => {
  const navigation = useNavigation()
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
    <TouchableOpacity onPress={ ()=> navigation.navigate('Profile')}>
      <View style={styles.userName}
      >
        {currentUser && currentUser.profile_image ? <Image source={{ uri: `${API_CONFIG.imageUrl}${currentUser?.profile_image}` }} style={styles.image} /> :
         <Image
         source={require('../assests/userProfile.webp')}
         style={styles.image}
        />
        }
      </View>
    </TouchableOpacity>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  userName: {
    backgroundColor: primaryColor,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },

  image: {
    borderRadius: 20,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  }
})