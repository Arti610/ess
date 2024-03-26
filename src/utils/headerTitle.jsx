import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import getApi from '../redux/slices/utils/getApi';
import {primaryColor, styles} from '../../style';
import API_CONFIG from '../config/apiConfig';

const HeaderTitle = () => {
  const option = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
  };
  const navigation = useNavigation();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const formattedDate = currentDate.toLocaleDateString('en-US', option);
  const [isLoading, setIsLoading] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);

          if (res) {
          
            const resData = res.data;

            const id = resData.id;

            // // let res;
            const resDetail = await getApi.getIndividualUser(id);
            if (resDetail.data) {
              // console.log('user data current ====', resDetail.data);
              setData(resDetail.data);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching individual user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

   
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Afternoon');
    } else {
      setGreeting('Evening');
    }

    const unsubscribe = navigation.addListener('focus', fetchData);

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flexDirection: 'row', marginLeft: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={style.userName}>
          {data && data?.user_data?.profile_image ? (
            <Image
              source={{
                uri: `${API_CONFIG.imageUrl}${data?.user_data?.profile_image}`,
              }}
              style={style.image}
            />
          ) : (
            <Image
              source={require('../assests/userProfile.webp')}
              style={style.image}
            />
          )}
        </View>
      </TouchableOpacity>
      <View>
        <Text style={[styles.lable, {paddingBottom: 0}]}>
          {data?.user_data?.first_name && data?.user_data?.last_name
            ? `${greeting}, ${data?.user_data?.first_name} ${data?.user_data?.last_name}`
            : `${greeting}, Guest`}
        </Text>
        <Text style={{fontSize: 12}}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
    borderRadius: 22.5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderTitle;
