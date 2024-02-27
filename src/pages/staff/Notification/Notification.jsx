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

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await currentUser();
        console.log('res==>', res);
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
    console.log(status);
    // data && data.filter(item => item.status === 'Month').length
  };

  const renderData = ({item}) => {
    return (
      <ScrollView>
        <TouchableOpacity style={[styles.textInput, style.container]}>
          <View style={style.valueContainer}>
            {item.branch.image ? (
              <Image
                source={{uri: `${API_CONFIG.imageUrl}${item.branch.image}`}}
                style={style.image}
              />
            ) : (
              <Image
                source={require('../../../assests/userProfile.webp')}
                style={style.image}
              />
            )}
          </View>
          <View style={style.valueContainer}>
            <Text style={styles.lable}>{item.heading}</Text>
            <Text>
              {moment(item.created_date).format('DD MMM YYYY, hh : mm A')}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <View style={style.statusContainer}>
        <TouchableOpacity onPress={() => handleFilterData('All')}>
          <Text style={status === 'All' ? style.inactive : style.active}>
            All {`(${data && data.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Today')}>
          <Text style={status === 'Today' ? style.inactive : style.active}>
            Today
            {`(${
              data && data.filter(item => item.status === 'Today').length
            })`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Week')}>
          <Text style={status === 'Week' ? style.inactive : style.active}>
            Week
            {`(${
              data && data.filter(item => item.status === 'Week').length
            })`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Month')}>
          <Text style={status === 'Month' ? style.inactive : style.active}>
            Month
            {`(${
              data && data.filter(item => item.status === 'Month').length
            })`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterData('Year')}>
          <Text style={status === 'Year' ? style.inactive : style.active}>
            Year
            {`(${
              data && data.filter(item => item.status === 'Year').length
            })`}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderData}
        keyExtractor={item => item.id.toString()}
      />
    </>
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
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
  },
  valueContainer: {
    padding: 3,
  },
  active: {
    backgroundColor: primaryColor,
    paddingHorizontal: 12,
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
