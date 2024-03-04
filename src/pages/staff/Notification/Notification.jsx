import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {currentUser} from '../../../utils/currentUser';
import getApi from '../../../redux/slices/utils/getApi';
import Loader from '../../../utils/ActivityIndicator';
import {primaryColor, secondaryColor, styles} from '../../../../style';
import moment from 'moment';
import API_CONFIG from '../../../config/apiConfig';
import {useNavigation} from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await currentUser();

        if (res && res.data && res.data.branch && res.data.branch.id) {
          setId(res.data.branch.id);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchNotification = async () => {
        try {
          setLoading(true);
          const res = await getApi.getNotification(id);

          if (res.data) {
            setLoading(false);
            setData(res.data);
          }
        } catch (error) {
          console.log(error);
          //   setLoading(false);
        }
      };
      fetchNotification();
    }
  }, [id]);

  const handleFilterData = status => {
    setStatus(status);
  };

  const filterData = (status, data) => {
    const today = new Date();
    switch (status) {
      case 'Today':
        const todayStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        return data
          ? data.filter(
              item =>
                new Date(item.created_date) >= todayStart &&
                new Date(item.created_date) < today
            )
          : [];
      case 'Weekly':
        const weekStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay(),
        );
        return data
          ? data.filter(item => new Date(item.created_date) >= weekStart)
          : [];
      case 'Monthly':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return data
          ? data.filter(item => new Date(item.created_date) >= monthStart)
          : [];
      case 'Yearly':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        return data
          ? data.filter(item => new Date(item.created_date) >= yearStart)
          : [];
      default:
        return data ? data : [];
    }
  };


  const renderData = ({item}) => {
    return (
      
        <TouchableOpacity
          style={[styles.textInput, style.container]}
          onPress={() => navigation.navigate('NotificationDetails', {item})}>
          <View>
            {item.user.profile_image ? (
              <Image
                source={{
                  uri: `${API_CONFIG.imageUrl}${item.user.profile_image}`,
                }}
                style={style.image}
              />
            ) : (
              <Image
                source={require('../../../assests/userProfile.webp')}
                style={style.image}
              />
            )}
          </View>
          <View>
            <Text style={styles.lable}>{item.heading}</Text>
            <Text>
              {moment(item.created_date).format('DD MMM, YYYY hh : mm A')}
            </Text>
          </View>
        </TouchableOpacity>
      
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View  style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={style.statusContainer}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All ({data ? data.length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Today')}>
          <Text style={status === 'Today' ? style.inactive : style.active}>
            Today ({data ? filterData('Today', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Weekly')}>
          <Text style={status === 'Weekly' ? style.inactive : style.active}>
            Weekly ({data ? filterData('Weekly', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Monthly')}>
          <Text style={status === 'Monthly' ? style.inactive : style.active}>
            Monthly ({data ? filterData('Monthly', data).length : []})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Yearly')}>
          <Text style={status === 'Yearly' ? style.inactive : style.active}>
            Yearly ({data ? filterData('Yearly', data).length : []})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData(status, data)}
        style={{ paddingHorizontal: 10}}
        renderItem={renderData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<View style={{alignItems: 'center', paddingVertical: 100}}><Image height={20} width={20} source={require('../../../assests/no_notification.png')}/><Text style={styles.textHeading}>No Notification Yet</Text></View>}
      />
    </View>
  );
};

export default Notification;

const style = StyleSheet.create({
  statusContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 10
  },

  active: {
    backgroundColor: primaryColor,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 25,
    color: 'white',
    fontSize: 12,
  },
  inactive: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 25,
    color: 'black',
    fontSize: 12,
  },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
