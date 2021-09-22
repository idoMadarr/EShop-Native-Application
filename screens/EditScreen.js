import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { editExistProduct } from '../store/actions/productAction';
import { Product } from '../models/Product';
import InputElement from '../components/InputElement/InputElement';

const EditScreen = ({ route, navigation }) => {
  const productId = route.params.productId;
  const userProducts = useSelector(
    (state) => state.productReducer.userProducts
  );
  const displayProduct = userProducts.find(
    (product) => product.id === productId
  );

  const [formState, setFormState] = useState({
    titleState: displayProduct.title,
    imgState: displayProduct.imageUrl,
    priceState: displayProduct.price.toString(),
    descriptionState: displayProduct.description,
  });
  const [errState, setErrState] = useState({
    errTitleState: '',
    errImgState: '',
    errPriceState: '',
    errDescriptionState: '',
  });
  const dispatch = useDispatch();

  const updateState = (inputType, value) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [inputType]: value,
      };
    });
  };

  const validatorFunction = () => {
    let titleErr = null;
    let imgErr = null;
    let priceErr = null;
    let descErr = null;

    if (formState.titleState.trim() === '') titleErr = 'Title is required';
    if (formState.imgState.trim() === '') imgErr = 'ImageUrl is required';
    if (formState.priceState.trim() === '') priceErr = 'Price is required';
    if (formState.descriptionState.trim() === '')
      descErr = 'Description is required';

    if (titleErr || imgErr || priceErr || descErr) {
      setErrState((prevState) => {
        return {
          ...prevState,
          errTitleState: titleErr,
          errImgState: imgErr,
          errPriceState: priceErr,
          errDescriptionState: descErr,
        };
      });
      return false;
    }
    return true;
  };

  const editProduct = () => {
    const isFormValid = validatorFunction();
    if (isFormValid) {
      const updatedProduct = new Product(
        productId,
        displayProduct.ownerId,
        formState.titleState,
        formState.imgState,
        formState.descriptionState,
        +formState.priceState
      );
      dispatch(editExistProduct(updatedProduct, navigation));
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <InputElement
          inputValue={formState.titleState}
          onType={updateState.bind(this, 'titleState')}
          errorMsg={errState.errTitleState}
          holder={'Product Title...'}
        />
        <InputElement
          inputValue={formState.imgState}
          onType={updateState.bind(this, 'imgState')}
          errorMsg={errState.errImgState}
          holder={'Image...'}
        />
        <InputElement
          inputValue={formState.priceState}
          onType={updateState.bind(this, 'priceState')}
          errorMsg={errState.errPriceState}
          holder={'Product Price...'}
        />
        <InputElement
          inputValue={formState.descriptionState}
          onType={updateState.bind(this, 'descriptionState')}
          errorMsg={errState.errDescriptionState}
          holder={'Short Description...'}
        />
        <Button title={'Save'} onPress={editProduct} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditScreen;
