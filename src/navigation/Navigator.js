import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/auth/Login.jsx';
import ForgetPassword from '../pages/auth/ForgetPassword.jsx';
import OtpVerification from '../pages/auth/OtpVerification.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';
import Confirmation from '../pages/auth/Confirmation.jsx';
import Home from '../pages/home/Home.jsx';
import Splash from '../utils/Splash.jsx';
import Base from '../pages/home/Base.jsx';
import AddBranch from '../pages/home/Branch/AddBranch.jsx';
import EditProfile from '../pages/user/EditProfile.jsx';
import Profile from '../pages/user/Profile.jsx';
import { Text, View } from 'react-native';
import { styles } from '../../style.js';
import AddBranchInfo from '../pages/home/Branch/AddBranchInfo.jsx';
import DashboardBase from '../pages/management/DashboardBase.js';
import UserForm from '../pages/management/Users/UserForm.jsx';
import UserProfile from '../pages/management/Users/UserProfile.jsx';
import ChangePassword from '../pages/user/ChangePassword.jsx';
import EditUserForm from '../pages/management/Users/EditUserForm.jsx';
import ShowingVlog from '../pages/management/Vlog/ShwongVlog.jsx';
import ActiveUser from '../pages/management/Home/ActiveUser.jsx';
import CheckInUser from '../pages/management/Home/CheckInUser.jsx';
import NotCheckInUser from '../pages/management/Home/NotCheckInUser.jsx';
import LeaveRequest from '../pages/management/Home/LeaveRequest.jsx';
import LateEarly from '../pages/management/Home/LateEarly.jsx';
import InactiveStaff from '../pages/management/Home/InactiveStaff.jsx';
import StaffDashboard from '../pages/staff/StaffDashboard.jsx';
import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx';

const Stack = createNativeStackNavigator();

const Navigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true}} initialRouteName='Splash'>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Base" component={Base} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot Password" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="OTP Verification" component={OtpVerification} options={{ headerShown: false }} />
          <Stack.Screen name="Reset Password" component={ResetPassword}options={{ headerShown: false }}  />
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddBranch" component={AddBranch} options={{ headerTitle: () => <View><Text style={styles.textSubHeading}>Branch</Text></View> }} />
          <Stack.Screen name="AddBranchInfo" component={AddBranchInfo} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>BranchInfo</Text></View> }} />
          <Stack.Screen name='Profile' component={Profile} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Profile</Text></View> }} />
          <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Edit Profile</Text></View> }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Change Password</Text></View> }} />
          <Stack.Screen name='DashboardBase' component={DashboardBase} options={{headerShown: false}} />
          <Stack.Screen name='StaffBase' component={StaffDashboard} options={{headerShown: false}} />
          <Stack.Screen name='ManagerBase' component={ManagerDashboard} options={{headerShown: false}} />
          <Stack.Screen name='UserForm' component={UserForm}  options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Add User</Text></View> }} />
          <Stack.Screen name='EditUserForm' component={EditUserForm}  options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>Edit User</Text></View> }} />
          <Stack.Screen name='UserProfile' component={UserProfile}  options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>User Profile</Text></View> }} />
          <Stack.Screen name='UploadVlog' component={ShowingVlog}  options={{ headerTitle: () => <View ><Text style={styles.textSubHeading}>User Profile</Text></View> }} />
          <Stack.Screen name = 'ActiveUser' component={ActiveUser} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Active Staffs</Text></View>}}/>
          <Stack.Screen name = 'CheckInUser' component={CheckInUser} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Check In Staffs</Text></View>}}/>
          <Stack.Screen name = 'NotCheckInUser' component={NotCheckInUser} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Not Check In Staffs</Text></View>}}/>
          <Stack.Screen name = 'LeaveRequest' component={LeaveRequest} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Leave Request</Text></View>}}/>
          <Stack.Screen name = 'LateEarly' component={LateEarly} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Late Early</Text></View>}}/>
          <Stack.Screen name = 'InactiveUser' component={InactiveStaff} options={{headerTitle: ()=>  <View ><Text style={styles.textSubHeading}>Inactive Staffs</Text></View>}}/>
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
