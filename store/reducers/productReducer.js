import PRODUCTS from '../../fixtures/dummy-data';

const initState = {
  products: [],
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        userProducts: action.payload.filter(
          (product) => product.ownerId === 'u1'
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    case 'NEW_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case 'UPDATE_PRODUCT':
      const findIndexInProducts = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      const findIndexInUserProduct = state.userProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      let copyProducts = [...state.products];
      let copyUserProducts = [...state.userProducts];
      copyProducts[findIndexInProducts] = action.payload;
      copyUserProducts[findIndexInUserProduct] = action.payload;
      return {
        ...state,
        products: copyProducts,
        userProducts: copyUserProducts,
      };
    default:
      return state;
  }
};

export default reducer;
