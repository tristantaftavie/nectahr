import React from "react";
import { StyleSheet, View, FlatList, ImageBackground } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import AppText from "../components/Text";

import {getAuth, signOut } from 'firebase/auth';
import {initializeApp } from 'firebase/app';
import {firebaseConfig} from "../../firebase-config";
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

function AccountScreen({ navigation }) {
  // const { user, logOut } = useAuth();

  const user = auth.currentUser;
  console.log("Account screen :", user);

  const logOut = async (navigation) =>  {
    try {
      await auth.signOut().then(
        ()=> {console.log('User logged out :');
        navigation.navigate("Authentication");
      }
        )
      
      alert("Déconnexion réussie");
    } catch (error) {
      console.error("Error signing out: ", error);
      return false;
    }
  };
  
  
  return (
    <ImageBackground
    blurRadius={8}
    style={styles.background}
    source={require("../assets/wallpaper.jpg")}
    >
    <Screen>
      <View style={styles.container}>
      <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Mon compte </AppText>
      </View>
        <ListItem
          title={user.displayName}
          subTitle={user.email}
          image={user.photoURL ? user.photoURL : require("../assets/tristan.jpeg")}
          onPress={() => navigation.navigate("Modifier profil")}
        />
      </View>
      {/* <View style={styles.container}>
        <FlatList
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
        />
      </View> */}
      <ListItem
        title="Déconnexion"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut(navigation)}
       
      />
    </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    marginVertical: 20,
    overflow: "hidden",
  },
  HomeTitle : {
    fontSize: 45,
    fontFamily : "Caveat_700Bold",
    color: colors.secondary,
    textAlign : "center",
  },
});

export default AccountScreen;
