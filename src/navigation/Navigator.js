import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {Text, View} from 'react-native';
import {styles} from '../../style.js';
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
import InactiveStaff from '../pages/management/Home/InactiveStaff.jsx';
import StaffDashboard from '../pages/staff/StaffDashboard.jsx';
import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx';
import ApplyLR from '../pages/staff/leave/leaveRequest/ApplyLR.jsx';
import ApplyLE from '../pages/staff/leave/lateEarly/ApplyLE.jsx';
import Notification from '../pages/staff/Notification/Notification.jsx';
import UserDetailScreen from '../pages/user/detail.jsx';
import NotificationDetails from '../pages/staff/Notification/NotificationDetails.jsx';
import LeaveRequest from '../pages/staff/leave/leaveRequest/LeaveRequest.jsx';
import LateEarly from '../pages/staff/leave/lateEarly/LateEarly.jsx';
import Leaves from '../pages/management/Users/Leaves.jsx';
import LateEarlys from '../pages/management/Users/LateEarlys.jsx';
import Documents from '../pages/management/Users/Documents.jsx';
import Vlog from '../pages/management/Users/Vlog.jsx';
import AddDocument from '../pages/management/AddDocument.jsx';
import Document from '../pages/management/Document.jsx';



const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: true}}
        initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Base"
          component={Base}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTP Verification"
          component={OtpVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reset Password"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
  
        <Stack.Screen name="managerDashboard" component={ManagerDashboard} options={{headerShown : false}}/>
        <Stack.Screen
          name="AddBranch"
          component={AddBranch}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Branch</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="AddBranchInfo"
          component={AddBranchInfo}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>BranchInfo</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Profile</Text>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Edit Profile</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="UserDetailScreen"
          component={UserDetailScreen}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Profile</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Change Password</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="DashboardBase"
          component={DashboardBase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StaffBase"
          component={StaffDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManagerBase"
          component={ManagerDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Add Employee</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="EditUserForm"
          component={EditUserForm}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Edit Employee</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Employee Profile</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="UploadVlog"
          component={ShowingVlog}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Vlog</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ActiveUser"
          component={ActiveUser}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Active Employee</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="CheckInUser"
          component={CheckInUser}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>In Office</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="NotCheckInUser"
          component={NotCheckInUser}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Not In Office</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="InactiveUser"
          component={InactiveStaff}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Inactive Employee</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ApplyLR"
          component={ApplyLR}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Leave Request</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ApplyLE"
          component={ApplyLE}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Late/Early Request</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="LeaveRequest"
          component={LeaveRequest}
            options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Leave Request</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="LateEarly"
          component={LateEarly}
            options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Late/Early Request</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Leaves'
          component={Leaves}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Leave</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='LateEarlys'
          component={LateEarlys}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Late/Early</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Documents'
          component={Documents}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Document</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Vlogs'
          component={Vlog}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Vlog</Text>
              </View>
            ),
          }}
        />
         <Stack.Screen
          name="Document"
          component={Document}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Document</Text>
              </View>
            ),
          }}
        />
         <Stack.Screen
          name="AddDocument"
          component={AddDocument}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Add Document</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Notification</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="NotificationDetails"
          component={NotificationDetails}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.textSubHeading}>Notification</Text>
              </View>
            ),
          }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
