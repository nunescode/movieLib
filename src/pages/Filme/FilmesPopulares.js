import React, { useEffect, useState } from "react";
import { Card, Text, TextInput } from "react-native-paper";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getPopularMovies } from "../../services/movieService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const imageWidth = width - 30;

const FilmesPopulares = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

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

  const toggleFavorite = async (id) => {
    try {
      const movie = movies.find((movie) => movie.id === id);
      const isFavorited = favorites.some((favorite) => favorite.id === id);

      let updatedFavorites = [];

      if (isFavorited) {
        updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
      } else {
        updatedFavorites = [...favorites, movie];
      }

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        "favoriteMovies",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Erro ao favoritar filme:", error);
    }
  };

  const filteredMovies = movies.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ScrollView style={{ padding: 15, backgroundColor: "#0D214F" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Início")}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Insira o nome do filme..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <Text style={styles.titleText}>
          Os filmes mais populares atualmente!
        </Text>
        <Text>{"\n"}</Text>
        {filteredMovies.map((item) => (
          <Card
            key={item.id}
            onPress={() => navigation.push("FilmesDetalhes", { id: item.id })}
            style={styles.card}
          >
            <Image
              style={styles.cardCover}
              source={{
                uri: "https://image.tmdb.org/t/p/w1280/" + item.poster_path,
              }}
            />

            <Card.Content style={styles.cardContent}>
              <Text style={styles.titleCard} variant="titleLarge">
                {item.title}
              </Text>
              <Text>{"\n"}</Text>
              <Text style={styles.subTitleCard} variant="bodyMedium">
                Avaliação:
              </Text>
              <Text variant="bodyMedium">{item.vote_average.toFixed(2)}</Text>

              {/* Botão para favoritar/desfavoritar */}
              <Text>{"\n"}</Text>
              <TouchableOpacity
                style={styles.favButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Text
                  style={{
                    color: favorites.some((f) => f.id === item.id)
                      ? "red"
                      : "yellow",
                    textAlign: "center",
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                >
                  {favorites.some((f) => f.id === item.id)
                    ? "Desfavoritar"
                    : "Favoritar"}
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default FilmesPopulares;

const styles = StyleSheet.create({
  card: {
    marginBottom: "15%",
  },
  cardCover: {
    flex: 1,
    height: imageWidth * 1.5,
    width: imageWidth,
    resizeMode: "cover",
  },
  cardContent: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: 5,
    padding: 15,
  },
  button: {
    marginLeft: 92,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  titleText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  titleCard: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleCard: {
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  favButton: {
    width: "50%",
    backgroundColor: "#DCDCDC",
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    borderColor: "#000",
  },
});
