import { CartItem } from '../../models/CartItem';

export const addToCart = (product) => (dispatch, getState) => {
  const items = getState().cartReducer.items;
  const isExist = items.find((cartItem) => cartItem.id === product.id);
  if (isExist) {
    const updateItem = new CartItem(
      isExist.id,
      isExist.quantity + 1,
      isExist.productPrice,
      isExist.productTitle,
      isExist.sum + isExist.productPrice
    );
    dispatch({
      type: 'UPDATE_ITEM',
      payload: updateItem,
    });
  } else {
    const newItem = new CartItem(
      product.id,
      1,
      product.price,
      product.title,
      product.price
    );
    dispatch({
      type: 'NEW_ITEM',
      payload: newItem,
    });
  }
};

export const removeItem = (id, quantity, sum) => (dispatch) => {
  if (quantity == 1) {
    return dispatch({
      type: 'REMOVE_ITEM',
      payloadId: id,
      payloadSum: sum,
    });
  }
  const newQuantity = quantity - 1;
  dispatch({
    type: 'UPDATE_CART',
    payloadId: id,
    payloadQty: newQuantity,
    payloadSum: sum,
  });
};
