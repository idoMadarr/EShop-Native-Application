import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { removeItem } from '../store/actions/cartAction';

import Summary from '../components/Summary/Summary';
import CartItem from '../components/CartItem/CartItem';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cartReducer.items);

  return (
    <View style={{ alignItems: 'center' }}>
      <View>
        <Summary />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(dataItem) => dataItem.id}
        renderItem={(itemData) => (
          <CartItem
            id={itemData.item.id}
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            sum={itemData.item.sum}
            onDelete={removeItem}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;
