import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import SingleReel from './single_reel';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApi from '../../../../redux/slices/utils/getApi';
import {SkypeIndicator} from 'react-native-indicators';
const ReelsComponent = ({id}) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [vlogData, setVlogData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setLoading(true);

        const fetchData = async () => {
          const resString = await AsyncStorage.getItem('currentUser');

          const storage = JSON.parse(resString);

          if (storage) {
            const res = await getApi.getAllVlog(
              storage.data.user_type == 'Management' ? id : storage.data.id,
            );

            if (res.data != null) {
              setVlogData(res.data);
            }
            setLoading(false);
          }
        };
        fetchData();
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return loading == false ? (
    vlogData.length == 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 18,
          }}>
          Video Not Uploded Yet
        </Text>
      </View>
    ) : (
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={vlogData}
        renderItem={({item, index}) => (
          <SingleReel item={item} index={index} currentIndex={currentIndex} />
        )}
        keyExtractor={(item, index) => item.id}
      />
    )
  ) : (
    <SkypeIndicator color={'#fff'} size={80} />
  );
};

export default ReelsComponent;
