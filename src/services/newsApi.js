import axios from 'axios';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const baseURL = 'https://newsapi.org/v2'; 

const newsAPIService = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`
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
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }
}

export default fetchNoticias();
