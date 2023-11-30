import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, View } from "react-native";
import { getTopRatedMovies } from "../../services/movieService";

const { width } = Dimensions.get("window");
const imageWidth = width - 30;

const FilmesAvaliados = ({ navigation }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <ScrollView style={{ padding: 15, backgroundColor: '#0D214F'}}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Início")}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titleText}>Os filmes mais bem avaliados pela comunidade!</Text>
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
    </>
  );
};

export default FilmesAvaliados;

const styles = StyleSheet.create({
  card: {
    marginBottom: '15%',
  },
  cardCover: {
    flex: 1,
    height: imageWidth * 1.7,
    width: imageWidth,
    resizeMode: "cover",
  },
  cardContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    padding: 15,
  },
  button: {
    marginLeft: 92,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCard: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleCard: {
    fontWeight: 'bold'
  }
});
