import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const generateRandomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16); // Génère un chiffre hexadécimal
  }
  return color;
};

export default function ColorGenerator() {
  const [colors, setColors] = useState([]);

  const addNewColor = () => {
    let newColor = generateRandomColor();
    while (colors.includes(newColor)) { // Vérifie si la couleur a déjà été tirée
      newColor = generateRandomColor(); // Génère une nouvelle couleur
    }
    setColors([...colors, newColor]); // Ajoute la nouvelle couleur au tableau
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Générer une couleur" onPress={addNewColor} />
      {colors.map((color, index) => (
        <Text key={index} style={{ color: color, marginTop: 10 }}>
          {color}
        </Text>
      ))}
    </View>
  );
}
