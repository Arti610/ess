import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Checkin from "./Checkin";
import Checkout from "./Checkout";



const Tab = createMaterialTopTabNavigator()
const Clock = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='checkin' component={Checkin} />
            <Tab.Screen name='checkout' component={Checkout} />
        </Tab.Navigator>
    )
}

export default Clock;