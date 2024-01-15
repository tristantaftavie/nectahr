import React from "react";
import { Image, ImageBackground, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

import {getAuth, signOut } from 'firebase/auth';
import {initializeApp } from 'firebase/app';
import {firebaseConfig} from "../../firebase-config";
import AppText from "../components/Text";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { auth } from "../auth/firebase";

const menuItems = [
  {
    title: "Mes ruches",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Mes statistiques",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function HomeScreen({ navigation }) {
  // const { user, logOut } = useAuth();

  const user = auth.currentUser;
  // console.log("Home screen :", user);

  
  const logOut = () => signOut(auth).then(() => {
    alert("Déconnexion réussie")
    navigation.navigate("WelcomeScreen");
  }).catch((error) => {
    alert(error);
  });
  
  return (
    <ImageBackground
    blurRadius={8}
    style={styles.background}
    source={require("../assets/wallpaper.jpg")}
  >
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Bonjour {user.displayName} !</AppText>
      </View>
      <View style={styles.dashboardContainer}>
      <GestureHandlerRootView>
        <ScrollView showsVerticalScrollIndicator={false} >
        
          <AppText style={[styles.dashboardText, {textAlign: "center", paddingHorizontal : 25, fontFamily: "Caveat_400Regular", marginBottom : 20}]}>
            Ajoute une ruche sur la carte pour tracker le passage des frelons !   🐝
          </AppText>
          
            <View style={styles.rowDashboardContainer}>
        <TouchableOpacity
            onPress={() =>
              navigation.navigate("Mes ruches")
            }
            style={styles.homeRucheStyle}>
            <View style={styles.homeHeadingParentStyle}>
              <View>
                <AppText style={styles.dashboardText}>Mes ruches </AppText>
              </View>
              <Image
                resizeMode="cover"
                style={styles.homeRucheImageStyle}
                source={require("../assets/ruche.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Ma météo")
            }
            style={styles.homeRucheStyle}>
            <View style={styles.homeHeadingParentStyle}>
              <View>
                <AppText style={styles.dashboardText}>Ma météo  </AppText>
              </View>
              <Image
                resizeMode="contain"
                style={styles.homeRucheImageStyle}
                source={require("../assets/nuageux.png")}
              />
            </View>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Mes statistiques")
            }
            style={[styles.homeRucheStyle, {width: "96%"}]}>
            <View style={[styles.homeHeadingParentStyle, {flexDirection : "row"}]}>
              <View>
                <AppText style={[styles.dashboardText, {marginRight : 20}]}>Mes statistiques  </AppText>
              </View>
              <Image
                resizeMode="contain"
                style={styles.homeRucheImageStyle}
                source={require("../assets/graphique.png")}
              />
            </View>
          </TouchableOpacity>
          
        </ScrollView>
        </GestureHandlerRootView>
        {/* <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        /> */}
      </View>
      {/* <ColorGenerator/> */}
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },

  background: {
    flex: 1,
  },
  container: {
    marginVertical: 30,
  },
  dashboardContainer : {
    flex: 1,
  },
dashboardText: {textAlign: "center", fontSize: 30, paddingBottom : 10},
  rowDashboardContainer : {
    flexDirection : "row",
    justifyContent : "space-around",
  },

  HomeTitle : {
    fontSize: 45,
    fontFamily : "Caveat_700Bold",
    color: colors.secondary,
    textAlign : "center",
  },
  homeRucheStyle: {
    opacity : 0.9,
    marginBottom: 10,
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 30,
    borderColor: colors.primary,
    borderWidth: 1,
    width : "47%",
    alignItems : 'center',
    marginHorizontal: 8,
  },
  homeHeadingParentStyle : {
    alignItems :"center",
    justifyContent : "center",
    flexDirection : "column",
    alignSelf: "center",
  },

  homeRucheImageStyle :{width: 70, height: 70},
});

export default HomeScreen;
