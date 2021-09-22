const initState = {
  orders: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEW_ORDER':
      return {
        ...state,
        orders: state.orders.concat(action.payload),
      };
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
