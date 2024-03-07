import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Checkin from './Checkin';
import Checkout from './Checkout';
import {useEffect, useState} from 'react';
import {currentUser} from '../../../utils/currentUser';
import CheckInUser from '../../management/Home/CheckInUser';
import NotCheckInUser from '../../management/Home/NotCheckInUser';
import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const Clock = () => {
  const route = useRoute();
  const {id} = route.params;
  console.log('id  clock', id);

  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await currentUser();
        setCurrentUserData(res.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return currentUserData &&
    currentUserData.user_type &&
    currentUserData.user_type === 'Staff' ? (
    <Tab.Navigator>
      <Tab.Screen name="check In" component={Checkin} />
      <Tab.Screen name="check Out" component={Checkout} />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name="In Office"
        component={CheckInUser}
        options={{tabBarLabel: 'In Office'}}
        initialParams={{id: id}}
      />
      <Tab.Screen
        name="Not In Office"
        component={NotCheckInUser}
        options={{tabBarLabel: 'Not In Office'}}
        initialParams={{id: id}}
      />
    </Tab.Navigator>
  );
};

export default Clock;
