import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import Loader from '../../utils/ActivityIndicator';
import {primaryColor, secondaryColor, styles} from '../../../style';
import Iconemail from 'react-native-vector-icons/Zocial';
import IconPhone from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBranch from 'react-native-vector-icons/Entypo';
import IconUser from 'react-native-vector-icons/FontAwesome5';
import IconLocation from 'react-native-vector-icons/Ionicons';
import IconWeekend from 'react-native-vector-icons/MaterialIcons';
import API_CONFIG from '../../config/apiConfig';
import getApi from '../../redux/slices/utils/getApi';
import moment from 'moment';

const UserDetailScreen = ({route}) => {
  const {userId} = route.params;

  const [loading, setLoading] = useState(false);
  var [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await getApi.getIndividualUser(userId);
        if (res) {
          let jsonData = res.data.user_data;
          setUserData(jsonData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.makeItCenter}>
        <View style={style.proImageName}>
        {userData.user_type == 'Staff' ? (
            <View
              style={
                userData.status == 'Not In Office'
                  ? style.statusIndicatorRed
                  : style.statusIndicatorGreen
              }></View>
          ) : null} 
          
            {userData && userData && userData.profile_image ? (
                <Image
                  source={{
                    uri: `${API_CONFIG.imageUrl}${
                      userData && userData && userData.profile_image
                        ? userData.profile_image
                        : null
                    }`,
                  }}
                 style={style.profileImage}
                />
              ) : (
                <Image
                  source={require('../../assests/userProfile.webp')}
                 style={style.profileImage}
                />
              )}
        </View>

        <Text style={styles.textHeading}>
          {userData && userData.first_name ? userData.first_name : 'User'}
          {userData && userData.last_name ? userData.last_name : 'Name'}
        </Text>
        <View style={style.statusUserTypeStyle}>
          <Text style={style.statusTextStyle}>
            {userData && userData.status ? userData.status : 'Status'}
          </Text>
          <Text style={style.separatorStyle}> | </Text>
          <Text style={style.statusTextStyle}>
            {userData && userData.user_type ? userData.user_type : 'User Type'}
          </Text>
          <Text style={style.separatorStyle}> | </Text>
          <Text style={style.statusTextStyle}>
            {moment(
              userData && userData.date_joined ? userData.date_joined : 'DOJ',
            ).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>

      <Text style={[styles.textSubHeading, {margin: 5}]}>Personal Details</Text>
      <View style={styles.textInput}>
        {userData && userData.email ? (
          <View style={style.rowStyle}>
            <View style={style.childCircleAvatar}>
              <Iconemail name="email" style={style.branchChildInfoIconStyle} />
            </View>
            <Text style={styles.lable}>{userData.email}</Text>
          </View>
        ) : null}
        {userData && userData.phone_number ? (
          <View style={style.rowStyle}>
            <View style={style.childCircleAvatar}>
              <IconPhone
                name="cellphone"
                style={style.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.lable}>{userData.phone_number}</Text>
          </View>
        ) : null}
        {userData && userData.gender ? (
          <View style={style.rowStyle}>
            <View style={style.childCircleAvatar}>
              <IconPhone
                name={
                  userData.gender == 'Male' ? 'gender-male' : 'gender-female'
                }
                style={style.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.lable}>{userData.gender}</Text>
          </View>
        ) : null}
        {userData && userData.address ? (
          <View style={style.rowStyle}>
            <View style={style.childCircleAvatar}>
              <IconLocation
                name="location"
                style={style.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.lable}>{userData.address}</Text>
          </View>
        ) : null}
      </View>

      {userData && userData.branch ? (
        <>
          <Text style={[styles.textSubHeading, {margin: 5}]}>Branch Info</Text>
          <View style={styles.textInput}>
            {userData && userData.branch && userData.branch.address ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconUser
                    name="user"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>{userData.branch.name}</Text>
              </View>
            ) : null}
            {userData && userData.branch && userData.branch.address ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconLocation
                    name="location"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>{userData.branch.address}</Text>
              </View>
            ) : null}
            {userData && userData.branch && userData.branch.city ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconPhone
                    name="home-city"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>{userData.branch.city}</Text>
              </View>
            ) : null}
          </View>
        </>
      ) : null}
      {userData && userData.branch ? (
        <>
          <Text style={styles.textSubHeading}>Week Off</Text>
          <View style={styles.textInput}>
            {userData && userData.week_off && userData.week_off.name ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconUser
                    name="user"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>{userData.week_off.name}</Text>
              </View>
            ) : null}
            {userData && userData.branch && userData.branch.address ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconLocation
                    name="location"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>{userData.branch.address}</Text>
              </View>
            ) : null}
            {userData && userData.week_off && userData.week_off.description ? (
              <View style={style.rowStyle}>
                <View style={style.childCircleAvatar}>
                  <IconPhone
                    name="subtitles-outline"
                    style={style.branchChildInfoIconStyle}
                  />
                </View>
                <Text style={styles.lable}>
                  {userData.week_off.description}
                </Text>
              </View>
            ) : null}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  proImageName: {
    alignItems: 'center',
  },

  makeItCenter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  separatorStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
  },

  statusUserTypeStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  statusTextStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },

  iconStyle: {
    fontSize: 18,
    alignSelf: 'center',
    paddingRight: 20,
    color: primaryColor,
  },

  circleAvatar: {
    height: 40,
    width: 40,
    backgroundColor: primaryColor,
    borderRadius: 50,

    justifyContent: 'center',
  },
  childCircleAvatar: {
    height: 25,
    width: 25,
    backgroundColor: primaryColor,
    borderRadius: 50,
    justifyContent: 'center',
  },
  branchChildInfoIconStyle: {
    fontSize: 13,
    color: 'white',
    alignSelf: 'center',
    padding: 6,
  },

  rowStyle: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    gap: 10,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: 'white',
  },

  status: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  statusIndicatorRed: {
    position: 'absolute',
    top: 5,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    lineHeight: 15,
  },
  statusIndicatorGreen: {
    position: 'absolute',
    top: 5,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'green',
    color: 'white',
    lineHeight: 15,
  },
});

export default UserDetailScreen;
