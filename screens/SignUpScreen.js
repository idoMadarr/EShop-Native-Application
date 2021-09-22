import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../assets/colors';
import { signUp } from '../store/actions/userAction';

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

  const signupHandler = async () => {
    if (formState.password !== formState.confirmPassword) {
      return;
    }
    setIsLoading(true);
    const userDetails = {
      email: formState.email,
      password: formState.password,
      returnSecureToken: true,
    };
    dispatch(signUp(userDetails));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.deck}>
        <Text style={styles.title}>Sign Up</Text>
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
        <TextInput
          style={styles.input}
          value={formState.confirmPassword}
          onChangeText={updateState.bind(this, 'confirmPassword')}
          placeholder={'Confirm'}
          secureTextEntry
        />
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <View style={styles.btnController}>
            <Button title={'SignIn'} onPress={signupHandler} color={'green'} />
          </View>
        )}
        <View style={styles.btnController}>
          <Button
            title={'Already have account?'}
            color={'red'}
            onPress={() => navigation.navigate('Login')}
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
