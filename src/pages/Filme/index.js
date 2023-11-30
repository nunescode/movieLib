import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";

export default function Index() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favoriteMovies");
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Erro ao carregar filmes favoritos:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={300}
        source={require("../../../assets/logofilme.png")}
      ></Avatar.Image>

      <Text style={styles.title}>Bem-vindo à pagina de filmes!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FilmesLancamento")}
      >
        <Text style={styles.buttonText}>Filmes em Cartaz</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FilmesPopulares")}
      >
        <Text style={styles.buttonText}>Ver Filmes Populares</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FilmesAvaliados")}
      >
        <Text style={styles.buttonText}>Filmes Mais Avaliados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("FilmesFavoritos", { favorites: favorites })
        }
      >
        <Text style={styles.buttonText}>Meus Filmes Favoritos</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Explore um mundo de entretenimento cinematográfico com os filmes mais
        populares, os mais bem avaliados e os seus favoritos!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D214F",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
