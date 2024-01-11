import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteBranch, getAllBranch, getBranchById } from '../redux/slices/branch/branchApi';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../style';
import Icon from 'react-native-vector-icons/Entypo'; // Replace 'FontAwesome' with the desired icon set
import API_CONFIG from '../config/apiConfig';
import Menus from './Menus';


const BranchCard = () => {
  const dispatch = useDispatch();
  const [branchModalOpen, setBranchModalOpen] = useState({});
  const [branchId, setBranchId] = useState({});
  const { branchData } = useSelector((state) => state.branch);

  useEffect(() => {
    const fetchData = async () => {
      await getAllBranch(dispatch);
    };
    fetchData();
  }, [dispatch]);

  const hanldeNavigateWithId = () => {
    setBranchModalOpen(false)
  }

  const handleBranchId = (id) => {
    setBranchId(id)
    setBranchModalOpen((prev) => ({
      ...prev,
      [id]: !prev[id] || !branchModalOpen,
    }));
  };
  return (
    <>
    
      {branchData
        ? branchData.map(item => (
          <TouchableOpacity style={cardStyles.card} key={item.id} onPress={() => hanldeNavigateWithId(item.id)}>

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
              <Text style={styles.textSubDesc}>{item?.city ? item?.city : null}</Text>
              <Text style={styles.textSubDesc}>{item?.address ? item?.address : null}</Text>
            </View>

            <View style={cardStyles.burger} >
              <TouchableOpacity onPress={() => handleBranchId(item.id)}  >
                <Icon name="dots-three-vertical" style={styles.icons} size={15}/>
                {branchModalOpen[item.id] ? <Menus id={branchId} getEdit={getBranchById} getDelete={deleteBranch} path='AddBranch' /> : null}
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
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
    width: 100,
    height: 100,
    borderRadius: 50,

  },
  burger: {

  }

});

export default BranchCard;
