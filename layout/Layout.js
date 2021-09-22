import React from 'react';
import { useSelector } from 'react-redux';

// Navigation:
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '../navigation/AppNavagation';
import { AuthenticationNavigator } from '../navigation/StackNavigation';

const Layout = () => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigation /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
};

export default Layout;
