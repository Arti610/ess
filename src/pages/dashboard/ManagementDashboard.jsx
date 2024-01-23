import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../../style";

const ManagementDashboard = ()=>{
  const route = useRoute();
  const { id } = route.params;
  console.log('id,id', id);
  
  return(
    <>
     <View >

      <Text>hello</Text>
     </View>
    </>
  )
}

export default ManagementDashboard;