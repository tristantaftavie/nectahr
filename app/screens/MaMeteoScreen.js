import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import axios from "axios";
import AppText from "../components/Text";
import LottieView from "lottie-react-native";
import { useFocusEffect } from '@react-navigation/native';

import colors from "../config/colors";

import { fromUnixTime, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const convertUnixTimeToParisTime = (unixTime) => {
  const timeZone = 'Europe/Paris';
  const date = fromUnixTime(unixTime);
  const zonedDate = utcToZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy à HH:mm');
};


function MaMeteoScreen() {
    const [selectedDayData, setSelectedDayData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const apiKey = "51f769e15e27357283ea70fb8ad40edd";

    const city = "Lille";
    const [loading, setLoading] = useState(false);

    const fetchWeatherForecast = async () => {
      try {
          setLoading(true);
          const response = await axios.get(
              `https://api.openweathermap.org/data/3.0/onecall?lat=50.606301&lon=3.135407&appid=${apiKey}&lang=fr`
          );
          

          setForecastData(response.data);
          console.log("forecast Data : ", response.data.current);
          setSelectedDayData(response.data.current);
          setLoading(false);
      } catch (error) {
          console.error("Error fetching weather forecast: ", error);
      }
  };
  useEffect(() => {
      fetchWeatherForecast();
    }, []);
  

    const handleDaySelection = (index) => {
        setSelectedDayData(forecastData[index]);
    };

    // const formattedDate = ;
    // console.log(formattedDate); // Affichera la date et l'heure formatées


    return (
        <ImageBackground
            blurRadius={8}
            source={require("../assets/wallpaper.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
          <View style={styles.container}>
        <AppText style={styles.HomeTitle}>Ma station météo 🌤️ </AppText>
      </View>
      <ScrollView style={{width : "100%"}}> 
           
            {/* Weather details container */}
            <View style={styles.weatherContainer}>
                {selectedDayData && (
                    <>  
                    <AppText style={styles.dateText}>Le {convertUnixTimeToParisTime(selectedDayData.dt)}</AppText>
                    <View style={{flexDirection: "row"}}> 
                    <Image
                    source={{
                        uri: `https://openweathermap.org/img/wn/${selectedDayData.weather[0].icon}.png`,
                    }}
                    style={styles.weatherIcon}
                />    
                  
                        <View>
                        
                        

                        <AppText style={styles.temperatureText}>
                            {Math.round(selectedDayData.temp - 273.15)}°C </AppText>
                        <AppText style={styles.descriptionText}>
                            {selectedDayData.weather[0].description}  </AppText>
                            
                          </View>
                        </View>
                        
                        
                    </>
                )}
            </View>

            <View style={styles.weatherContainer}>
                {selectedDayData && (
                    <>  
                    <AppText style={[styles.dateText, {marginBottom : 10}]}>Données météorologiques</AppText>
                    
                    <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Température ressentie</AppText>
                            <AppText style={styles.dataText}>
                            {Math.round(selectedDayData.feels_like - 273.15)}°C </AppText>
                          </View>

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Pression atmosphérique</AppText>
                            <AppText style={styles.dataText}>
                            {selectedDayData.pressure} Pa</AppText>
                          </View>

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Humidité</AppText>
                            <AppText style={styles.dataText}>
                            {selectedDayData.humidity}%</AppText>
                          </View>
                        <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Nuages</AppText>
                            <AppText style={styles.dataText}>
                            {selectedDayData.clouds}%</AppText>
                          </View>

                          

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Indice UV </AppText>
                            <AppText style={styles.dataText}>
                            {selectedDayData.uvi}</AppText>
                          </View>

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Visibilité </AppText>
                            <AppText style={styles.dataText}>
                            {selectedDayData.visibility / 1000} km</AppText>
                          </View>

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Vitesse des vents</AppText>
                            <AppText style={styles.dataText}>
                            {Math.round(selectedDayData.wind_speed * 3.6)} km/h</AppText>
                          </View>
                        
                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Lever </AppText>
                            <AppText style={styles.dataText}>
                            {convertUnixTimeToParisTime(selectedDayData.sunrise)}</AppText>
                          </View>

                          <View style={{flexDirection: "row", justifyContent :"space-between" }}>
                        <AppText style={styles.dataText}>Coucher </AppText>
                            <AppText style={styles.dataText}>
                            {convertUnixTimeToParisTime(selectedDayData.sunset)}</AppText>
                          </View>
                        
                        
                    </>
                )}
            </View>



            {/* Days container */}
            {/* <View style={styles.daysContainer}>
                <ScrollView contentContainerStyle={styles.daysScrollContainer}>
                    {forecastData.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayItem,
                                selectedDayData === day && styles.selectedDayItem,
                            ]}
                            onPress={() => handleDaySelection(index)}
                        >
                            <Text style={styles.dayText}>{day.dt_txt}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View> */}

            {/* Lottie animation */}
            {/* <View>
                <LottieView
                    source={require("../assets/lottie/weather_city.json")}
                    style={styles.animation}
                    autoPlay
                    loop
                />
            </View> */}

            {/* Loading indicator */}
            {/* <LoadingIndicator loading={loading}/> */}
            
              
            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: "center",
    },
    container: {
      marginTop: 60,
      marginBottom : 20,
      
    },

    HomeTitle : {
      fontSize: 45,
      fontFamily : "Caveat_700Bold",
      color: colors.secondary,
      textAlign : "center",
    },
    weatherContainer: {
        maxHeight: 400,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: 15,
        borderRadius: 25,
        
        marginVertical: 10,
        marginHorizontal : 20,
        opacity : 0.8,
    },
    animation: {
        width: "100%",
    },
    dateText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "black",
        textAlign : "center",
    },
    temperatureText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "black",
    },
    descriptionText: {
        fontSize: 24,
        color: "black",
    },
    weatherIcon: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginRight : 40,
    },
    daysContainer: {
        flex: 1,
        width: "80%",
        maxHeight: 150,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    daysScrollContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    dayItem: {
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    selectedDayItem: {
        borderColor: "white",
        borderRadius: 10,

        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    dayText: {
        color: "black",
    },
    dataText : {
      fontSize: 24,
        color: "black",
        justifyContent : "flex-end"
    }
});

export default MaMeteoScreen;
