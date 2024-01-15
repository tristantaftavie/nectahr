import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MesRuchesScreen from "../screens/MesRuchesScreen";
import EditAccountScreen from "../screens/EditAccountScreen";
import AuthNavigator from "../navigation/AuthNavigator"

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Modifier profil" component={EditAccountScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
