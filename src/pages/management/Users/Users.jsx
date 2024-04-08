import {ScrollView, TouchableOpacity, View} from 'react-native';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../../../../style';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import Loader from '../../../utils/ActivityIndicator';
import UserCard from '../../../utils/UserCard';
import getApi from '../../../redux/slices/utils/getApi';
import {currentUser} from '../../../utils/currentUser';

const Users = ({route}) => {
  const navigation = useNavigation();

  const {id} = route.params;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await currentUser();
        if (res.data) {
          setCurrentUserData(res.data);
        }
      };
      fetchData();
    } catch (error) {
      console.log('during fecting users', error);
    }
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchusers = async () => {
        if (currentUserData && currentUserData.user_type === 'Manager') {
          const res = await getApi.getManagerStaffList(
            currentUserData.id ? currentUserData.id : null,
          );
          if (res.data) {
            setData(res.data);
            setIsLoading(false);
          }
        } else {
          const res = await getApi.getStaffList(id);
          if (res.data) {
            setData(res.data);
            setIsLoading(false);
          }
        }
      };
      fetchusers();
    } catch (error) {}
  }, [currentUserData]);

  const branchId = currentUserData && currentUserData.branch && currentUserData.branch.id
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ScrollView>
        <UserCard item={data ? data : []} id = {  branchId ? branchId : id} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserForm', {id: branchId ? branchId : id})}>
          <IconAdd name="add" style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
};

export default Users;
