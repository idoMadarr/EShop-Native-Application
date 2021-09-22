import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../assets/colors';

const ProductItem = ({
  imageUrl,
  title,
  price,
  onDetails,
  onAdd,
  btnLeft,
  btnRight,
}) => {
  return (
    <TouchableOpacity onPress={onDetails} activeOpacity={0.6}>
      <View style={styles.product}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode={'cover'}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <View style={styles.btnsController}>
          <View style={styles.btn}>
            <Button
              title={btnLeft}
              onPress={onDetails}
              color={colors.primary}
            />
          </View>
          <View style={styles.btn}>
            <Button title={btnRight} onPress={onAdd} color={colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    width: 375,
    height: 300,
    justifyContent: 'space-between',
    elevation: 5,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  titleContainer: {
    height: '20%',
  },
  title: {
    fontFamily: 'open-sans-regular',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 4,
  },
  price: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },
  btnsController: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: 120,
  },
});

export default ProductItem;
