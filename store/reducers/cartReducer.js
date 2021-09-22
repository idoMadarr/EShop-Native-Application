const initState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEW_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
        totalAmount: state.totalAmount + +action.payload.productPrice,
      };
    case 'UPDATE_ITEM':
      const updatedItem = action.payload;
      const indexToUpdate = state.items.findIndex(
        (item) => item.id === updatedItem.id
      );
      let updatedItems = state.items;
      updatedItems[indexToUpdate] = updatedItem;
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + updatedItem.productPrice,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payloadId),
        totalAmount: state.totalAmount - +action.payloadSum,
      };
    case 'UPDATE_CART':
      let item = state.items.find((item) => item.id === action.payloadId);
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payloadId
      );
      item.quantity = action.payloadQty;
      item.sum = item.sum - item.productPrice;
      let updateItems = [...state.items];
      updateItems[itemIndex] = item;
      return {
        ...state,
        items: updateItems,
        totalAmount: state.totalAmount - item.productPrice,
      };
    case 'DELETE_FROM_CART':
      const product = state.items.find(
        (product) => product.id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
        totalAmount: product
          ? state.totalAmount - product.sum
          : state.totalAmount,
      };
    case 'RESET':
      return initState;
    default:
      return state;
  }
};

export default reducer;
