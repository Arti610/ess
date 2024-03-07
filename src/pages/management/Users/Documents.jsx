import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Loader from '../../../utils/ActivityIndicator'

const Documents = ({route}) => {

  const {data} = route.params
  return (
   data ?<View>
    <Text>Documents</Text>
    <FlatList
      data={data.docs}
      renderItem={({item})=> (
        <Text>{item.document}</Text>
      )}
    />
   </View> : <Loader/>
  )
}

export default Documents