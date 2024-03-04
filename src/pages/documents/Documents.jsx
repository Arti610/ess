import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import getApi from '../../redux/slices/utils/getApi';
import {currentUser} from '../../utils/currentUser';
import DocIcon from 'react-native-vector-icons/Ionicons';
import Dot from 'react-native-vector-icons/Entypo';
import {styles} from '../../../style';

const Documents = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [filePath, setFilePath] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await currentUser();

      if (res) {
        setId(res.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    try {
      if (id) {
        const fetchData = async () => {
          const res = await getApi.getAllUserList(id);
          console.log(res.data.docs);
          if (res && res.data && res.data.docs) {
            setData(res.data.docs);
          }
        };
        fetchData();
      }
    } catch (error) {
      console.log(error, 'error during fetching documents');
    }
  }, [id]);

  const openPdf = filePath => {
    console.log(filePath);
    setFilePath(filePath);
  };

  const renderComponent = ({item}) => (
    <View style={[styles.textInput, style.container, {justifyContent: 'space-between'}]}>
        <View style={style.container}>
            <DocIcon name="document" style={styles.eyeIcon} />
            <Text style={styles.lable}>{item.document_name}</Text>
        </View>
      <TouchableOpacity onPress={() => openPdf(item.document)}><Dot name="dots-three-vertical" style={styles.eyeIcon} /></TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList data={data} renderItem={renderComponent} />
    </View>
  );
};

export default Documents;

const style = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
