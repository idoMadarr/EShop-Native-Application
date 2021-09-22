import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartItem = ({ id, title, quantity, sum, onDelete }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.itemContainer}>
      <Text>{title}</Text>
      <Text>{quantity}x</Text>
      <Text>{sum.toFixed(2)}$</Text>
      <TouchableOpacity onPress={() => dispatch(onDelete(id, quantity, sum))}>
        <MaterialCommunityIcons
          name='delete-empty-outline'
          size={24}
          color={'red'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 350,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ccc',
    elevation: 5,
  },
});

export default CartItem;
