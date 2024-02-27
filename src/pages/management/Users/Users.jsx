import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import {secondaryColor, styles, textColor} from '../../../../style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import userApi from '../../../redux/slices/users/userApi';
import API_CONFIG from '../../../config/apiConfig';
import Toast from 'react-native-toast-message';
import Loader from '../../../utils/ActivityIndicator';
import UserCard from '../../../utils/UserCard';

const Users = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setIsLoading(true);
        const fetchusers = async () => {
          const res = await userApi.getBranchUsers(id);
          if (res.status === 200) {
            setData(res.data);
            setIsLoading(false);
          }
        };
        fetchusers();
      } catch (error) {
        setIsLoading(false);
      }
    });
    return unsubscribe
  }, [navigation]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ScrollView>
        <UserCard item={data} id={id} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserForm', {id: id})}>
          <IconAdd name="add" style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <Toast />
    </>
  );
};

export default Users;
