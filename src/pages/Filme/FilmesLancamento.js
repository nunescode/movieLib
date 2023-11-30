import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { getNowPlayingMovies } from "../../services/movieService"; // Você pode ter um serviço específico para filmes em lançamento

const { width } = Dimensions.get("window");
const imageWidth = width - 30;

const FilmesLancamento = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getNowPlayingMovies(); // Substitua esta chamada pelo serviço adequado para filmes em lançamento
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ScrollView style={{ padding: 15, backgroundColor: '#0D214F'}}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Início")}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titleText}>Filmes em Cartaz</Text>
      <Text>{"\n"}</Text>
      
      {movies.map((item) => (
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
            <Text style={styles.titleCard} variant="titleLarge">{item.title}</Text>
            <Text style={styles.subTitleCard} variant="bodyMedium">Avaliação:</Text>
            <Text variant="bodyMedium">{item.vote_average.toFixed(2)}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default FilmesLancamento;

const styles = StyleSheet.create({
    card: {
      marginBottom: "15%",
    },
    cardCover: {
        width: "100%",
        height: imageWidth * 1.5, 
        resizeMode: "cover", 
      },
    cardContent: {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      marginTop: 5,
      padding: 15,
      paddingVertical: 10,
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
      fontSize: 24,
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
    text: {
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  