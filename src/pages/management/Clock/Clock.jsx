import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Text, View } from "react-native"
import Checkin from "../Users/Checkin";
import Checkout from "../Users/Checkout";

const Tab = createMaterialTopTabNavigator()

const Clock = ({route})=>{

    const {data} = route.params;

    return(
      <Tab.Navigator>
        <Tab.Screen name="checkin" component={Checkin} initialParams={data}/>
        <Tab.Screen name="checkout" component={Checkout} initialParams={data} />
      </Tab.Navigator>
    )
}

export default Clock