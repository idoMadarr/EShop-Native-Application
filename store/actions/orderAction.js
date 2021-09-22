import axios from 'axios';
import { Order } from '../../models/Order';

export const setOrder = (items, totalAmount) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;
    const userId = getState().userReducer.userId;
    const newOrder = new Order(Math.random(), items, totalAmount, new Date());
    await axios.post(
      `https://native-eshop-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      JSON.stringify(newOrder)
    );
    dispatch({
      type: 'NEW_ORDER',
      payload: newOrder,
    });
    dispatch({
      type: 'RESET',
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const userId = getState().userReducer.userId;
    const response = await axios.get(
      `https://native-eshop-default-rtdb.firebaseio.com/orders/${userId}.json`
    );
    const ordersArray = [];
    for (const key in response.data) {
      ordersArray.push(
        new Order(
          key,
          response.data[key].items,
          response.data[key].amount,
          new Date(response.data[key].date)
        )
      );
    }
    dispatch({
      type: 'GET_ORDERS',
      payload: ordersArray,
    });
  } catch (error) {
    console.log(error);
  }
};
