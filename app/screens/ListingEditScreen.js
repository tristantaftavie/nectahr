import React, { useState } from "react";
import { StyleSheet,Button, TextInput, Alert, View } from "react-native";
import colors from "../config/colors";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import { useFormikContext } from "formik";
import AppButton from "../components/Button";
import AppText from "../components/Text";
import {initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {firebaseConfig} from "../../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { auth } from "../auth/firebase";
import { ScrollView } from "react-native-gesture-handler";




function ListingEditScreen({navigation, route}) {

  const newMarkerCoords = route.params?.newMarkerCoords;
  console.log("mon point depuis le form", newMarkerCoords);
  // const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const [adressePerso, setAdressePerso] = useState(false);
  
  
  
  // const latitude = location ? location.latitude : 50.606301; // default latitude if location is undefined
  // const longitude = location ? location.longitude : 3.135407;

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handlePost = async (listing, { resetForm }) => {
    try {
      const docRef = await addDoc(collection(db, "ruches"), {...listing}, (progress) => setProgress(progress));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    resetForm();
  };

  const [address, setAddress] = useState('');
  const apiKey = 'AIzaSyDuG2h6gR2wWYdBDCSZpTb74XKK3StTiw0'; // Remplacez par votre clé API


  const fetchCoordinates = async () => {
    try {
      const formattedAddress = address.replace(/ /g, '+');
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        Alert.alert("Localisation", `Latitude: ${location.lat}, Longitude: ${location.lng}`);
      } else {
        Alert.alert("Erreur", "Adresse introuvable");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Problème de requête API");
    }
  };



  
  // const handleSubmit = async (listing) => {
  //   setProgress(0);
  //   setUploadVisible(true);
  //   const result = await listingsApi.addListing(
  //     { ...listing, location },
  //     (progress) => setProgress(progress)
  //   );

  //   if (!result.ok) {
  //     setUploadVisible(false);
  //     return alert("Could not save the listing");
  //   }

  //   resetForm();
  // };

  const handleAddRuche = async (rucheDetails) => {
    const newRuche = {
      ...rucheDetails,
      latlng: newMarkerCoords,
    };
    const docRef = await addDoc(collection(db, "ruches"), {...rucheDetails})
    setUploadVisible(true);
    
  };

  const onDoneFunction = () => {
    setUploadVisible(false);
    navigation.navigate("Carte");
  }


  return (
    <Screen style={styles.container}>

      <UploadScreen
        onDone={() => onDoneFunction()}
        progress={progress}
        visible={uploadVisible}
        Text="Ruche ajoutée à la carte !"
      />
      { !uploadVisible &&
      <Form
        initialValues={{
          author: auth.currentUser.uid ? auth.currentUser.uid : "",
          color : "green",
          counter : 0,
          title: "",
          nb_bees: "",
          latlng : {latitude: newMarkerCoords.latitude, longitude: newMarkerCoords.longitude},
          description: "",
          
        }}
        onSubmit={handleAddRuche}
      >
        <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Ajoute une ruche à la carte !   🐝</AppText>
      </View>
        {/* <View style={{ flexDirection : "row", width: "100%"}}>
          <View style={{flex: 0.5, marginHorizontal : 5}}>
            <AppButton title="Ajout à ma position" color={adressePerso ? "light" : "primary" } onPress={() => setAdressePerso(false)}/>
          </View>
          <View style={{flex: 0.5, marginHorizontal : 5}}>
          <AppButton title="ajout manuel" color={adressePerso ? "primary" : "light"} onPress={() => setAdressePerso(true)}/>
          </View>
          </View> */}
          <ScrollView>
        <FormField maxLength={255} name="title" placeholder="Nom de la rûche" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="nb_bees"
          placeholder="Nombre d'abeilles"
          width={220}
        />
        {/* { adressePerso && <><FormField
          keyboardType="numeric"
          maxLength={8}
          name="latitude"
          placeholder="Latitude" // Convert to string if needed
          width={220}
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="longitude"
          placeholder="Longitude" // Convert to string if needed
          width={220}
        /></>} */}


      {/* <FormField
        name="address"
        placeholder={address ? address : "Entrez une adresse"} // Convert to string if needed
      />
      <Button title="Trouver la localisation" onPress={fetchCoordinates} /> */}
        
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Ajouter la rûche" />
        </ScrollView>
      </Form> }

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignContent : "center",
    justifyContent : 'center',
  },
  HomeTitle : {
    fontSize: 35,
    fontFamily : "Caveat_700Bold",
    color: colors.secondary,
    textAlign : "center",
    marginBottom : 10,  },
});
export default ListingEditScreen;
