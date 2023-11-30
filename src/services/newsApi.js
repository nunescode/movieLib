import axios from 'axios';

const baseURL = 'https://newsapi.org/v2'; 

const newsAPIService = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_NEWS_API_KEY}`
  }
});

async function fetchNoticias() {
  try {
    const response = await newsAPIService.get('/top-headlines', {
      params: {
        category: 'entertainment',
        country: 'br'
      }
    });

    console.log('Notícias:', response.data);
    return response.data.articles; 
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }
}

export default fetchNoticias;