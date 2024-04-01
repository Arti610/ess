import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {primaryColor, styles, textColor} from '../../../../style';
import updateApi from '../../../redux/slices/utils/updateApi';
import getApi from '../../../redux/slices/utils/getApi';
import Loader from '../../../utils/ActivityIndicator';
import IconEditProfile from 'react-native-vector-icons/FontAwesome5';
import IconEdit from 'react-native-vector-icons/Entypo';
import API_CONFIG from '../../../config/apiConfig';
import DeleteModal from '../../../utils/DeleteModal';
import deleteApi from '../../../redux/slices/utils/deleteApi';

const UserProfile = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const {userData} = route.params;
  const {id} = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActiveVisible, setModalActiveVisible] = useState(false);

  const [data, setData] = useState(null);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleModalActiveVisible = () => {
    setModalActiveVisible(!modalActiveVisible);
  };

  const deactivateStaff = {
    status: 'Deactivated',
    is_active: false,
  };

  const activateStaff = {
    status: 'Not In Office',
    is_active: true,
  };

  const fetchData = async () => {
  
    try {
      const res = await getApi.getAllUserList(userData.id);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      let res;
      setLoading(true);
      if (userData.status === 'Deactivated') {
        res = await updateApi.updateUser(data.user.id, activateStaff);
        if (res.status === 200) {
          navigation.navigate('ActiveUser', {id : id})
          Toast.show({
            type: 'success',
            text1: `${userData.first_name} ${userData.last_name} activate successfully`,
            text2: `Congratulations, now you can use your credentials`,
            autoHide: true,
            visibilityTime: 4000,
          });
          setLoading(false);
        
        }
      } else {
        res = await updateApi.updateUser(data.user.id, deactivateStaff);
        if (res.status === 200) {
          navigation.navigate('InactiveUser', {id : id})
          Toast.show({
            type: 'success',
            text1: `${userData.first_name} ${userData.last_name} deactivate successfully`,
            text2: `Your credentials are deactivate now, you not be able to use credentials`,
            autoHide: true,
            visibilityTime: 4000,
          });
         
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('Error occurred during activate or deactivate user', error.response);
      Toast.show({
        type: 'error',
        text1: `you are not about to activate/deactivate your account, try again !`,
        autoHide: true,
        visibilityTime: 4000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteApi.deleteUser(data.user.id);
      
      if (res.status === 200) {
        navigation.navigate('Users')
        Toast.show({
          type: 'success',
          text1: `Account deleted successfully`,
          text2: `${userData.first_name} ${userData.last_name} account deleted successfully`,
          autoHide: 4000,
          position: 'top',
        });
       
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'error during delete account');
      Toast.show({
        type: 'error',
        text1: `Account were not deleted`,
        text2: `${userData.first_name} ${userData.last_name} account were not deleted, try again !`,
        autoHide: 4000,
        position: 'top',
      });
    }
  };

  return (
    <>
      {data ? (
        <View>
          <View style={pStyles.container}>
            {data ? (
              <>
                <View style={pStyles.userHeader}>
                  {data && data.user && data.user.profile_image ? (
                    <Image
                      source={{
                        uri: `${API_CONFIG.imageUrl}${
                          data && data.user && data.user.profile_image
                            ? data.user.profile_image
                            : null
                        }`,
                      }}
                      style={pStyles.image}
                    />
                  ) : (
                    <Image
                      source={require('../../../assests/userProfile.webp')}
                      style={pStyles.image}
                    />
                  )}
                  <View>
                    <Text style={styles.textHeading}>{`${
                      data && data.user && data.user.first_name
                        ? data.user.first_name
                        : 'User'
                    } ${
                      data && data.user && data.user.last_name
                        ? data.user.last_name
                        : 'Name'
                    }`}</Text>
                  </View>
                </View>
              </>
            ) : null}

            <View style={pStyles.userFooter}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserDetailScreen', {
                    userId:
                      data && data.user && data.user.id
                        ? data.user.id
                        : data.user.id,
                  })
                }
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="user-check"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Profile Details</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditUserForm', {
                    id: id,
                    userId: userData.id,
                  })
                }
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="pen"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Edit Profile</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('checkin/checkout', {
                    data: data,
                  })
                }
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="history"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Checkin/Checkout</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Leaves', {data: data})}
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="receipt"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Leave</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LateEarlys', {
                    data: data,
                  })
                }
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="clock"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Late/Early</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Documents', {data: data})}
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="file"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Document</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalActiveVisible(true)}
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="check-double"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>
                      {userData.status === 'Deactivated'
                        ? 'Activate Account'
                        : 'Deactivate Account'}
                    </Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={pStyles.footerText}>
                <View style={pStyles.footerTextView}>
                  <View style={pStyles.leftFooterText}>
                    <IconEditProfile
                      name="trash-alt"
                      style={pStyles.logoutUserIcon}
                    />
                    <Text style={pStyles.lable}>Delete Account</Text>
                  </View>
                  <IconEdit name="chevron-right" style={pStyles.iconStyles} />
                </View>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      ) : (
        <Loader />
      )}

      <DeleteModal
        text={'delete account'}
        isLoading={loading}
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        handleDelete={handleDelete}
      />
      <DeleteModal
        text={`${userData.status === 'Deactivated' ? 'activate' : 'deactivate'} account`}
        isLoading={loading}
        modalVisible={modalActiveVisible}
        handleModalVisible={handleModalActiveVisible}
        handleDelete={handleSubmit}
      />
      <Toast />
    </>
  );
};
    
export default UserProfile;

const pStyles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeader: {
    flex: 1,
    gap: 10,
    height: 50,
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
    backgroundColor: '#fff',
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
    padding: 15,
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
    fontWeight: 'bold'
  },
  logoutUserIcon: {
    backgroundColor: primaryColor,
    height: 30,
    width: 30,
    padding: 9,
    borderRadius: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight : 'bold'
  },
});
