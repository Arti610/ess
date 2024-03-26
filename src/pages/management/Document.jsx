import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconD from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import API_CONFIG from '../../config/apiConfig';
import {styles} from '../../../style';
import NotFound from '../../utils/NotFound';
import getApi from '../../redux/slices/utils/getApi';
import {currentUser} from '../../utils/currentUser';
import Toast from 'react-native-toast-message';
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../utils/ActivityIndicator';
import DeleteModal from '../../utils/DeleteModal';
import deleteApi from '../../redux/slices/utils/deleteApi';

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

const Document = ({route}) => {
  const {id} = route.params;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [Id, setId] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getApi.getAllDocumentList();

        if (res) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await currentUser();
      setCurrentUserData(res.data);
    };
    fetchCurrentUser();
  }, []);

  const handleDownload = async document => {
    const granted = await getDownloadPermissionAndroid();

    if (granted) {
      downloadDocument(`${API_CONFIG.imageUrl}${document}`)
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

  const handleModalVisible = id => {
    setModalVisible(!modalVisible);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await deleteApi.deleteDocUpload(Id);

      if (res.status === 200) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          text1: `Document deleted successfully`,
          position: 'top',
          visibilityTime: 4000,
          autoHide: true,
        });
        fetchUser();
      }
    } catch (error) {
      console.log(error, 'error');
      Toast.show({
        type: 'error',
        text1: `Document not deleted, try again`,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    setModalVisible(false);
    setIsLoading(false);
  };

  return (
    <>
      {data ? (
        <>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View
                style={[
                  styles.textInput,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginTop: 5,
                  },
                ]}>
                <View>
                  {currentUserData &&
                  currentUserData.user_type === 'Staff' ? null : item ? (
                    <View style={pStyles.userHeader}>
                      {item && item.user && item.user.profile_image ? (
                        <Image
                          source={{
                            uri: `${API_CONFIG.imageUrl}${
                              item && item.user && item.user.profile_image
                                ? item.user.profile_image
                                : null
                            }`,
                          }}
                          style={pStyles.image}
                        />
                      ) : (
                        <Image
                          source={require('../../assests/userProfile.webp')}
                          style={pStyles.image}
                        />
                      )}

                      <Text>{`${
                        item && item.user && item.user.first_name
                          ? item.user.first_name
                          : 'User'
                      } ${
                        item && item.user && item.user.last_name
                          ? item.user.last_name
                          : 'Name'
                      }`}</Text>
                    </View>
                  ) : null}

                  <Text style={styles.lable}>{item.document_name}</Text>
                  <Text>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <TouchableOpacity
                    onPress={() => handleDownload(item.document)}
                    style={styles.textInput}>
                    <Text style={styles.lable}>
                      <Icon name="download" style={{fontSize: 20}} />
                    </Text>
                  </TouchableOpacity>
                  {currentUserData &&
                    currentUserData.user_type === 'Staff' ? null : (
                      <TouchableOpacity
                        onPress={() => handleModalVisible(item.id)}
                        style={styles.textInput}>
                        <Text style={styles.lable}>
                          <IconD name="delete" style={{fontSize: 20}} />
                        </Text>
                      </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={<NotFound />}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDocument', {id: id})}>
              <IconAdd name="add" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Loader />
      )}
      <Toast />
      <DeleteModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        text="delete document"
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default Document;

const pStyles = StyleSheet.create({
  image: {
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userHeader: {
    flex: 1,
    gap: 10,
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
});
