import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import routes from "../navigation/routes";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={8}
      style={styles.background}
      source={require("../assets/wallpaper.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo_nectahr.png")} />
        <Text style={styles.tagline}>Projet NECTAHR </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Connexion"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Inscription"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 40,
    fontWeight: "600",
    paddingVertical: 20,
    color: colors.white,
    fontFamily: "Caveat_700Bold",
  },
});

export default WelcomeScreen;
