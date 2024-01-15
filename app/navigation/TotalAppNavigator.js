import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingEditScreen from "../screens/ListingEditScreen";
import MapScreen from "../screens/MapScreen";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import auth from "../api/auth";

const Stack = createStackNavigator();
const user = auth.currentUser;

const TotalAppNavigator = () => (
  <Stack.Navigator>
    {!user && <Stack.Screen name="Authentication" component={AuthNavigator} options={{headerShown: false}}/>}
    <Stack.Screen name="App Navigator" component={AppNavigator} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default TotalAppNavigator;