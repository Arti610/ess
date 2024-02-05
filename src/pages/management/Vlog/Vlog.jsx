// import { useNavigation, useRoute } from "@react-navigation/native"
// import { useEffect, useRef, useState } from "react";
// import { Dimensions, FlatList, Text, View } from "react-native"
// import getApi from "../../../redux/slices/utils/getApi";
// import Feather from 'react-native-vector-icons/Feather'
// import { SkypeIndicator } from 'react-native-indicators';
// import API_CONFIG from "../../../config/apiConfig";
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';
// import SwiperFlatList from "react-native-swiper-flatlist";
// import { launchCamera } from "react-native-image-picker";


// const Vlog = () => {
//     const navigation = useNavigation();
//     const route = useRoute()
//     const { id } = route.params
//     const flatListRef = useRef()


//     const [vlogData, setVlogData] = useState(null)
//     const [loading, setLoading] = useState(false)

//     console.log('vlogData', vlogData);
//     const windowWidth = Dimensions.get('window').width
//     const windowHeight = Dimensions.get('window').height
//     const screenHeight = windowHeight - 60

//     const handleLaunchCamera = async () => {
//         const options = {
//             mediaType: 'video',
//         };

//         launchCamera(options, (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled the camera operation');
//             } else if (response.error) {
//                 console.log('Camera Error:', response.error);
//             } else if (response.assets) {
//                 navigation.navigate('UploadVlog', { video: response })
//             }
//         });
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             try {
//                 const res = await getApi.getAllVlog(id);

//                 if (res.data) {
//                     setVlogData(res.data)
//                     setLoading(false)
//                 }
//             } catch (error) {
//                 console.log('Vlog cannot be get', error);
//             }
//         }
//         fetchData()
//     }, [])

//     return (
//         <>

//             {/* <View style={{ width: "100%", height: "100%" }}> */}
//             {/* <Text>qwertouu</Text> */}
//             {/* <Video 
//                     source={{ uri: 'http://192.168.29.155:8000/media/video_upload/rn_image_picker_lib_temp_ba668a20-d3c3-421e-acbd-6a4d5f5c7e02.mp4' }}
//                     style={{ width: 300, height: 200 }}
//                     //   controls={true}
//                     autoplay
//             /> */}



//             {/* <Video
//   source={{ uri: 'http://192.168.29.155:8000/media/video_upload/rn_image_picker_lib_temp_ba668a20-d3c3-421e-acbd-6a4d5f5c7e02.mp4' }}
//   style={{ width: 300, height: 200 }}
//   controls={true}


// /> */}

//             {/* <VideoPlayer
//                     video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
//                     videoWidth={1600}
//                     videoHeight={900}

//                     autoplay
//                 /> */}
//             {/* </View> */}
//             <View style={{ width: windowWidth, height: windowHeight, position: 'relative' , backgroundColor: 'black'}}>
//                 <View style={{ position: 'absolute', top: 0, right: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1, padding: 20, alignItems: 'center' }}>
//                     <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Vlog</Text>
//                     <Feather name='camera' style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} onPress={handleLaunchCamera} />
//                 </View>

//                 {vlogData == null ? <SkypeIndicator color={'white'} size={80} /> :
//                     <SwiperFlatList
//                         ref={flatListRef}
//                         data={vlogData && vlogData}
//                         vertical={true} 
//                         renderItem={({ item, i }) => <>

//                             {console.log(`${API_CONFIG.imageUrl}${item.video}`)}

//                             <View style={{ height: screenHeight, width: windowWidth, alignItems: 'center', flex: 1, justifyContent: 'center' }} key={i}>
//                                 <VideoPlayer key={i} video={{ uri: 'http://192.168.29.155:8000/media/video_upload/rn_image_picker_lib_temp_ba668a20-d3c3-421e-acbd-6a4d5f5c7e02.mp4' }} videoWidth={windowWidth} videoHeight={screenHeight} autoplay />
//                                 <VideoPlayer key={i} video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} videoWidth={windowWidth} videoHeight={screenHeight} autoplay />
//                                 {/* <VideoPlayer key={i} video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} videoWidth={windowWidth} videoHeight={screenHeight} autoplay /> */}
//                             </View>
//                         </>

//                         }
//                     />}
//             </View>


//         </>
//     )
// }




// export default Vlog;

import React from "react";
import { Text, View } from "react-native";

const Vlog = ()=>{
    return(
        <View>
            <Text>Vlog</Text>
        </View>
    )
}

export default Vlog;