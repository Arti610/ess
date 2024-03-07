import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import getApi from '../../../redux/slices/utils/getApi';
import UserCard from '../../../utils/UserCard';
import Loader from '../../../utils/ActivityIndicator';
import { useRoute } from '@react-navigation/native';

const CheckInUser = () => {

  const route = useRoute()
  const {id} = route.params

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getApi.getStaffList(id);

        if (res.status === 200) {
          const filteredUserData = res.data.filter(
            user => user.status === 'In Office',
          );
          setUserData(filteredUserData);
        }
      } catch (error) {
        console.log('User Error during fetch active user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <UserCard item={userData} id={id} /> 
    </ScrollView>
  );
};

export default CheckInUser;
