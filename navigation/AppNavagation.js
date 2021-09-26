import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import {
  ProductsStackNavigator,
  OrdersStackNavigator,
  UserStackNavigator,
  AuthenticationNavigator,
} from './StackNavigation';
import { DrawerNavigation } from './DrawerNavigation';

const MainStack = createNativeStackNavigator();

export const AppNavigation = () => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <MainStack.Group>
            <MainStack.Screen name={'Drawer'} component={DrawerNavigation} />
            <MainStack.Screen
              name={'Products'}
              component={ProductsStackNavigator}
            />
            <MainStack.Screen
              name={'Orders'}
              component={OrdersStackNavigator}
            />
            <MainStack.Screen
              name={'Dashboard'}
              component={UserStackNavigator}
            />
          </MainStack.Group>
        ) : (
          <MainStack.Group>
            <MainStack.Screen
              name={'Authentication'}
              component={AuthenticationNavigator}
            />
          </MainStack.Group>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
