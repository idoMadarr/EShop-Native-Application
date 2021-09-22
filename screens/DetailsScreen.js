import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartAction';

import { colors } from '../assets/colors';

const DetailsScreen = ({ route }) => {
  const prodId = route.params.id;
  const products = useSelector((state) => state.productReducer.products);
  const displayProduct = products.find(
    (product) => product.id.toString() === prodId.toString()
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{ uri: displayProduct.imageUrl }} style={styles.image} />
      <View style={styles.btnControler}>
        <Button
          title={'Add to Cart'}
          color={colors.primary}
          onPress={() => dispatch(addToCart(displayProduct))}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.price}>${displayProduct.price}</Text>
        <Text style={styles.description}>{displayProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  btnControler: {
    alignItems: 'center',
    marginVertical: 10,
  },
  content: {
    paddingHorizontal: 30,
  },
  price: {
    fontSize: 22,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'open-sans-regular',
    textAlign: 'center',
  },
});

export default DetailsScreen;
