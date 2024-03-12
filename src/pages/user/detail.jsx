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

const UserDetailScreen = ({route}) => {
  const {userId} = route.params;

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

      <View>
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
            <Image
              source={{
                uri:
                  userData.profile_image == null
                    ? 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                    : `${API_CONFIG.imageUrl}${userData.profile_image}`,
              }}
              style={style.profileImage}
            />
          </View>

          <Text style={style.name}>
            {userData.first_name} {userData.last_name}
          </Text>
          <View style={style.statusUserTypeStyle}>
            <Text style={style.statusTextStyle}> {userData.status}</Text>
            <Text style={style.separatorStyle}> | </Text>
            <Text style={style.statusTextStyle}> {userData.user_type}</Text>
            <Text style={style.separatorStyle}> | </Text>
            <Text style={style.statusTextStyle}>
              {formatDate(userData.date_joined)}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.textSubHeading, {margin: 5}]}>Personal Details</Text>
      <View style={[styles.textInput, {paddingLeft: 20}]}>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <Iconemail name="email" style={style.branchChildInfoIconStyle} />
          </View>

          <Text style={styles.lable}>{userData.email}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconPhone
              name="cellphone"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>+ {userData.phone_number}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconPhone
              name={userData.gender == 'Male' ? 'gender-male' : 'gender-female'}
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>{userData.gender}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconLocation
              name="location"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>{userData.address}</Text>
        </View>
      </View>

      <Text style={[styles.textSubHeading, {margin: 5}]}>Branch Info</Text>
      <View style={styles.textInput}>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconUser name="user" style={style.branchChildInfoIconStyle} />
          </View>
          <Text style={styles.lable}>
            {userData.branch == null ? 'No Branch' : userData.branch.name}
          </Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconLocation
              name="location"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>{userData.branch.address}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconPhone
              name="home-city"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>{userData.branch.city}</Text>
        </View>
      </View>

      <Text style={styles.textSubHeading}>Week Off</Text>
      <View style={styles.textInput}>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconUser name="user" style={style.branchChildInfoIconStyle} />
          </View>
          <Text style={styles.lable}>{userData.week_off.name}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconLocation
              name="location"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>{userData.branch.address}</Text>
        </View>
        <View style={style.rowStyle}>
          <View style={style.childCircleAvatar}>
            <IconPhone
              name="subtitles-outline"
              style={style.branchChildInfoIconStyle}
            />
          </View>
          <Text style={styles.lable}>
            {userData.week_off.description == null
              ? 'No description'
              : userData.week_off.description}
          </Text>
        </View>
      </View>

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

  headerColumnStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    paddingVertical: 12,
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
  iconAddressStyle: {
    fontSize: 15,
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
  branchInfoRowStyle: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingTop: 13,
  },

  branchInfoTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    textAlign: 'center',
    paddingLeft: 10,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
