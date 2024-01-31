import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteBranch, getBranchById } from '../redux/slices/branch/branchApi';
import { secondaryColor, styles } from '../../style';
import Icon from 'react-native-vector-icons/Entypo';
import API_CONFIG from '../config/apiConfig';
import Menus from './Menus';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';

const BranchCard = ({ item }) => {
  const refRBSheet = useRef();
  const navigation = useNavigation()
  const [branchModalOpen, setBranchModalOpen] = useState({});
  const [branchId, setBranchId] = useState(null);


  const hanldeNavigateWithId = (id) => {

    if (id) {
      navigation.navigate('DashboardBase', { id: id });
    }
    setBranchModalOpen(false);
  }

  const handleBranchId = async (id) => {
    if (id) {
      await refRBSheet.current.open()
      setBranchId(id)
      setBranchModalOpen((prev) => ({
        ...prev,
        [id]: !prev[id] || !branchModalOpen,
      }));
    }
  };

  return (
    <>
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
            <Icon name="dots-three-vertical" style={[styles.icons, { padding: 10, zIndex: 1}]} size={15} />

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent",
                },
                container: {
                  height: 100
                },
                draggableIcon: {
                  backgroundColor: "#000",
                }
              }}
            >
              {branchModalOpen[item.id] ? <Menus closeSheet={() => refRBSheet.current.close()} id={branchId} getEdit={getBranchById} getDelete={deleteBranch} path='AddBranch' name='Branch' /> : null}
            </RBSheet>
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

export default BranchCard;
