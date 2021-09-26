import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FIREBASE_API = 'AIzaSyDuZ3wXLO_7Mbq3h5OtgYD0lwdIlD8B6Ug';

const saveDataToStorage = (token, userId, email) => {
  console.log(token, userId, email);
  AsyncStorage.setItem('userData', JSON.stringify({ token, userId, email }));
};

export const getDataFromStorage = async () => {
  const userDetails = await JSON.parse(AsyncStorage.getItem('userData'));
  return userDetails;
};

export const signUp = (userDetails) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
    JSON.stringify(userDetails),
    config
  );
  dispatch({
    type: 'SIGN_UP',
    payload: response.data,
  });
  saveDataToStorage(
    response.data.idToken,
    response.data.localId,
    response.data.email
  );
};

export const logIn = (userDetails) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`,
    JSON.stringify(userDetails),
    config
  );
  console.log(response.data);
  dispatch({
    type: 'LOGIN',
    payload: response.data,
  });
  saveDataToStorage(
    response.data.idToken,
    response.data.localId,
    response.data.email
  );
};

export const autoLogin =
  (token, userId, email, navigation) => async (dispatch) => {
    await dispatch({
      type: 'AUTO_LOG',
      payload: {
        token,
        userId,
        email,
      },
    });
    navigation.navigate('Products');
  };
