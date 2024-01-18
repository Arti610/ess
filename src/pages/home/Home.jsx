import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BranchCard from '../../utils/BranchCard';
import { styles } from '../../../style';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import IconAdd from 'react-native-vector-icons/MaterialIcons'

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <View style={styles.container}>

          <BranchCard />
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


