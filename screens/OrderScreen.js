import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/actions/orderAction';

import OrderItem from '../components/OrderItem/OrderItem';
import { colors } from '../assets/colors';

const OrderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await dispatch(fetchOrders());
      setIsLoading(false);
    };
    init();
  }, [dispatch]);

  return (
    <View>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(itemData) => itemData.id.toString()}
          renderItem={(itemData) => (
            <OrderItem
              amount={+itemData.item.amount}
              date={itemData.item.configureDate}
              items={itemData.item.items}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
});

export default OrderScreen;
