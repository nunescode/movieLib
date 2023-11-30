import React, { useEffect, useState } from "react";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import movieService from "../../services/movieService";
import { ScrollView, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const FilmesDetalhes = ({ route }) => {

  const navigation = useNavigation();

  const [filme, setFilme] = useState({});
  const [atores, setAtores] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    movieService.get(`/movie/${id}`).then((resultado) => {
      setFilme(resultado.data);
    });

    movieService.get(`/movie/${id}/credits`).then((resultado) => {
      setAtores(resultado.data.cast);
    });
  }, []);

  return (
    <>
      <ScrollView style={{ padding: 15, backgroundColor: "#0D214F" }}>
        <Card style={{ marginBottom: 15 }}>
          <Card.Cover
            source={{
              uri: "https://image.tmdb.org/t/p/original/" + filme.backdrop_path,
            }}
          />
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge">{filme.title}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.titleText}>Descrição do filme: </Text>
            <Text style={styles.text} variant="bodyMedium">
              {filme.overview}
            </Text>
          </Card.Content>
        </Card>
        <Card mode="outlined" style={{ marginBottom: 15 }}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.titleText} variant="bodyMedium">
              Orçamento:{" "}
            </Text>
            <Text>{filme.budget}</Text>
            <Text style={styles.titleText} variant="bodyMedium">
              Voto:{" "}
            </Text>
            <Text>{filme.vote_average}</Text>
            <Text style={styles.titleText} variant="bodyMedium">
              Duração:{" "}
            </Text>
            <Text>{filme.runtime} min.</Text>
            <Text style={styles.titleText} variant="bodyMedium">
              Lançamento:{" "}
            </Text>
            <Text>{filme.release_date}</Text>
          </Card.Content>
        </Card>

        <Text>{"\n"}</Text>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", color: "white", fontSize: 22 }}
        >
          Atores deste filme:
        </Text>
        {atores.map((item) => (
          <Card
            key={item.id}
            mode="outlined"
            style={{ marginBottom: 15 }}
          >
            <Card.Title
              title={item.character}
              subtitle={item.name}
              left={(props) => (
                <Avatar.Image
                  size={50}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w500/" + item.profile_path,
                  }}
                />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  onPress={() => {}}
                />
              )}
            />
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default FilmesDetalhes;

const styles = StyleSheet.create({
  card: {
    marginBottom: "15%",
  },
  cardCover: {
    flex: 1,
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
    color: "#000",
    fontSize: 18,
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
