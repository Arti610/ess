import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import Video from 'react-native-video';
import API_CONFIG from '../../../config/apiConfig';
import { primaryColor } from '../../../../style';

const Vlog = ({route}) => {
  const {data} = route.params;

  return data ? (
   
      <FlatList
        data={data.task}
        renderItem={({item}) => (
          <View  style={{width: '95%',  margin : 10, backgroundColor : primaryColor, padding : 10}}>
            <Video
              source={{
                uri: `${API_CONFIG.imageUrl}${item.video}`,
              }}
              style={{width: '100%', height: 150}}
              controls={true}
              resizeMode="contain"
            />
            <Text style={{color:'white', paddingHorizontal : 10}}>{item.title}</Text>
          </View>
        )}
      />
  ) : (
    <Loader />
  );
};

export default Vlog;
