import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import UserScreen from '../screens/UserScreen';

export const DrawerNavigation = () => {
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);
  const navigationHook = useNavigation();
  const DrawerStack = createDrawerNavigator();

  return (
    <DrawerStack.Navigator>
      <DrawerStack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          title: 'EShop',
          drawerIcon: () => <Entypo name='shop' size={24} color='black' />,
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Entypo
                name='shopping-cart'
                size={24}
                color='black'
                onPress={() =>
                  navigationHook.navigate('Products', { screen: 'Cart' })
                }
              />
            </TouchableOpacity>
          ),
        }}
      />
      <DrawerStack.Screen
        name={'OrderScreen'}
        component={OrderScreen}
        options={{
          title: 'Orders',
          drawerIcon: () => <Entypo name='bar-graph' size={24} color='black' />,
        }}
      />
      {isAdmin && (
        <DrawerStack.Screen
          name={'UserScreen'}
          component={UserScreen}
          options={{
            title: 'Dashboard',
            drawerIcon: () => <Entypo name='user' size={24} color='black' />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigationHook.navigate('Dashboard', { screen: 'New' })
                }
                style={{ paddingRight: 15 }}
              >
                <Ionicons name='create-outline' size={24} color='black' />
              </TouchableOpacity>
            ),
          }}
        />
      )}
    </DrawerStack.Navigator>
  );
};
