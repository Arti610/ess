
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import getApi from '../../../redux/slices/utils/getApi';
import UserCard from '../../../utils/UserCard';
import Loader from '../../../utils/ActivityIndicator';
import Toast from 'react-native-toast-message';
import {currentUser} from '../../../utils/currentUser';

const InactiveStaff = () => {
  const route = useRoute();
  const {id} = route.params;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await currentUser();
        setCurrentUserData(res.data);
      } catch (error) {
        console.log(error);
        // Display error message to the user
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch current user data',
        });
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (currentUserData != null) {
      setLoading(true);
      try {
        const fetchData = async () => {
          let res;
          if (currentUserData.user_type === 'Manager') {
            res = await getApi.getManagerStaffList(
              currentUserData.id ? currentUserData.id : null,
            );
          } else {
            res = await getApi.getStaffList(id);
          }

          if (res.status === 200) {
            const filteredData = res.data.filter(
              user => user.status === 'Deactivated',
            );
            setUserData(filteredData);
          }
        };
        fetchData();
      } catch (error) {
        console.log('Error during fetching active users', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch active users',
        });
      } finally {
        setLoading(false);
      }
    }
  }, [currentUserData, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <UserCard item={userData} id={id} />
        </ScrollView>
      )}
       {/* <Toast /> */}
    </>
  );
};

export default InactiveStaff;
