import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import userApi from '../../redux/slices/users/userApi';
import {useEffect, useRef, useState} from 'react';

import Loader from '../../utils/ActivityIndicator';
import {primaryColor, secondaryColor} from '../../../style';
import Iconemail from 'react-native-vector-icons/Zocial';

import IconPhone from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAddress from 'react-native-vector-icons/FontAwesome';
import IconBranch from 'react-native-vector-icons/Entypo';
import IconUser from 'react-native-vector-icons/FontAwesome5';
import IconLocation from 'react-native-vector-icons/Ionicons';
import IconWeekend from 'react-native-vector-icons/MaterialIcons';
import API_CONFIG from '../../config/apiConfig';

const UserDetailScreen = ({route}) => {
  const {userId} = route.params;
  //   const { address, branch, phone_number, profile_image, status, user_type, week_off } = data;
  console.log('userID =====', userId);

  const [loading, setLoading] = useState(false);
  var [userData, setUserData] = useState({});

  const formatDate = datetimeString => {
    const date = new Date(datetimeString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      console.log('userData-------', userData);
      try {
        console.log('fetching user ');

        const res = await userApi.getUserById(userId);
        if (res) {
          let jsonData = res.data.user_data;
          // setSelectedGender(res?.data?.gender || '');
          console.log('user data ========', jsonData);
          setUserData(jsonData);
        }

        // setUserData(setUserData = res.user_data);

        // console.log("user data 2 ========",userData);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          {userData.user_type == 'Management' ? null : (
            <View
              style={
                userData.status == 'Not In Office'
                  ? styles.statusIndicatorRed
                  : styles.statusIndicatorGreen
              }></View>
          )}
          <Image
            source={{
              uri:
                userData.profile_image == null
                  ? 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                  : `${API_CONFIG.imageUrl}${userData.profile_image}`,
            }}
            style={styles.profileImage}
          />
        </View>
        {/* <View style={styles.statusBadge}> </View> */}
        <Text style={styles.name}>
          {userData.first_name} {userData.last_name}
        </Text>
        <View style={styles.statusUserTypeStyle}>
          <Text style={styles.statusTextStyle}> {userData.status}</Text>
          <Text style={styles.separatorStyle}> | </Text>
          <Text style={styles.statusTextStyle}> {userData.user_type}</Text>
          <Text style={styles.separatorStyle}> | </Text>
          <Text style={styles.statusTextStyle}>
            {formatDate(userData.date_joined)}
          </Text>
        </View>

        <View style={styles.headerColumnStyle}>
          <View style={styles.rowStyle}>
            <View style={styles.childCircleAvatar}>
              <Iconemail name="email" style={styles.branchChildInfoIconStyle} />
            </View>

            <Text style={styles.headerTextStyle}>{userData.email}</Text>
          </View>
          <View style={styles.rowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconPhone
                name="cellphone"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.headerTextStyle}>
              + {userData.phone_number}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconPhone
                name={
                  userData.gender == 'Male' ? 'gender-male' : 'gender-female'
                }
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.headerTextStyle}>{userData.gender}</Text>
          </View>
          <View style={styles.rowStyle}>
            {/* <IconLocation name="location" style={styles.iconAddressStyle} /> */}
            <View style={styles.childCircleAvatar}>
              <IconLocation
                name="location"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.headerTextStyle}>{userData.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />

      {userData.branch == null ? (
        <Loader />
      ) : (
        <View style={styles.branchInfo}>
          <View style={styles.rowStyle}>
            <View style={styles.circleAvatar}>
              <IconBranch
                name="flow-branch"
                style={styles.branchInfoIconStyle}
              />
            </View>
            <Text style={styles.branchInfoTextStyle}> Branch Info</Text>
          </View>

          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconUser name="user" style={styles.branchChildInfoIconStyle} />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.branch == null ? 'No Branch' : userData.branch.name}
            </Text>
          </View>
          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconLocation
                name="location"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.branch.address}
            </Text>
          </View>
          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconPhone
                name="home-city"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.branch.city}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.divider} />

      {userData.week_off == null ? (
        <Loader />
      ) : (
        <View style={styles.branchInfo}>
          <View style={styles.rowStyle}>
            <View style={styles.circleAvatar}>
              <IconWeekend name="weekend" style={styles.branchInfoIconStyle} />
            </View>
            <Text style={styles.branchInfoTextStyle}> Week Off</Text>
          </View>

          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconUser name="user" style={styles.branchChildInfoIconStyle} />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.week_off.name}
            </Text>
          </View>
          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconLocation
                name="location"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.branch.address}
            </Text>
          </View>
          <View style={styles.branchInfoRowStyle}>
            <View style={styles.childCircleAvatar}>
              <IconPhone
                name="subtitles-outline"
                style={styles.branchChildInfoIconStyle}
              />
            </View>
            <Text style={styles.branchInfoChildTextStyle}>
              {userData.week_off.description == null
                ? 'No description'
                : userData.week_off.description}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  headerColumnStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent:'flex-start'
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
    // backgroundColor: 'red',
    paddingVertical: 12,
  },
  statusTextStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },

  iconStyle: {
    fontSize: 18,
    // alignContent:'center',
    // justifyContent:'center',
    alignSelf: 'center',
    paddingRight: 20,
    color: primaryColor,
  },
  iconAddressStyle: {
    fontSize: 15,
    // alignContent:'center',
    // justifyContent:'center',
    alignSelf: 'center',
    paddingRight: 20,
    color: primaryColor,
  },
  branchInfoIconStyle: {
    fontSize: 24,
    color: 'white',

    alignSelf: 'center',
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
    // paddingRight: 10,
  },
  branchChildInfoIconStyle: {
    fontSize: 13,
    color: 'white',

    alignSelf: 'center',
    padding: 6,
  },

  rowStyle: {
    //  backgroundColor:'red',
    //  height:50,
    //  width:'100%',
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  branchInfoRowStyle: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingTop: 13,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: primaryColor,
    textAlign: 'center',
    paddingLeft: 10,
  },
  branchInfoTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: primaryColor,
    textAlign: 'center',
    paddingLeft: 10,
  },
  branchInfoChildTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: primaryColor,
    textAlign: 'center',
    paddingLeft: 10,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: secondaryColor,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 13,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: primaryColor,
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: primaryColor,
    marginBottom: 20,
  },
  verticleDivider: {
    height: 20,
    width: 2,
    backgroundColor: primaryColor,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  branchInfo: {
    marginBottom: 20,
    backgroundColor: secondaryColor,
    borderRadius: 8,
    padding: 20,
  },
  branchAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  branchStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  branchType: {
    fontSize: 16,
    marginBottom: 10,
  },
  weekOff: {
    marginBottom: 20,
    backgroundColor: secondaryColor,
    borderRadius: 8,
    padding: 20,
  },
  weekOffName: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  weekOffDescription: {
    fontSize: 16,
  },
  statusIndicatorRed: {
    position: 'absolute',
    top: 5,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'red', // You can customize the badge color
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
    backgroundColor: 'green', // You can customize the badge color
    color: 'white',

    lineHeight: 15,
  },
});

export default UserDetailScreen;

const CardWithIcon = ({iconSource, text}) => {
  return (
    <View style={styles.card}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
