import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingEditScreen from "../screens/ListingEditScreen";
import MapScreen from "../screens/MapScreen";


const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Carte" component={MapScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Ajouter ruche" component={ListingEditScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default MapNavigator;