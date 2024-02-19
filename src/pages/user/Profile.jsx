import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconColor, primaryColor, secondaryColor, styles, textColor } from '../../../style';
import API_CONFIG from '../../config/apiConfig';
import IconEditProfile from 'react-native-vector-icons/FontAwesome5';
import IconLogoutUser from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import IconLogout from 'react-native-vector-icons/AntDesign'
import IconEdit from 'react-native-vector-icons/Entypo'
import Toast from 'react-native-toast-message';
import userApi from '../../redux/slices/users/userApi';
import { useDispatch } from 'react-redux';
import { logoutFailure, logoutStart, logoutSuccess } from '../../redux/slices/auth/authSlice';
import authApi from '../../redux/slices/auth/authApi';
import LogoutModal from '../../utils/LogoutModal';
import Loader from '../../utils/ActivityIndicator';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  }

  const handleLogout = async () => {
    try {
      dispatch(logoutStart())
      setLoading(true)
      const res = await authApi.Logout({ 'key': token });

      if (res.status === 200) {
        setLoading(false)
        navigation.navigate('Login')
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Logout successfully',
          text2: 'congratulation! you are logged out successfully',
          visibilityTime: 4000,
          autoHide: true,
        });
        try {
    
          await AsyncStorage.removeItem('currentUser');
          await AsyncStorage.removeItem('userEmail');
          await AsyncStorage.removeItem('token');

          await AsyncStorage.clear();
      
        } catch (error) {
          console.log('Error clearing AsyncStorage data:', error);
        }
        dispatch(logoutSuccess())
      }
    } catch (error) {
      setLoading(false)
      dispatch(logoutFailure())
    }
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setToken(token)
          console.log("token -=-=-=--=-=-=-",token)

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
        const resString = await AsyncStorage.getItem('currentUser');
        if (resString) {
          const res = JSON.parse(resString);
          if (res && res.data) {
            setCurrentUser(res.data);
          }
          console.log("res =========",res)
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (currentUser) {
          const res = await userApi.getUserById(currentUser.id);
          if (res.data) {
            setData(res.data);
            setIsLoading(false)
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <>
      {isLoading ? <Loader /> :
        <View style={pStyles.container}>
          <View style={pStyles.userHeader}>
            {data && data.profile_image ? (
              <Image source={{ uri: `${API_CONFIG.imageUrl}${data.profile_image ? data.profile_image : null}` }} style={pStyles.image} />
            ) : (
              <Image source={require('../../assests/userProfile.webp')} style={pStyles.image} />
            )}
            <View>
              <Text style={styles.textHeading}>{`${data && data.first_name ? data.first_name : 'User'} ${data && data.last_name ? data.last_name : "Name"}`}</Text>
              {/* <Text style={styles.lable}>{`${data && data.user_type ? data.user_type : 'Guest User'}`} </Text> */}
            </View>

          </View>
          {/* <View style={pStyles.userBody}>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.email ? data.email : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.gender ? data.gender : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.address ? data.address : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.designation.name ? data.designation.name : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.department.name ? data.department.name : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.manager.first_name ? data.manager.first_name : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.phone_number ? data.phone_number : null}</Text></View>
            <View style={{ fontSize: 14, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}><IconLogout name='tags' style={pStyles.iconStyles} /><Text>{data && data.date_joined ? data.date_joined : null}</Text></View>
          </View> */}
       
          <View style={pStyles.userFooter}>
            <TouchableOpacity onPress={() => navigation.navigate('UserDetailScreen', { userId: data && data.id ? data.id : currentUser.id })} style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile name='user-edit' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>My Profile</Text>
                  </View>
                  <IconEdit name='chevron-right' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { userId: data && data.id ? data.id : currentUser.id })} style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile name='user-edit' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>Edit Profile</Text>
                  </View>
                  <IconEdit name='chevron-right' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ChangePassword', { userId: data && data.id ? data.id : currentUser.id })} style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile name='user-edit' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>Change Password</Text>
                  </View>
                  <IconEdit name='chevron-right' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Leave')} style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile name='user-edit' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>My Leaves</Text>
                  </View>
                  <IconEdit name='chevron-right' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Timesheet')} style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile name='user-edit' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>My Attendance</Text>
                  </View>
                  <IconEdit name='chevron-right' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={pStyles.footerText} onPress={handleModalVisible}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconLogoutUser name='arrow-left' style={pStyles.logoutUserIcon} />
                    <Text style={pStyles.lable}>Logout</Text>
                  </View>
                  <IconLogout name='logout' style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
          </View>
        </View>}
      <LogoutModal modalVisible={modalVisible} handleModalVisible={handleModalVisible} handleLogout={handleLogout} loading={loading} />
      <Toast />
    </>
  );
};

export default Profile;

const pStyles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeader: {
    flex: 1,
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBody: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'start',
  },
  userFooter: {
    flex: 2,
    width: '100%',
    justifyContent: 'start',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 1,
    borderColor: '#D0D5DD',
    padding: 20,
    backgroundColor: '#FFF',
  },
  lable: {
    color: textColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600'
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
    padding: 15,
    borderRadius: 8,
  },

  leftFooterText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  footerTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    color: '#fff'
  }
});
