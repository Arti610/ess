import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import BranchCard from '../../utils/BranchCard';
import {styles} from '../../../style';

const Home = props => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('currentUser');
        console.log('userDataString', userDataString);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <View style={[styles.container, {justifyContent: 'flex-start'}]}>
        <BranchCard />
        <BranchCard />
      </View>
    </>
  );
};

export default Home;
