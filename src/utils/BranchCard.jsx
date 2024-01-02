import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BranchCard = () => {
  return (
    <View style={cardStyles.card}>
      <Text>BranchCard</Text>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    height: '20%',
    width: '90%',
    backgroundColor: 'yellow',
    marginVertical: 10,
    borderRadius: 8,
  },
});
export default BranchCard;
