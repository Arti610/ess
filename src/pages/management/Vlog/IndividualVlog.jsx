import React, { useRef } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Video from 'react-native-video';
import API_CONFIG from "../../../config/apiConfig";

const IndividualVlog = ({ item, index, currentIndex }) => {
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    const videoRef = useRef(null)

    const onBuffer = (buffer) => {
        console.log("buffering....", buffer);
    }
    const onError = (error) => {
        console.log("error....", error);
    }

console.log(`${API_CONFIG.imageUrl}${item.item.video}` );

   
    return (
       item && <TouchableOpacity style={{ height: windowWidth, width: windowHeight }}>
            <Video
                style={{ height: "100%", width: "100%", position: "absolute" }}
                ref={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                repeat={true}
                resizeMode='cover'
                paused={false}
                source={item.item.video && { uri: `${API_CONFIG.imageUrl}${item.item.video}` } }
            />
            {/* <Text style={{color: 'white'}}>{item.item.title}</Text> */}
        </TouchableOpacity>
    )
}

export default IndividualVlog;