import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import API_CONFIG from '../../../../config/apiConfig';
import Slider from '@react-native-community/slider';
import {SkypeIndicator} from 'react-native-indicators';

const SingleReel = ({item, index, currentIndex}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef(null);

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error this is On error single reelll', error);
  };

  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(true);

  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleVideoLoad = data => {
    setLoading(false);

    setDuration(data.duration);
  };

  const handleVideoProgress = data => {
    setCurrentPosition(data.currentTime);
    setDuration(data.seekableDuration);
  };

  const handleSeek = value => {
    setCurrentPosition(value);

    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };

  const formatSecondsToTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSeekComplete = () => {
    videoRef.current.seek(currentPosition);
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          onLoad={handleVideoLoad}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={{uri: `${API_CONFIG.imageUrl}${item.video}`}}
          muted={false}
          onLoadStart={handleLoadStart}
          onProgress={handleVideoProgress}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      </TouchableOpacity>

      {loading == true ? <SkypeIndicator color={'#fff'} size={80} /> : null}
      <View
        style={{
          position: 'absolute',
          width: windowWidth,
          zIndex: 1,
          bottom: 0,
          padding: 10,
        }}>
        <View style={{}}>
          <TouchableOpacity style={{width: 150}}>
            <View
              style={{
                width: 100,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  margin: 10,
                }}>
                <Image
                  source={{
                    uri:
                      item.user.profile_image == null
                        ? 'https://w7.pngwing.com/pngs/28/53/png-transparent-car-accident-demo-car-accident-butt-compact-car-vintage-car-car-thumbnail.png'
                        : `${API_CONFIG.imageUrl}${item.user.profile_image}`,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{flexDirection: 'row', paddingRight: 30, paddingTop: 20}}>
            <Slider
              style={{width: '100%'}}
              minimumValue={0}
              maximumValue={duration}
              value={currentPosition}
              onSlidingComplete={handleSeekComplete}
              onValueChange={handleSeek}
              disabled={false}
            />
            <Text style={{paddingRight: 13}}>
              {formatSecondsToTime(duration)}
            </Text>
          </View>
        </View>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
        }}>
        <TouchableOpacity onPress={() => setLike(!like)} style={{padding: 10}}>
          <AntDesign
            name={like ? 'heart' : 'hearto'}
            style={{color: like ? 'red' : 'white', fontSize: 25}}
          />
          <Text style={{color: 'white'}}>4B</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{padding: 10, paddingBottom: 30}}>
          <Ionic
            name="paper-plane-outline"
            style={{color: 'white', fontSize: 25}}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default SingleReel;