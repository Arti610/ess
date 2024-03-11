import React from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform, PermissionsAndroid } from 'react-native';
import API_CONFIG from '../../../config/apiConfig';
import { styles } from '../../../../style';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';

// Document component
const Document = ({ item }) => {

  const handleDownload = async () => {

    const granted = await getDownloadPermissionAndroid();

    if (granted) {
      downloadDocument(`${API_CONFIG.imageUrl}${item.document}`)
        .then(() => Alert.alert('Download Successful', 'File downloaded successfully'))
        .catch(() => Alert.alert('Download Failed', 'Failed to download file'));
    } else {
      Alert.alert('Permission Denied', 'Permission to download PDF was denied');
    }
  };

  return (
    <View style={[styles.textInput, {flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', margin : 10}]}>
      <View>
      <Text style={styles.lable}>{item.document_name}</Text>
      <Text>{moment(item.created_at).format('DD MMM YYYY')}</Text>
      </View>
      <TouchableOpacity onPress={handleDownload}>
        <Text style={styles.lable}><Icon name = 'download' style={{fontSize : 20}}/></Text>
      </TouchableOpacity>
    </View>
  );
};

// Function to request download permission on Android
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

// Function to download documents
const downloadDocument = async (url) => {
  // Get the app's cache directory
  const {  fs } = RNFetchBlob;
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

// Main Documents component
const Documents = ({ route }) => {

  const { data } = route.params;
  
  // Checking if data exists, if yes then render documents, else show loader
  return (
    data ?
      <View>
        <FlatList
          data={data.docs}
          renderItem={({ item }) => <Document item={item} />}
        />
      </View> : <Loader />
  );
};

export default Documents;
