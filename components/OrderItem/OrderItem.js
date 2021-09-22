import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';

const OrderItem = ({ amount, date, items }) => {
  const [infoToggle, setToggleInfo] = useState(false);

  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderMain}>
        <Text style={{ fontWeight: 'bold' }}>Order Received on {date}</Text>
        <Text>Total Amount: ${amount.toFixed(2)}</Text>
      </View>
      <Button
        title={'Info'}
        onPress={() => setToggleInfo(!infoToggle)}
        color={colors.primary}
      />
      {infoToggle &&
        items.map((itme) => {
          return (
            <View key={itme.id} style={styles.item}>
              <Text>{itme.productTitle}</Text>
              <Text>X{itme.quantity}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 8,
  },
  orderMain: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 5,
    marginVertical: 2,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderItem;
