import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ProductsStackNavigator,
  OrdersStackNavigator,
  UserStackNavigator,
} from './StackNavigation';
import { DrawerNavigation } from './DrawerNavigation';

const MainStack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'Drawer'} component={DrawerNavigation} />
      <MainStack.Screen name={'Products'} component={ProductsStackNavigator} />
      <MainStack.Screen name={'Orders'} component={OrdersStackNavigator} />
      <MainStack.Screen name={'Dashboard'} component={UserStackNavigator} />
    </MainStack.Navigator>
  );
};
