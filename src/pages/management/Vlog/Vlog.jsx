import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import ReelsComponent from './widgets/reels_component';
import ReelsComponent from '../../staff/vlog/widgets/reels_component';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';

const Vlog = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [currentUser, setCurrentUser] = useState(null);
  const route = useRoute();
  const {id} = route.params;

  const navigation = useNavigation();
  const handleLaunchCamera = async () => {
    try {
      const options = {
        mediaType: 'video',
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled the camera operation');
        } else if (response.error) {
          console.log('Camera Error:', response.error);
        } else if (response.assets) {
          navigation.navigate('UploadVlog', {video: response});
        }
      });
    } catch (error) {
      console.log('hell=========', error);
    }
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);
          if (res && res.data) {
            setCurrentUser(res.data);
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
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Vlog
        </Text>
        <TouchableOpacity
          onPress={
            () => handleLaunchCamera()
            // navigation.navigate('UploadVlog', {
            //   userId:
            //     currentUser && currentUser.id ? currentUser.id : currentUser.id,
            // })
          }>
          <Feather name="camera" style={{fontSize: 25, color: 'white'}} />
        </TouchableOpacity>
      </View>
      <ReelsComponent id={id} />
    </View>
  );
};

export default Vlog;
