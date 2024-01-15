import React, { useState } from "react";
import {ImageBackground, FlatList, StyleSheet, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import AppText from "../components/Text";
import colors from "../config/colors";

import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from '../auth/firebase';

const initialMessages = [
  {
    id: 1,
    title: "Ruche n°1",
    description: "Hey! Is this item still available?",
    image: require("../assets/tristan.jpeg"),
  },
  {
    id: 2,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/tristan.jpeg"),
  },
];

function MesRuchesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const [ruchers, setRuchers] = useState(null);

  const user = auth.currentUser;
  const handleDelete = (message) => {
    // Delete the message from messages
    alert("message deleted");
  };

  const getRuchersFromDb = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ruches"));
      const newRuchesArray = querySnapshot.docs.map(doc => doc.data());
      setRuchers(newRuchesArray);
      console.log(newRuchesArray);
    } catch (error) {
      console.error("Erreur lors de la récupération des documents: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getRuchersFromDb();
    }, [])
  );


  


  return (
    <ImageBackground
    blurRadius={8}
    style={styles.background}
    source={require("../assets/wallpaper.jpg")}
  >
    <Screen>
        <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Mes ruches  🍯</AppText>
      </View>
      
      <FlatList
        data={ruchers}
        keyExtractor={(ruche) => ruche.title.toString()}
        renderItem={({ item }) => (
          item.author === user.uid && <ListItem
            title={item.title}
            subTitle={item.description} 
            image={item.color === "red" ? require('../assets/rucher_red.png') : require('../assets/rucher.png')}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        
        refreshing={refreshing}
        onRefresh={() => {
          getRuchersFromDb();
        }}
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
        marginVertical: 30,
      },
      HomeTitle : {
        fontSize: 45,
        fontFamily : "Caveat_700Bold",
        color: colors.secondary,
        textAlign : "center",
      },
});

export default MesRuchesScreen;
