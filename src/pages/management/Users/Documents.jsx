import React from 'react';
import {FlatList, Text, View, TouchableOpacity, Alert} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';
import API_CONFIG from '../../../config/apiConfig';
import {styles} from '../../../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


const Document = ({item}) => {
  const handleDownload = async () => {
    const granted = await getDownloadPermissionAndroid();

    if (granted) {
      downloadDocument(`${API_CONFIG.imageUrl}${item.document}`)
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Download Successful',
            text2: 'File downloaded successfully',
            autoHide: true,
          }),
        )
        .catch(() =>
          Toast.show({
            type: 'error',
            text1: 'Download Failed',
            text2: 'Failed to download file',
            autoHide: true,
          }),
        );
    } else {
      Alert.alert('Permission Denied', 'Permission to download PDF was denied');
    }
  };
  return (
    <View
      style={[
        styles.textInput,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        },
      ]}>
      <View>
        <Text style={styles.lable}>{item.document_name}</Text>
        <Text>{moment(item.created_at).format('DD MMM YYYY')}</Text>
      </View>
      <TouchableOpacity onPress={handleDownload}>
        <Text style={styles.lable}>
          <Icon name="download" style={{fontSize: 20}} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

const downloadDocument = async url => {
  // Get the app's cache directory
  const {fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded document
  const filename = url.split('/').pop();
  const filePath = `${cacheDir}/${filename}`;

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: filename.split('.').pop(),
      },
      android: {
        fileCache: true,
        path: filePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'File',
        },
      },
    });

    await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Return the path to the downloaded file
    return filePath;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Documents = ({route}) => {
  const {data} = route.params;

  return data ? (
    <>
      <FlatList
        data={data.docs ? data.docs : []}
        renderItem={({item}) => <Document item={item} />}
      />
      
    </>
  ) : (
    <Loader />
  );
};

export default Documents;
