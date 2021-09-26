import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// Screens:
import LoginScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import UserScreen from '../screens/UserScreen';
import EditScreen from '../screens/EditScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import AutoStart from '../ustils/AutoStart';

const ArrowStack = createNativeStackNavigator();

// NOTICE: This authentication stack is seperated from the main application navigator
export const AuthenticationNavigator = () => {
  return (
    <ArrowStack.Navigator screenOptions={{ headerShown: false }}>
      <ArrowStack.Screen name={'startup'} component={AutoStart} />
      <ArrowStack.Screen name={'Login'} component={LoginScreen} />
      <ArrowStack.Screen name={'Signup'} component={SignUpScreen} />
    </ArrowStack.Navigator>
  );
};

export const ProductsStackNavigator = () => {
  const email = useSelector((state) => state.userReducer.email);
  const defaultHeaderStyle = {
    headerTitleAlign: 'center',
  };

  return (
    <ArrowStack.Navigator
      screenOptions={({ route }) => ({
        ...defaultHeaderStyle,
        title: route.params?.title,
      })}
    >
      <ArrowStack.Screen
        name={'Hello ' + email.split('@')[0] || 'Home'}
        component={HomeScreen}
      />
      <ArrowStack.Screen name={'Details'} component={DetailsScreen} />
      <ArrowStack.Screen
        name={'Cart'}
        component={CartScreen}
        options={defaultHeaderStyle}
      />
    </ArrowStack.Navigator>
  );
};

export const OrdersStackNavigator = () => {
  return (
    <ArrowStack.Navigator>
      <ArrowStack.Screen name={'Order'} component={OrderScreen} />
    </ArrowStack.Navigator>
  );
};

export const UserStackNavigator = () => {
  return (
    <ArrowStack.Navigator>
      <ArrowStack.Screen name={'Admin'} component={UserScreen} />
      <ArrowStack.Screen
        name={'Edit'}
        component={EditScreen}
        options={{ title: 'Edit Product' }}
      />
      <ArrowStack.Screen
        name={'New'}
        component={CreateProductScreen}
        options={{ title: 'Create New Product' }}
      />
    </ArrowStack.Navigator>
  );
};
