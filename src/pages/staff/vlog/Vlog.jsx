// // import React from 'react';
// // import {Text, View} from 'react-native';

import {Text, View} from 'react-native';

// // const Vlog = () => {
// //   const videoList = [
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
// //   ];
// //   return (
// //     <View>
// //       <Text>Vlog Staff</Text>
// //     </View>
// //   );
// // };

// // export default Vlog;

// // import React, {useRef} from 'react';
// // import {View, StyleSheet, Animated, FlatList} from 'react-native';
// // import Video from 'react-native-video';

// // const Vlog = () => {
// //   const videoUrls = [
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
// //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
// //   ];

// //   const scrollY = useRef(new Animated.Value(0)).current;

// //   const renderItem = ({item}) => (
// // <View style={styles.videoContainer}>
// //   <Video
// //     source={{uri: item}}
// //     style={styles.video}
// //     resizeMode="cover"
// //     repeat
// //   />
// // </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {/* <Animated.ScrollView
// //         style={styles.scrollView}
// //         showsVerticalScrollIndicator={false}
// //         scrollEventThrottle={16}
// //         onScroll={Animated.event(
// //           [{nativeEvent: {contentOffset: {y: scrollY}}}],
// //           {useNativeDriver: true},
// //         )}
// //         decelerationRate={0.998}
// //         snapToInterval={400} // Adjust this value to control the snap behavior
// //         snapToAlignment="center"
// //         bounces={true}>
// //         {/* <View style={styles.scrollViewContent}>
// //           <FlatList
// //             data={videoUrls}
// //             renderItem={renderItem}
// //             keyExtractor={(item, index) => index.toString()}
// //             contentContainerStyle={{paddingBottom: 100}} // Adjust bottom padding to avoid cut-off
// //           />
// //         </View> */}
// //       {/* </Animated.ScrollView>  */}

