import { useRoute } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import getApi from "../../../redux/slices/utils/getApi";
import Feather from 'react-native-vector-icons/Feather'
import SingleVlog from "./SingleVlog";
import { SkypeIndicator } from 'react-native-indicators';
import API_CONFIG from "../../../config/apiConfig";
import Video from 'react-native-video';
import SwiperFlatList from "react-native-swiper-flatlist";
import video1 from '../../../assests/videos/video1.mp4'
import video2 from '../../../assests/videos/video2.mp4'
import video3 from '../../../assests/videos/video3.mp4'
import { launchCamera } from "react-native-image-picker";
import ShowingVlog from "./ShwongVlog";
const Vlog = () => {

    const route = useRoute()
    const { id } = route.params
    const flatListRef = useRef()


    const [vlogData, setVlogData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState(null)
    console.log('video', video);

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    const screenHeight = windowHeight - 60

    const handleLaunchCamera = async () => {
        const options = {
            mediaType: 'video', // Specify that we want to record a video
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled the camera operation');
            } else if (response.error) {
                console.log('Camera Error:', response.error);
            } else if (response.assets) {
                console.log('Recorded video URI:', response.assets[0].uri);
                setVideo(response.assets[0].uri)
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await getApi.getAllVlog(id);

                if (res.data) {
                    setVlogData(res.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log('Vlog cannot be get', error);
            }
        }
        fetchData()
    }, [])

    return (
        <>

            <View style={{ width: windowWidth, height: windowHeight, position: 'relative', backgroundColor: "black" }}>
                <View style={{ position: 'absolute', top: 0, right: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1, padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Vlog</Text>
                    <Feather name='camera' style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} onPress={handleLaunchCamera} />
                </View>

                {/* {loading ? <SkypeIndicator color={'white'} size={80} /> : <SingleVlog vlogData={vlogData} />} */}


                {loading ? <SkypeIndicator color={'white'} size={80} /> : <SwiperFlatList
                    ref={flatListRef}
                    data={vlogData}
                    vertical={true}
                    renderItem={({ item, i }) => <>


                        <View style={{ height: screenHeight, width: windowWidth, alignItems: 'center', flex: 1, justifyContent: 'center' }} key={i}>
                            <Video source={item.video && { uri: `${API_CONFIG.imageUrl}${item.video}` }} style={{ height: screenHeight, width: windowWidth }} />
                        </View>
                    </>

                    }
                />}
            </View>

           
        </>
    )
}




export default Vlog;