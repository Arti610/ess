// import React from 'react';
// import {Text, View} from 'react-native';

// const Vlog = () => {
//   const videoList = [
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
//   ];
//   return (
//     <View>
//       <Text>Vlog Staff</Text>
//     </View>
//   );
// };

// export default Vlog;

// import React, {useRef} from 'react';
// import {View, StyleSheet, Animated, FlatList} from 'react-native';
// import Video from 'react-native-video';

// const Vlog = () => {
//   const videoUrls = [
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
//   ];

//   const scrollY = useRef(new Animated.Value(0)).current;

//   const renderItem = ({item}) => (
// <View style={styles.videoContainer}>
//   <Video
//     source={{uri: item}}
//     style={styles.video}
//     resizeMode="cover"
//     repeat
//   />
// </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <Animated.ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {y: scrollY}}}],
//           {useNativeDriver: true},
//         )}
//         decelerationRate={0.998}
//         snapToInterval={400} // Adjust this value to control the snap behavior
//         snapToAlignment="center"
//         bounces={true}>
//         {/* <View style={styles.scrollViewContent}>
//           <FlatList
//             data={videoUrls}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             contentContainerStyle={{paddingBottom: 100}} // Adjust bottom padding to avoid cut-off
//           />
//         </View> */}
//       {/* </Animated.ScrollView>  */}

//       <FlatList
//         data={videoUrls}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={{paddingBottom: 100}} // Adjust bottom padding to avoid cut-off
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingTop: 20, // Adjust top padding to avoid cut-off
//   },
//   videoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 400, // Adjust this value as per your video aspect ratio
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default Vlog;

import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import getApi from '../../../redux/slices/utils/getApi';
import Feather from 'react-native-vector-icons/Feather';
import {SkypeIndicator} from 'react-native-indicators';
import API_CONFIG from '../../../config/apiConfig';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {launchCamera} from 'react-native-image-picker';
import { styles } from '../../../../style';

const Vlog = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const {id} = route.params;
  const flatListRef = useRef();

  // console.log('id====', id);

  const [vlogData, setVlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  console.log('vlogData', vlogData);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const screenHeight = windowHeight - 60;

  const handleLaunchCamera = async () => {
    const options = {
      mediaType: 'video',
    };

    launchCamera(options, response => {
      console.log('response',response);     if (response.didCancel) {
        console.log('User cancelled the camera operation');
      } else if (response.error) {
        console.log('Camera Error:', response.error);
      } else if (response.assets) {
        navigation.navigate('UploadVlog', {video: response});
      }
    });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);
          if (res && res.data) {
            setUserData(res.data);
          }
          console.log('res =========', res.data.id);
          fetchData(res.data.id);
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchData = async id => {
      setLoading(true);
      try {
        const res = await getApi.getAllVlog(id);

        if (res.data) {
          setVlogData(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Vlog cannot be get', error);
      }
    };
    fetchCurrentUser();
    // fetchData();
  }, []);

  return (
    <>
      {/* <View style={{ width: "100%", height: "100%" }}> */}
      {/* <Text>qwertouu</Text> */}
      {/* <Video 
                    source={{ uri: 'http://192.168.29.155:8000/media/video_upload/rn_image_picker_lib_temp_ba668a20-d3c3-421e-acbd-6a4d5f5c7e02.mp4' }}
                    style={{ width: 300, height: 200 }}
                    //   controls={true}
                    autoplay
            /> */}

      {/* <Video
  source={{ uri: 'http://192.168.29.155:8000/media/video_upload/rn_image_picker_lib_temp_ba668a20-d3c3-421e-acbd-6a4d5f5c7e02.mp4' }}
  style={{ width: 300, height: 200 }}
  controls={true}


/> */}

      {/* <VideoPlayer
                    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                    videoWidth={1600}
                    videoHeight={900}

                    autoplay
                /> */}
      {/* </View> */}
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: 1,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Vlog dfgdfgdg
          </Text>
          <Feather
            name="camera"
            style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={handleLaunchCamera}
          />
        </View>

        {vlogData == null ? (
          <SkypeIndicator color={'white'} size={80} />
        ) : (
          <SwiperFlatList
            ref={flatListRef}
            data={vlogData && vlogData}
            vertical={true}
            renderItem={({item, i}) => (
              <>
                {console.log(`${API_CONFIG.baseURL}${item.video}`)}

                <View
                  style={{
                    height: screenHeight,
                    width: windowWidth,
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  key={i}>
                  {/* <View style={styles.videoContainer}> */}
                  <Video
                    source={{uri: `${API_CONFIG.baseURL}${item.video}`}}
                    style={styles.video}
                    resizeMode="cover"
                    repeat
                  />
                  {/* </View> */}

                  {/* <VideoPlayer key={i} video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} videoWidth={windowWidth} videoHeight={screenHeight} autoplay /> */}
                  {/* <VideoPlayer key={i} video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} videoWidth={windowWidth} videoHeight={screenHeight} autoplay /> */}
                </View>
              </>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Vlog;
