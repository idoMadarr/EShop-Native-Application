import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../store/actions/productAction';
import { Product } from '../models/Product';
import InputElement from '../components/InputElement/InputElement';

const CreateProductScreen = ({ navigation }) => {
  // const userId = useSelector((state) => state.userReducer.userId);
  const [formState, setFormState] = useState({
    titleState: '',
    imgState: '',
    priceState: '',
    descriptionState: '',
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

  const create = () => {
    const isFormValid = validatorFunction();
    if (isFormValid) {
      const createProduct = new Product(
        Math.random().toString(),
        // userId,
        formState.titleState,
        formState.imgState,
        formState.descriptionState,
        +formState.priceState
      );
      dispatch(newProduct(createProduct, navigation));
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
        >
          Title
        </InputElement>
        <InputElement
          inputValue={formState.imgState}
          onType={updateState.bind(this, 'imgState')}
          errorMsg={errState.errImgState}
          holder={'Image...'}
        >
          ImageUrl
        </InputElement>
        <InputElement
          inputValue={formState.priceState}
          onType={updateState.bind(this, 'priceState')}
          errorMsg={errState.errPriceState}
          keyboard
          holder={'Product Price...'}
        >
          Price
        </InputElement>
        <InputElement
          inputValue={formState.descriptionState}
          onType={updateState.bind(this, 'descriptionState')}
          errorMsg={errState.errDescriptionState}
          holder={'Short Description...'}
        >
          Description
        </InputElement>
        <Button title={'Create'} onPress={create} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default CreateProductScreen;
