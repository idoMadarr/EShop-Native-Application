import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { autoLogin } from '../store/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/colors';

const AutoStart = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLog = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigate('Login');
        return;
      }

      const transformData = JSON.parse(userData);
      const { token, userId, email } = transformData;

      if (!token || !userId || !email) {
        navigation.navigate('Login');
        return;
      }

      await dispatch(autoLogin(token, userId, email, navigation));
    };
    autoLog();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AutoStart;
