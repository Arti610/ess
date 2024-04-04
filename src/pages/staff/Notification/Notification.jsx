import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {primaryColor, secondaryColor, styles} from '../../../../style';

import API_CONFIG from '../../../config/apiConfig';
import {useNavigation} from '@react-navigation/native';
import {currentUser} from '../../../utils/currentUser';
import getApi from '../../../redux/slices/utils/getApi';
import Loader from '../../../utils/ActivityIndicator';

const Notification = () => {
  const navigation = useNavigation();

  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);

  const [currentUserData, setCurrentUserData] = useState(null);
  const userID =
    currentUserData && currentUserData.id ? currentUserData.id : null;
  const [data, setData] = useState([]);

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

  const fetchUserNotification = async () => {
    try {
      setLoading(true);
      const res = await getApi.getUserNotification(userID);

      if (res.data) {
        setLoading(false);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserNotification();
  }, [userID]);

  const handleFilterData = status => {
    setStatus(status);
  };

  const filterData = (status, data) => {
    switch (status) {
      case 'Read':
        return data.filter(item => item.is_seen === true);
      case 'Unread':
        return data.filter(item => item.is_seen === false);
      case 'All':
        return data;
      default:
        return [];
    }
  };

  const handleSeen = async item => {
    const payload = {is_seen: true};

    try {
      const res = await getApi.getNotificationSeen(item.id, payload);
      if (res) {
        navigation.navigate(item.content_utl, {
          id: item.staff === null ? item.user.branch : item.staff.branch,
        });
      }
    } catch (error) {
      console.log(error, 'error during seen notifications');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        fetchUserNotification();
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation, data]);


  const renderData = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.textInput,
          style.container,
          {
            backgroundColor: item.is_seen === false ? secondaryColor : '#fff',
          },
        ]}
        onPress={() => handleSeen(item)}>
        <View>
          {item ? (
            <Image
              source={{
                uri: `${API_CONFIG.imageUrl}${
                  item.staff != null
                    ? item.staff.profile_image
                    : currentUserData.profile_image
                }`,
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
          <Text style={styles.lable}>{item.content}</Text>
          <Text>{`${item.created_at_formatted} ago`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <View style={style.statusContainer}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All ({data ? data.length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Read')}>
          <Text style={status === 'Read' ? style.inactive : style.active}>
            Read ({data ? filterData('Read', data).length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Unread')}>
          <Text style={status === 'Unread' ? style.inactive : style.active}>
            Unread ({data ? filterData('Unread', data).length : 0})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData(status, data)}
        style={{paddingHorizontal: 10}}
        renderItem={renderData}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{alignItems: 'center', paddingVertical: 100}}>
            <Image
              height={20}
              width={20}
              source={require('../../../assests/no_notification.png')}
            />
            <Text style={styles.textHeading}>No Notification Yet</Text>
          </View>
        }
      />
    </>
  );
};

export default Notification;

const style = StyleSheet.create({
  icon: {
    color: 'green',
    fontSize: 50,
  },
  statusContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 10,
    width: '100%',
  },

  active: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: primaryColor,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 25,
    color: 'white',
    fontSize: 12,
  },
  inactive: {
    width: '100%',
    textAlign: 'center',
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
