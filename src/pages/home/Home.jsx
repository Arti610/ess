import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BranchCard from '../../utils/BranchCard';
import {styles} from '../../../style';
import {useNavigation} from '@react-navigation/native';
import TavNavigator from '../../navigation/TavNavigator';

const Home = () => {
  const navigation = useNavigation();
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
  }, []);

  return (
    <>
      <ScrollView>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <BranchCard />
          <TouchableOpacity onPress={() => navigation.navigate('AddBranch')}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
     
    </>
  );
};

export default Home;
