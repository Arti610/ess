import React, { useState } from "react";
import { Text, View } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import IndividualVlog from "./IndividualVlog";

const SingleVlog = ({ vlogData }) => {
  
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangeIndexValue = (index) => {
     
        setCurrentIndex(index)
    }

    return (
        vlogData && <SwiperFlatList
            data={vlogData}
            vertical={true}
            onChangeIndex={handleChangeIndexValue}
            renderItem={(item, index) => <IndividualVlog item={item} index={index} currentIndex={currentIndex} />}
            keyExtractor={(item, index) => index}
        />
    )
}

export default SingleVlog