// //       <FlatList
// //         data={videoUrls}
// //         renderItem={renderItem}
// //         keyExtractor={(item, index) => index.toString()}
// //         contentContainerStyle={{paddingBottom: 100}} // Adjust bottom padding to avoid cut-off
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   scrollViewContent: {
// //     paddingTop: 20, // Adjust top padding to avoid cut-off
// //   },
// //   videoContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: 400, // Adjust this value as per your video aspect ratio
// //   },
// //   video: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });

// // export default Vlog;

// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useEffect, useRef, useState} from 'react';
// import {Dimensions, FlatList, Text, View} from 'react-native';
// import getApi from '../../../redux/slices/utils/getApi';
// import Feather from 'react-native-vector-icons/Feather';
// import {SkypeIndicator} from 'react-native-indicators';
// import API_CONFIG from '../../../config/apiConfig';
// import Video from 'react-native-video';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// import {launchCamera} from 'react-native-image-picker';
// import {styles} from '../../../../style';

// const Vlog = () => {
//   const navigation = useNavigation();
//   // const route = useRoute();
//   // const {id} = route.params;
//   const flatListRef = useRef();

//   // console.log('id====', id);
//   const videos = [
//     {
//       description:
//         "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//       ],
//       subtitle: 'By Blender Foundation',
//       thumb: 'images/BigBuckBunny.jpg',
//       title: 'Big Buck Bunny',
//     },
//     {
//       description: 'The first Blender Open Movie from 2006',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//       ],
//       subtitle: 'By Blender Foundation',
//       thumb: 'images/ElephantsDream.jpg',
//       title: 'Elephant Dream',
//     },

//     ,
//     {
//       description:
//         'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//       ],
//       subtitle: 'By Google',
//       thumb: 'images/ForBiggerBlazes.jpg',
//       title: 'For Bigger Blazes',
//     },
//     {
//       description:
//         "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//       ],
//       subtitle: 'By Google',
//       thumb: 'images/ForBiggerEscapes.jpg',
//       title: 'For Bigger Escape',
//     },
//     {
//       description:
//         'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
//       ],
//       subtitle: 'By Google',
//       thumb: 'images/ForBiggerFun.jpg',
//       title: 'For Bigger Fun',
//     },
//     {
//       description:
//         'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
//       ],
//       subtitle: 'By Google',
//       thumb: 'images/ForBiggerJoyrides.jpg',
//       title: 'For Bigger Joyrides',
//     },
//     {
//       description:
//         "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
//       ],
//       subtitle: 'By Google',
//       thumb: 'images/ForBiggerMeltdowns.jpg',
//       title: 'For Bigger Meltdowns',
//     },
//     {
//       description:
//         'Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
//       ],
//       subtitle: 'By Blender Foundation',
//       thumb: 'images/Sintel.jpg',
//       title: 'Sintel',
//     },
//     {
//       description:
//         'Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
//       ],
//       subtitle: 'By Garage419',
//       thumb: 'images/SubaruOutbackOnStreetAndDirt.jpg',
//       title: 'Subaru Outback On Street And Dirt',
//     },
//     {
//       description:
//         'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
//       ],
//       subtitle: 'By Blender Foundation',
//       thumb: 'images/TearsOfSteel.jpg',
//       title: 'Tears of Steel',
//     },
//     {
//       description:
//         "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
//       ],
//       subtitle: 'By Garage419',
//       thumb: 'images/VolkswagenGTIReview.jpg',
//       title: 'Volkswagen GTI Review',
//     },
//     {
//       description:
//         'The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
//       ],
//       subtitle: 'By Garage419',
//       thumb: 'images/WeAreGoingOnBullrun.jpg',
//       title: 'We Are Going On Bullrun',
//     },
//     {
//       description:
//         'The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.',
//       video: [
//         'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
//       ],
//       subtitle: 'By Garage419',
//       thumb: 'images/WhatCarCanYouGetForAGrand.jpg',
//       title: 'What care can you get for a grand?',
//     },
//   ];

//   const videoRef = useRef(null);

//   const handleLoad = () => {
//     console.log("handle load");
//     // Play the video once it's loaded
//     videoRef.current?.play();

//   };
//   const [vlogData, setVlogData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({});

//   console.log('vlogData', vlogData);
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const screenHeight = windowHeight - 60;

//   const handleLaunchCamera = async () => {
//     const options = {
//       mediaType: 'video',
//     };

//     launchCamera(options, response => {
//       console.log('response', response);
//       if (response.didCancel) {
//         console.log('User cancelled the camera operation');
//       } else if (response.error) {
//         console.log('Camera Error:', response.error);
//       } else if (response.assets) {
//         navigation.navigate('UploadVlog', {video: response});
//       }
//     });
//   };

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const resString = await AsyncStorage.getItem('currentUser');
//         if (resString) {
//           const res = JSON.parse(resString);
//           if (res && res.data) {
//             setUserData(res.data);
//           }
//           console.log('res =========', res.data.id);
//           fetchData(res.data.id);
//         } else {
//           console.log('No user data found in AsyncStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     const fetchData = async id => {
//       setLoading(true);
//       try {
//         const res = await getApi.getAllVlog(id);

//         if (res.data) {
//           setVlogData(res.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.log('Vlog cannot be get', error);
//       }
//     };
//     fetchCurrentUser();
//     // fetchData();
//   }, []);

//   const [currentIndex, setCurrentIndex] = useState(null);
//   const videoRefs = useRef(new Array(videos.length).fill(null));

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     } else {
//       setCurrentIndex(null);
//     }
//   });

//   const renderItem = ({ item, index }) => (
//     <View >
//       {currentIndex === index ? (
//         <Video
//           ref={ref => (videoRefs.current[index] = ref)}
//           source={{ uri: item.video[0] }}

//           resizeMode="cover"
//           repeat
//           playInBackground={false}
//           paused={false}
//         />
//       ) : null}
//     </View>
//   );
//   return (
//     <>
//       <View
//         style={{
//           width: windowWidth,
//           height: windowHeight,
//           position: 'relative',
//           backgroundColor: 'black',
//         }}>
//         <View
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             left: 0,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             zIndex: 1,
//             padding: 20,
//             alignItems: 'center',
//           }}>
//           <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
//             Vlog dfgdfgdg
//           </Text>
//           <Feather
//             name="camera"
//             style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
//             onPress={handleLaunchCamera}
//           />
//         </View>

//         {vlogData == null ? (
//           <SkypeIndicator color={'white'} size={80} />
//         ) : (

//           // <SwiperFlatList
//           //   ref={flatListRef}
//           //   data={videos}
//           //   vertical={true}

//           //   renderItem={({item, i}) => (
//           //     <>
//           //       <View
//           //         style={{
//           //           height: screenHeight,
//           //           width: windowWidth,
//           //           alignItems: 'center',
//           //           flex: 1,
//           //           justifyContent: 'center',
//           //         }}
//           //         key={i}>
//           //         <Video
//           //           style={{
//           //             height: '100%',
//           //             width: '100%',

//           //           }}
//           //           controls={true}
//           //           autoplay={false}
//           //           playInBackground={false}
//           //           // source={{uri: `${API_CONFIG.imageUrl}${item.video}`}}
//           //           source={{uri: `${item.video[0]}`}}

//           //           resizeMode="cover"
//           //           repeat
//           //           paused={false}
//           //           onLoad={handleLoad}
//           //         />
//           //       </View>
//           //     </>
//           //   )}
//           // />
//           <SwiperFlatList
//           data={videos}
//           renderItem={renderItem}
//           onViewableItemsChanged={onViewableItemsChanged.current}
//           viewabilityConfig={{
//             viewAreaCoveragePercentThreshold: 50,
//           }}
//           index={currentIndex || 0}
//           onChangeIndex={({ index }) => setCurrentIndex(index)}
//           pagingEnabled
//           horizontal
//         />
//         )}
//       </View>
//     </>
//   );
// };

// export default Vlog;

const Vlog = () => {
  return (
    <View>
      <Text>Vlog</Text>
    </View>
  );
};

export default Vlog;
