import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BranchCard from '../../utils/BranchCard';
import { styles } from '../../../style';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranch } from '../../redux/slices/branch/branchApi';
import Loader from '../../utils/ActivityIndicator';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { branchData } = useSelector((state) => state.branch);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
    try {
      setLoading(true)
      const res =  await getAllBranch(dispatch);

      if(res.status === 200){
        setLoading(false)
      }
    } catch (error) {
    }
    };
    fetchData();
  }, [dispatch]);

  return (
    loading ? <Loader/> : <>
      <ScrollView>
        <View style={styles.container}>
        {branchData
        ? branchData.map((item, i) => (
          <BranchCard item = {item} key={i}/>
          ))
          : []}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddBranch')}>
          <IconAdd name='add' style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <Toast />
    </>
  );
};

export default Home;


