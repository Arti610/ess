import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BranchCard from '../../utils/BranchCard';
import {styles} from '../../../style';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <BranchCard />
          <TouchableOpacity onPress={() => navigation.navigate('AddBranch')}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>  
      </ScrollView>
      <Toast/>
    </>
  );
};

export default Home;
