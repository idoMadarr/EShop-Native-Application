import axios from 'axios';
const FIREBASE_API = 'AIzaSyDuZ3wXLO_7Mbq3h5OtgYD0lwdIlD8B6Ug';

export const signUp = (userDetails) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
    JSON.stringify(userDetails),
    config
  );
  console.log(response.data);
  dispatch({
    type: 'SIGN_UP',
    payload: response.data,
  });
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
};
