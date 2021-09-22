import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../../store/actions/orderAction';

import { colors } from '../../assets/colors';

const Summary = () => {
  const totalAmount = useSelector((state) => state.cartReducer.totalAmount);
  const items = useSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const sendOrder = async () => {
    setIsLoading(true);
    await dispatch(setOrder(items, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.checkContainer}>
      <Text style={styles.text}>
        Total:{' '}
        <Text style={styles.total}>
          {Math.round(totalAmount.toFixed(2) * 100) / 100}$
        </Text>
      </Text>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <Button
          title={'Order Now!'}
          color={colors.primary}
          onPress={sendOrder}
          disabled={items.length === 0 ? true : false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    marginVertical: 10,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    elevation: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
  },
  text: {
    fontFamily: 'open-sans-bold',
  },
  total: {
    color: colors.primary,
  },
});

export default Summary;
