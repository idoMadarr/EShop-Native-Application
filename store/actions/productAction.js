import axios from 'axios';
import { Product } from '../../models/Product';

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://native-eshop-default-rtdb.firebaseio.com/products.json'
    );
    const productsArray = [];
    for (const key in response.data) {
      productsArray.push(
        new Product(
          key,
          response.data[key].title,
          response.data[key].imageUrl,
          response.data[key].description,
          response.data[key].price
        )
      );
    }
    dispatch({
      type: 'GET_PRODUCTS',
      payload: productsArray,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = getState().userReducer.token;
  await axios.delete(
    `https://native-eshop-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`
  );
  dispatch({
    type: 'DELETE_PRODUCT',
    payload: id,
  });
  dispatch({
    type: 'DELETE_FROM_CART',
    payload: id,
  });
};

export const newProduct =
  (product, navigation) => async (dispatch, getState) => {
    try {
      const token = getState().userReducer.token;
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post(
        `https://native-eshop-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        JSON.stringify(product),
        config
      );
      dispatch({
        type: 'NEW_PRODUCT',
        payload: product,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

export const editExistProduct =
  (product, navigation) => async (dispatch, getState) => {
    try {
      const token = getState().userReducer.token;
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.patch(
        `https://native-eshop-default-rtdb.firebaseio.com/products/${product.id}.json?auth=${token}`,
        JSON.stringify(product),
        config
      );
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: product,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
