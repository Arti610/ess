import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../style';

const HeaderTitle = () => {
  const option = {day: '2-digit', month: 'short', year: 'numeric'};
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const formattedDate = currentDate.toLocaleDateString('en-US', option);

  const [greeting, setGreeting] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('currentUser');

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();

    // Determine the greeting based on the current time
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Afternoon');
    } else {
      setGreeting('Evening');
    }
  }, []);

  return (
    <View style={{marginLeft: 10}}>
      <Text style={[styles.lable, {paddingBottom: 0}]}>
        {currentUser?.data.first_name && currentUser?.data.last_name
          ? `${greeting}, ${currentUser?.data.first_name} ${currentUser?.data.last_name}`
          : `${greeting}, Guest`}
      </Text>
      <Text style={{fontSize: 12}}>{formattedDate}</Text>
    </View>
  );
};

export default HeaderTitle;
