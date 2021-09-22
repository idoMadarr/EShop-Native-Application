import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { logIn } from '../store/actions/userAction';

const LoginScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
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

  const loginHandler = async () => {
    const userDetails = {
      email: formState.email,
      password: formState.password,
      returnSecureToken: true,
    };
    dispatch(logIn(userDetails));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.deck}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={formState.email}
          onChangeText={updateState.bind(this, 'email')}
          placeholder={'Email'}
        />
        <TextInput
          style={styles.input}
          value={formState.password}
          onChangeText={updateState.bind(this, 'password')}
          placeholder={'Password'}
          secureTextEntry
        />
        <View style={styles.btnController}>
          <Button title={'Login'} onPress={loginHandler} color={'green'} />
        </View>
        <View style={styles.btnController}>
          <Button
            title={'Dont have account yet?'}
            color={'gray'}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  deck: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
  },
  input: {
    margin: 3,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  btnController: {
    margin: 3,
    width: '80%',
  },
});

export default LoginScreen;
