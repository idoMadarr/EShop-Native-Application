import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartAction';
import { getProducts } from '../store/actions/productAction';

import ProductItem from '../components/ProductItem/ProductItem';
import { colors } from '../assets/colors';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errState, setErrState] = useState();
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts());
      } catch (error) {
        setErrState(error.message);
      }
      setIsLoading(false);
    };
    init();
  }, [dispatch]);

  // Pull Refreshing Method
  const pullRefresh = async () => {
    await dispatch(getProducts());
  };

  if (errState) {
    return (
      <View style={styles.center}>
        <Text>{errState}</Text>
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No Products Found...</Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <Fragment>
          <FlatList
            // Pull Refreshing
            onRefresh={pullRefresh}
            refreshing={isLoading}
            data={products}
            keyExtractor={(itemData) => itemData.id}
            renderItem={(itemData) => (
              <ProductItem
                setControl
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onDetails={() =>
                  navigation.navigate('Products', {
                    screen: 'Details',
                    params: {
                      title: itemData.item.title,
                      id: itemData.item.id,
                    },
                  })
                }
                onAdd={() => dispatch(addToCart(itemData.item))}
                btnLeft={'DETAILS'}
                btnRight={'ADD TO CART'}
              />
            )}
          />
        </Fragment>
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

export default HomeScreen;
