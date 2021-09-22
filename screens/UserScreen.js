import React from 'react';
import { FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../store/actions/productAction';

import ProductItem from '../components/ProductItem/ProductItem';

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    (state) => state.productReducer.userProducts
  );

  const deleteHandler = (productId) => {
    Alert.alert(
      'Are you sure?',
      'This action will delete completly you product from the app',
      [
        { text: 'Return', style: 'default' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(deleteProduct(productId)),
        },
      ]
    );
  };

  return (
    <FlatList
      data={userProducts}
      key={(itemDate) => itemDate.id}
      renderItem={(itemDate) => (
        <ProductItem
          imageUrl={itemDate.item.imageUrl}
          title={itemDate.item.title}
          price={itemDate.item.price}
          onAdd={deleteHandler.bind(this, itemDate.item.id)}
          onDetails={() =>
            navigation.navigate('Dashboard', {
              screen: 'Edit',
              params: { productId: itemDate.item.id },
            })
          }
          btnLeft={'EDIT'}
          btnRight={'DELETE'}
        />
      )}
    />
  );
};

export default UserScreen;
