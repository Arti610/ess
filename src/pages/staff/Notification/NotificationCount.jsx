import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IconN from 'react-native-vector-icons/MaterialIcons';
import {currentUser} from '../../../utils/currentUser';
import getApi from '../../../redux/slices/utils/getApi';
import {primaryColor} from '../../../../style';

const NotificationCount = () => {
  const navigation = useNavigation();
  const [currentUserData, setCurrentUserData] = useState(null);
  const userID = currentUserData && currentUserData.id ? currentUserData.id : null;
  const [data, setData] = useState([]);
  console.log('data notification ======> ',data);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await currentUser();
        setCurrentUserData(res.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
   
      const fetchUserNotification = async () => {
        try {
          const res = await getApi.getUserNotification(userID);

          if (res.data) {
            setData(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserNotification();
    
  }, [userID]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification', {data: data})}
      style={style.container}>
      <IconN name="notifications" style={style.icon} />
      {data ? (
        <Text style={style.badge}>{data.length}</Text>
      ) : (
        <Text style={style.badge}>0</Text>
      )}
    </TouchableOpacity>
  );
};

export default NotificationCount;

const style = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'relative',
  },
  icon: {
    fontSize: 25,
    color: primaryColor,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 15,
  },
});
