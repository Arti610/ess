import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAllBranch} from '../redux/slices/branch/branchApi';
import {useDispatch, useSelector} from 'react-redux';

const BranchCard = () => {
  const dispatch = useDispatch();
  const {branchData} = useSelector(state => state.branch);

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
                {/* {item?.image ? (
                  <Image
                    // source={{uri: item?.image}}
                    source={{uri: `${apiService}${item.image}`}}
                    W
                    style={cardStyles.image}
                  />
                ) : null} */}
              </View>
              <View style={cardStyles.content}>
                <Text>{item?.name ? item?.name : null}</Text>
                <Text>
                  {item?.company?.address ? item?.company?.address : null}
                </Text>
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
    backgroundColor: 'yellow',
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
  },
  image: {
    // Add any styles you need for the image view
  },
  // Add styles for the content view if needed
});

export default BranchCard;
