import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import Loader from '../../utils/ActivityIndicator';
import {primaryColor,  styles} from '../../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_CONFIG from '../../config/apiConfig';
import getApi from '../../redux/slices/utils/getApi';
import moment from 'moment';

const UserDetailScreen = ({route}) => {
  const {userId} = route.params;

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await getApi.getAllUserList(userId);
        if (res) {
          let jsonData = res.data;
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
          {userData && userData.user && userData.user.user_type == 'Staff' ? (
            <View
              style={
                userData.user.status == 'Not In Office'
                  ? style.statusIndicatorRed
                  : style.statusIndicatorGreen
              }></View>
          ) : null}

          {userData && userData.user && userData.user.profile_image ? (
            <Image
              source={{
                uri: `${API_CONFIG.imageUrl}${
                  userData && userData.user && userData.user.profile_image
                    ? userData.user.profile_image
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
          {userData && userData.user && userData.user.first_name
            ? userData.user.first_name
            : 'User'}
          &nbsp;
          {userData && userData.user && userData.user.last_name
            ? userData.user.last_name
            : 'Name'}
        </Text>
     
        <View style={style.statusUserTypeStyle}>
          <View
            style={[
              styles.textInput,
              {alignItems: 'center', justifyContent: 'center', width: 100},
            ]}>
            <Text>{userData.attendance_count ? userData.attendance_count : 0}</Text>
            <Text style={styles.lable}>Attendence</Text>
          </View>
          <View style={[styles.textInput,{alignItems: 'center', justifyContent: 'center', width: 100} ]}>
            <Text>{userData.leaves_count ? userData.leaves_count : 0}</Text>
            <Text style={styles.lable}>Leave</Text>
          </View>
          <View
            style={[
              styles.textInput,
              {alignItems: 'center', justifyContent: 'center', width: 100},
            ]}>
            <Text>
              {userData &&
              userData.monthly_salary &&
              userData.monthly_salary.length > 0
                ? userData.monthly_salary[0].total_salary
                : 0}
            </Text>
            <Text style={styles.lable}>Salary</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.textSubHeading, {margin: 5}]}>
        Personal Information
      </Text>
      <View style={styles.textInput}>
        {userData && userData.user && userData.user.status ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Status : {userData && userData.user && userData.user.status ? userData.user.status : null}
            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.user_type ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>User Type : {userData && userData.user && userData.user.user_type  ? userData.user.user_type  : null}</Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.gender ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Gender : {userData && userData.user && userData.user.gender ? userData.user.gender : null}
            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.date_joined ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Date Of Joining : {userData && userData.user && userData.user.date_joined ? moment(userData.user.date_joined).format('DD MMM YYYY') : null}
            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.department ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Department : {userData && userData.user &&  userData.user.department && userData.user.department.name  ? userData.user.department.name : null}
            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.designation ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Designation : {userData && userData.user && userData.user.designation && userData.user.designation.name ? userData.user.designation.name : null}
            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.branch ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Branch Name : {userData && userData.user && userData.user.branch && userData.user.branch.name  ? userData.user.branch.name : null}</Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.user_type === 'Staff' ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Manager : {userData && userData.user && userData.user.manager && userData.user.manager.first_name ? `${userData.user.manager.first_name} ${userData.user.manager.last_name}` : null}

            </Text>
          </View>
        ) : null}
        {userData && userData.user && userData.user.week_off ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Week Off : {userData && userData.user && userData.user.week_off &&  userData.user.week_off.name ? userData.user.week_off.name : null}
            </Text>
          </View>
        ) : null}
      </View>

      <Text style={[styles.textSubHeading, {margin: 5}]}>Contact Information</Text>
      <View style={styles.textInput}>
        {userData && userData.user && userData.user.email ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Email : {userData && userData.user && userData.user.email ? userData.user.email : null}</Text>
          </View>
        ) : null}
          
       {userData && userData.user && userData.user.phone_number ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Phone Number : {userData && userData.user && userData.user.phone_number ? userData.user.phone_number : null}</Text>
          </View>
        ) : null}

        {userData && userData.user && userData.user.address ? (
          <View style={style.rowStyle}>
            <Icon name="tags" style={style.branchChildInfoIconStyle} />
            <Text style={styles.lable}>Address : {userData && userData.user && userData.user.address ? userData.user.address : null}</Text>
          </View>
        ) : null}
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
    marginTop: 10,
    gap: 5,
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
    color: primaryColor,
    alignSelf: 'center',
    padding: 6,
  },

  rowStyle: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    // padding: 5,
    gap: 2,
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
