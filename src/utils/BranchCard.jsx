import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getAllBranch } from '../redux/slices/branch/branchApi';
import { useDispatch, useSelector } from 'react-redux';
import apiService from '../config/apiService';
import { styles } from '../../style';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the desired icon set
import API_CONFIG from '../config/apiConfig';


const BranchCard = () => {
  const dispatch = useDispatch();
  const { branchData } = useSelector(state => state.branch);

  useEffect(() => {
    const fetchData = async () => {
      await getAllBranch(dispatch);
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {branchData
        ? branchData.map(item => (
          <View style={cardStyles.card} key={item.id}>
            <View style={cardStyles.image}>
             
              {item?.image ? (
                <Image
                  source={{ uri: `${API_CONFIG.imageUrl}${item.image}` }}
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
              <Text style={styles.textSubHeading}>{item?.name ? item?.name : null}</Text>
              <Text style={styles.textSubDesc}>{item?.company?.city ? item?.company?.city : null}</Text>
              <Text style={styles.textSubDesc}>{item?.company?.address ? item?.company?.address : null}</Text>
            </View>
            <View style={cardStyles.burger}>
              <Icon name="rocket" size={30} color="#900" />
            </View>
          </View>
        ))
        : []}
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
    width: 100,
    height: 100,
    borderRadius: 50,

  },
  burger: {
   
  }

});

export default BranchCard;
