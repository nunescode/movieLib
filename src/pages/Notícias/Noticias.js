import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from 'react-native';
import fetchNoticias from '../../services/newsApi'

export default function Noticias() {

  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetchNoticias().then((articles) => {
      setNoticias(articles);
    });
  }, []);

  const renderNoticia = ({ item }) => {
    return (
      <TouchableOpacity style={styles.noticiaContainer} onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.titulo}>{item.title}</Text>
        <Text style={styles.descricao}>{item.description}</Text>
        <Text style={styles.fonte}>{item.source.name}</Text>
        <Text style={styles.data}>{formatarData(item.publishedAt)}</Text>
      </TouchableOpacity>
    );
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias de Entretenimento</Text>
      <FlatList
        data={noticias}
        renderItem={renderNoticia}
        keyExtractor={(item) => item.url}
        style={styles.listaNoticias}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listaNoticias: {
    marginBottom: 10,
  },
  noticiaContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 8,
  },
  fonte: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  data: {
    fontSize: 14,
    color: 'gray',
  },
});
