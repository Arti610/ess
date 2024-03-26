import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import createApi from '../../../redux/slices/utils/createApi';
import {styles} from '../../../../style';
import {Formik} from 'formik';
import RBSheet from 'react-native-raw-bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import VideoP from 'react-native-video';
import Toast from 'react-native-toast-message';
import ButtonLoader from '../../../utils/BtnActivityIndicator';

const ShowingVlog = () => {
  const route = useRoute();
  const {video} = route.params;
  const navigation = useNavigation();

  const refRBSheet = useRef();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialState = {
    title: null,
    description: null,
    thumbnail: null,
    video: null,
  };

  const handleImagePickerResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setImage(response);
    }
  };

  const handleChooseImage = async source => {
    const options = {
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if (source === 'camera') {
      launchCamera(options, handleImagePickerResponse);
    } else {
      launchImageLibrary(options, handleImagePickerResponse);
    }
  };

  const uploadVideo = async values => {
    setLoading(true);

    const fData = new FormData();
    if (image != null) {
      fData.append('thumbnail', {
        name: image == null ? '' : image.assets[0].fileName,
        type: image == null ? '' : image.assets[0].type,
        uri: image == null ? '' : image.assets[0].uri,
      });
    }

    fData.append('video', {
      name: video.assets[0].fileName ? video.assets[0].fileName : '',
      type: video.assets[0].type ? video.assets[0].type : '',
      uri: result == null ? '' : result,
    });

    fData.append('title', values.title ? values.title : '');
    fData.append('description', values.description ? values.description : '');

    console.log('fData', fData);

    try {
      const res = await createApi.uploadTask(fData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Task uploded successfully',
          text2: 'Congratulations, your task have been uploded successfully',
          autoHide: 400,
        });
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error.response.data);
      Toast.show({
        type: 'error',
        text1: 'Task not uploded, retry',
        text2: 'your task have not been uploded, try again',
        autoHide: 400,
      });
    }
  };

  return (
    <ScrollView>
      <Formik initialValues={initialState} onSubmit={uploadVideo}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          values,
          errors,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Task Title e.g. (Project Name)"
                onChangeText={handleChange('title')}
                value={values.title}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Description</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {textAlignVertical: 'top', textAlign: 'left'},
                ]}
                placeholder="Enter Task Description "
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('description')}
                value={values.description}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Thumbnail</Text>
              {image ? (
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <Image
                    style={[styles.textInput, {height: 150}]}
                    source={
                      image !== null
                        ? {
                            uri: image.assets[0].uri
                              ? image.assets[0].uri
                              : null,
                          }
                        : null
                    }
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={styles.textInput}>
                    <IconF5
                      name="image"
                      style={{fontSize: 100, textAlign: 'center'}}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                  container: {
                    height: 150,
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}>
                <View style={styles.launchImageOption}>
                  <TouchableOpacity
                    onPress={() => handleChooseImage('camera')}
                    style={styles.touchableOpacity}>
                    <Icon name="camera" style={styles.icon} />
                    <Text style={styles.lable}>Use Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleChooseImage('gallary')}
                    style={styles.touchableOpacity}>
                    <IconF5 name="images" style={styles.icon} />
                    <Text style={styles.lable}>Upload from Gallary</Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Video</Text>
              {video ? (
                <VideoP
                  style={[styles.textInput, {height: 200}]}
                  controls={false}
                  resizeMode="cover"
                  autoplay
                  source={
                    video !== null
                      ? {uri: video.assets[0].uri ? video.assets[0].uri : null}
                      : null
                  }
                />
              ) : null}
            </View>

            <View>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {loading ? <ButtonLoader /> : Submit}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ShowingVlog;
