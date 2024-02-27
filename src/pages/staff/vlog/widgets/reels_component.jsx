import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import SingleReel from './single_reel';
import API_CONFIG from '../../../../config/apiConfig';
import {useNavigation, useRoute} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import getApi from '../../../../redux/slices/utils/getApi';
import Loader from '../../../../utils/ActivityIndicator';

const ReelsComponent = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [vlogData, setVlogData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
    console.log('Index -========', index);
  };

  const dummyPosts = [
    {
      id: '2',
      video: 'http://192.168.29.155:8000/media/video_upload/5.mp4',
      description: 'Caption of the post',
      title: 'title here',
      likes: '245k',
      isLike: false,

      user: {
        profile_image: '/media/profile%20image/IMG_20240220_091232.jpg',
      },
    },
    {
      id: '1',
      video: 'http://192.168.29.155:8000/media/video_upload/5.mp4',
      description:
        'Hey there gig iu gg ogg igigfigffgigougigggf gigi uigbiu gyufyufuf tudty utcoucyxutyc ty cytcvhg kvku dfytkc kuyfkutdctu',
      title: 'title here',
      likes: '245k',
      isLike: false,
      user: {
        profile_image: '/media/profile%20image/IMG_20240220_091232.jpg',
      },
    },
    {
      id: '3',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
      description: 'Hola',
      title: 'title here',
      likes: '245k',
      isLike: false,
      user: {
        profile_image: '/media/profile%20image/IMG_20240220_091232.jpg',
      },
    },
    {
      id: '4',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
      description: 'Piano practice',
      title: 'title here',
      likes: '245k',
      isLike: false,
      user: {
        profile_image: '/media/profile%20image/IMG_20240220_091232.jpg',
      },
    },
    {
      id: '5',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
      description: 'Hello World!',
      title: 'title here',
      likes: '245k',
      isLike: false,
      user: {
        profile_image: '/media/profile%20image/IMG_20240220_091232.jpg',
      },
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        setLoading(true);

        const fetchData = async () => {
          const resString = await AsyncStorage.getItem('currentUser');

          const storage = JSON.parse(resString);

          // setUserData(res.data);
          // console.log('res =========', res.data.id);
          // fetchData(res.data.id);

          if (storage) {
            const res = await getApi.getAllVlog(storage.data.id);
            console.log(' user video -===============', storage.data.id);
            if (res.data != null) {
              console.log('length -=-=-=-=-=-=-=-', res.data.length);
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
            fontSize: 26,
          }}>
          Empty Data
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
    <Loader></Loader>
  );
};

export default ReelsComponent;
