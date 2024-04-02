import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {primaryColor, styles, textColor} from '../../../style';
import API_CONFIG from '../../config/apiConfig';
import IconEditProfile from 'react-native-vector-icons/FontAwesome5';
import IconLogoutUser from 'react-native-vector-icons/FontAwesome5';
import IconLogout from 'react-native-vector-icons/AntDesign';
import IconEdit from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from '../../redux/slices/auth/authSlice';
import authApi from '../../redux/slices/auth/authApi';
import LogoutModal from '../../utils/LogoutModal';
import Loader from '../../utils/ActivityIndicator';
import getApi from '../../redux/slices/utils/getApi';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userDetails, setUserDetails] = useState(null);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      setLoading(true);
      const res = await authApi.Logout({key: token});

      if (res.status === 200) {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('currentUser');
          await AsyncStorage.removeItem('userEmail');
          await AsyncStorage.clear();
        } catch (error) {
          console.log('Error clearing AsyncStorage data:', error);
        }
        setLoading(false);
        setModalVisible(false);
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Logout successfully',
          text2: 'congratulation! you are logged out successfully',
          visibilityTime: 4000,
          autoHide: true,
        });
        dispatch(logoutSuccess());
      }
    } catch (error) {
      setLoading(false);
      dispatch(logoutFailure());
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setToken(token);
        } else {
          console.log('Token not found during logout AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching token for logout:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);

          if (res && res.data) {
            setCurrentUser(res.data);
            setLoading(false);
          }
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);
          setIsLoading(true);

          if (res) {
            setIsLoading(true);
            setCurrentUser(res.data);
            const resData = res.data;

            const id = resData.id;

            // // let res;
            const resDetail = await getApi.getIndividualUser(id);
            if (resDetail.data) {
              setData(resDetail.data);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching individual user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', fetchData);

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getApi.getAllUserList(currentUser.id);

          if (res.data) {
            setUserDetails(res.data);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  return (
    <>
      {isLoading && currentUser && currentUser.id ? (
        <Loader />
      ) : (
        <View style={pStyles.container}>
          {data ? (
            <View style={pStyles.userHeader}>
              {data && data.user_data && data.user_data.profile_image ? (
                <Image
                  source={{
                    uri: `${API_CONFIG.imageUrl}${
                      data && data.user_data && data.user_data.profile_image
                        ? data.user_data.profile_image
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
              <View>
                <Text style={styles.textHeading}>{`${
                  data && data.user_data && data.user_data.first_name
                    ? data.user_data.first_name
                    : 'User'
                } ${
                  data && data.user_data && data.user_data.last_name
                    ? data.user_data.last_name
                    : 'Name'
                }`}</Text>
              </View>
              <Text style={styles.lable}>
                {data && data.user_data && data.user_data.user_type
                  ? data.user_data.user_type
                  : null}
              </Text>
            </View>
          ) : null}

          <View style={pStyles.userFooter}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserDetailScreen', {
                  userId:
                    data && data.user_data && data.user_data.id
                      ? data.user_data.id
                      : data.user_data.id,
                })
              }
              style={pStyles.footerText}>
              <View style={pStyles.footerTextView}>
                <View style={pStyles.leftFooterText}>
                  <IconEditProfile
                    name="user-check"
                    style={pStyles.logoutUserIcon}
                  />
                  <Text style={pStyles.lable}>My Profile</Text>
                </View>
                <IconEdit name="chevron-right" style={pStyles.iconStyles} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile', {
                  userId:
                    data && data.user_data && data.user_data.id
                      ? data.user_data.id
                      : data.user_data.id,
                })
              }
              style={pStyles.footerText}>
              <View style={pStyles.footerTextView}>
                <View style={pStyles.leftFooterText}>
                  <IconEditProfile name="pen" style={pStyles.logoutUserIcon} />
                  <Text style={pStyles.lable}>Edit Profile</Text>
                </View>
                <IconEdit name="chevron-right" style={pStyles.iconStyles} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChangePassword', {
                  userId:
                    data && data.user_data && data.user_data.id
                      ? data.user_data.id
                      : data.user_data.id,
                })
              }
              style={pStyles.footerText}>
              <View style={pStyles.footerTextView}>
                <View style={pStyles.leftFooterText}>
                  <IconEditProfile name="key" style={pStyles.logoutUserIcon} />
                  <Text style={pStyles.lable}>Change Password</Text>
                </View>
                <IconEdit name="chevron-right" style={pStyles.iconStyles} />
              </View>
            </TouchableOpacity>

            {userDetails &&
            currentUser &&
            currentUser.user_type == 'Management' ? null : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    userDetails &&
                    currentUser &&
                    currentUser.user_type === 'Manager'
                      ? navigation.navigate('Leaves', {data: userDetails})
                      : navigation.navigate('LeaveRequest')
                  }
                  style={pStyles.footerText}>
                  <View style={pStyles.footerTextView}>
                    <View style={pStyles.leftFooterText}>
                      <IconEditProfile
                        name="th-list"
                        style={pStyles.logoutUserIcon}
                      />
                      <Text style={pStyles.lable}>My Leaves</Text>
                    </View>
                    <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('LateEarlys', {data: userDetails})
                  }
                  style={pStyles.footerText}>
                  <View style={pStyles.footerTextView}>
                    <View style={pStyles.leftFooterText}>
                      <IconEditProfile
                        name="th-list"
                        style={pStyles.logoutUserIcon}
                      />
                      <Text style={pStyles.lable}>My Late/Early</Text>
                    </View>
                    <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('checkin/checkout', {
                      data: userDetails,
                    })
                  }
                  style={pStyles.footerText}>
                  <View style={pStyles.footerTextView}>
                    <View style={pStyles.leftFooterText}>
                      <IconEditProfile
                        name="user-edit"
                        style={pStyles.logoutUserIcon}
                      />
                      <Text style={pStyles.lable}>Attendance hhh</Text>
                    </View>
                    <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Documents', {data: userDetails})
                  }
                  style={pStyles.footerText}>
                  <View style={pStyles.footerTextView}>
                    <View style={pStyles.leftFooterText}>
                      <IconEditProfile
                        name="file"
                        style={pStyles.logoutUserIcon}
                      />
                      <Text style={pStyles.lable}>My Document</Text>
                    </View>
                    <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                  </View>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={pStyles.footerText}
              onPress={handleModalVisible}>
              <View style={pStyles.footerTextView}>
                <View style={pStyles.leftFooterText}>
                  <IconLogoutUser
                    name="arrow-left"
                    style={pStyles.logoutUserIcon}
                  />
                  <Text style={pStyles.lable}>Logout</Text>
                </View>
                <IconLogout name="logout" style={pStyles.iconStyles} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <LogoutModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        handleLogout={handleLogout}
        loading={loading}
      />
      <Toast />
    </>
  );
};

export default Profile;

const pStyles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userHeader: {
    gap: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  userFooter: {
    height: 'fit-content',
    width: '100%',
    justifyContent: 'start',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 1,
    borderColor: '#D0D5DD',
    padding: 10,
    backgroundColor: '#FFF',
  },

  lable: {
    color: textColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },

  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },

  leftFooterText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  footerTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconStyles: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: 400,
  },
  logoutUserIcon: {
    backgroundColor: primaryColor,
    height: 30,
    width: 30,
    padding: 9,
    borderRadius: 15,
    textAlign: 'center',
    color: '#fff',
  },
});
