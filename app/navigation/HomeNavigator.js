import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MesRuchesScreen from "../screens/MesRuchesScreen";
import MaMeteoScreen from "../screens/MaMeteoScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator  initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Mes ruches" component={MesRuchesScreen} />
    <Stack.Screen name="Ma météo" component={MaMeteoScreen} />
    <Stack.Screen name="Mes statistiques" component={MesRuchesScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;