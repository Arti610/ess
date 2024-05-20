import React, {   useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style';
import Icon from 'react-native-vector-icons/Entypo'; 
import API_CONFIG from '../config/apiConfig';
import { useNavigation } from '@react-navigation/native';

const BranchInfoCard = ({item}) => {
    const navigation = useNavigation();

  

  const handleBranchId = (id) => {
    if(id){
        navigation.navigate('AddBranchInfo', { data: id })
    }
  };

  return (
    <>    
      <TouchableOpacity style={cardStyles.card} key={item.id} >

            <View style={cardStyles.image}>

              {item?.branch.image ? (
                <Image
                  source={{ uri: `${API_CONFIG.imageUrl}${item.branch.image}` }}
                  style={cardStyles.imageInside}
                />
              ) : (
                <Image
                  source={require('../assests/branch.jpg')}
                  style={cardStyles.imageInside}
                />
              )}
            </View>

            <View style={cardStyles.content}>
              <Text style={styles.textSubHeading}>{item?.branch.name ? item?.branch.name : null}</Text>
              <Text style={styles.textSubDesc}><Text style={styles.lable}>CheckIn Time : </Text>{item?.check_in_time ? item?.check_in_time : null}</Text>
              <Text style={styles.textSubDesc}><Text style={styles.lable}>CheckOut Time : </Text>{item?.check_out_time ? item?.check_out_time : null}</Text>
              <Text style={styles.textSubDesc}><Text style={styles.lable}>Break Time : </Text>{item?.break_time1 ? item?.break_time1 : null}</Text>
              <Text style={styles.textSubDesc}><Text style={styles.lable}>Total Office Time : </Text>{item?.total_office_time1 ? item?.total_office_time1 : null}</Text>
            </View>

            <View style={cardStyles.burger} >
              <TouchableOpacity onPress={() => handleBranchId(item.id)}  >
                <Icon name="edit" style={styles.icons} size={15}/>
              </TouchableOpacity>
            </View>

      </TouchableOpacity>  
    </>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    height: '30rem',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative'
  },

  content: {
    width: 200,
    justifyContent: 'center'
  },
  image: {
    width: '8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageInside: {
    width: 60,
    height: 60,
    borderRadius: 30,

  },
  burger: {

  }

});

export default BranchInfoCard;
