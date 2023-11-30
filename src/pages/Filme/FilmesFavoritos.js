import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const FilmesFavoritos = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favoriteMovies');
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar filmes favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  const navigateToDetails = (id) => {
    navigation.navigate('FilmesDetalhes', { id });
  };

  const renderFavoriteMovie = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
      <View style={styles.movieContainer}>
        <Image
          style={styles.moviePoster}
          source={{ uri: "https://image.tmdb.org/t/p/w1280/" + item.poster_path }}
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieRating}>Avaliação: {item.vote_average.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Início')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Meus Filmes Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteMovie}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FilmesFavoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D214F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  movieContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  moviePoster: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  movieRating: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
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
});
