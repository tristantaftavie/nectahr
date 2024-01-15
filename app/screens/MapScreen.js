import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from '../auth/firebase';
import AppText from "../components/Text";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import AppButton from "../components/Button";



const generateRandomUniqueColor = (existingColors) => {
  let color;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
  } while (Object.values(existingColors).includes(color)); // Vérifier l'unicité de la couleur
  return color;
};

const markers = [
  {
    author : "QZZr8F9I33Uk8ElA4P9CEtim9Gr2",
    counter : 5,
    latlng: { latitude: 50.606301, longitude: 3.135407 },
    title: 'Ruche 1',
    description: "Cette ruche n'est pas du tout en danger",
    color: "green",
  },
  {
    author : "QZZr8F9I33Uk8ElA4P9CEtim9Gr2",
    counter : 60,
    latlng: { latitude: 50.607301, longitude: 3.136407 },
    title: 'Ruche 2',
    description: "Cette ruche est en grand danger !",
    color: "red",
  },
  // Add more markers as needed
];

export default function MapScreen({navigation}) {
  

  const [ruchers, setRuchers] = useState(markers);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [region, setRegion] = useState({
    latitude: 50.606301,
    longitude: 3.135407,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [hornetColors, setHornetColors] = useState({}); // Nouvel état pour les couleurs
  const [hornetData, setHornetData] = useState(null); // État pour stocker les données de l'API

  const fetchData = async () => {
    const apiData = await axios.get('https://48cf-193-49-179-9.ngrok-free.app/hornets');
    setHornetData(apiData);

    // Mettre à jour les couleurs pour chaque unique_id
    apiData.hornets_array.forEach(hornet => {
      if (!hornetColors[hornet.unique_id]) {
        setHornetColors(prevColors => {
          const newColor = generateRandomColor(prevColors);
          return {
            ...prevColors,
            [hornet.unique_id]: newColor
          };
        });
      }
    });
  };

 

  const getRuchersFromDb = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ruches"));
      const newRuchesArray = querySnapshot.docs.map(doc => doc.data());
      const combinedArray = [...markers, ...newRuchesArray];
      setRuchers(combinedArray);
      console.log(combinedArray);
    } catch (error) {
      console.error("Erreur lors de la récupération des documents: ", error);
    }
  };
  

  useEffect(() => {
    //récupérer les ruches présentes dans la bdd et les ajouter à la carte
    //Récupérer les frelons depuis l'API de Julien
    //En fonction du nombre de frelons autour de la ruche, changer la couleur : seuil : 20 frelons
    
    //traitementDonnéesDb();
    // Simuler la récupération des données de l'API
    fetchData();
  }, []); // Simuler un appel API au montage du composant


  useFocusEffect(
    React.useCallback(() => {
      getRuchersFromDb();
    }, [])
  );
  
  

  // Function to handle region change
  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const LongPressHandler = (event) => {
    // const newMarker = {
    //   author: auth.currentUser.uid, // Supposé que l'utilisateur actuel est l'auteur du nouveau marqueur
    //   latlng: event.nativeEvent.coordinate,
    //   title: 'Nouveau Marqueur',
    //   description: 'Description ici',
    //   color: 'green', // ou utilisez generateRandomUniqueColor pour une couleur aléatoire
    // };
      console.log("mon point depuis la carte", event.nativeEvent.coordinate);
      const newMarkerCoords = event.nativeEvent.coordinate;
      setIsModalVisible(true);
      navigation.navigate('Ajouter ruche', {newMarkerCoords});
    
    
  //setRuchers([...ruchers, newMarker]);
  };

  
  

  

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region={region} 
        onRegionChange={onRegionChange}
        mapType='terrain'
        showsUserLocation={true}
        userLocationAnnotationTitle="Hé Ho je suis là ! 👋"
        showsPointsOfInterest
        showsScale
        onLongPress={(event ) => LongPressHandler(event)}
        //followsUserLocation={true} //bugue
      >
         

        {/* //Printing the points corresponding to each unique hornet with a unique  */}
        
        {/* {hornetData && hornetData.hornets_array.map(hornet => 
          hornet.positions_detected.map((position, index) => (
            <Marker
              key={`${hornet.unique_id}-${index}`}
              coordinate={position}
              pinColor={hornetColors[hornet.unique_id]}
            />

          ))
        )} */}
        {ruchers.map((rucher, index) => (
  auth.currentUser.uid && rucher.author === auth.currentUser.uid && (
    <Marker
      key={index}
      coordinate={rucher.latlng}
      title={rucher.title}
      description={rucher.description}
      image={rucher.color !== "red" ? require("../assets/rucher.png") : require("../assets/rucher_red.png")}
    />
  )
))}

    {/* <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => {
    setIsModalVisible(false);
  }}
>
  <View style={styles.modalView}>
  <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Ajoute les infos de ta ruche !</AppText>
      </View>
  <Form
        initialValues={{
          author: auth.currentUser.uid ? auth.currentUser.uid : "",
          color : "green",
          counter : 0,
          title: "",
          nb_bees: "",
          latlng : {},
          description: "",
          
        }}
        onSubmit={handleAddRuche}
      >

      
        
        <FormField maxLength={255} name="title" placeholder="Nom de la rûche" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="nb_bees"
          placeholder="Nombre d'abeilles"
          width={220}
        />
        
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Ajouter la rûche" />
      </Form>
      </View>
 
</Modal> */}
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  addIcon: {
    position: "absolute",
    top: 80,
    right: 15,
    borderRadius: 32,
    padding: 10,
    backgroundColor: colors.primary,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    
  },
  modalView : {
    
    justifyContent: "center",
    borderRadius : 30,
    marginTop : 200,
    height : "40%",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity : 0.7,
    padding : 15,
    width: "100%",
    zIndex: 1,
  },
  HomeTitle : {
    fontSize: 45,
    fontFamily : "Caveat_700Bold",
    color: colors.secondary,
    textAlign : "center",
  },
});
