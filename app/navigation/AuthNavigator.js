import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

export default AuthNavigator;
