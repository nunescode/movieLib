import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const movieService = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
    language: "pt-BR",
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await movieService.get("movie/popular");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data);
      console.error("Status do erro:", error.response.status);
      console.error("Headers da resposta:", error.response.headers);
    } else if (error.request) {
      console.error(
        "Solicitação feita, mas sem resposta do servidor:",
        error.request
      );
    } else {
      console.error("Erro ao configurar a solicitação:", error.message);
    }
    throw new Error("Erro ao obter filmes populares");
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await movieService.get("movie/top_rated");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data);
      console.error("Status do erro:", error.response.status);
      console.error("Headers da resposta:", error.response.headers);
    } else if (error.request) {
      console.error(
        "Solicitação feita, mas sem resposta do servidor:",
        error.request
      );
    } else {
      console.error("Erro ao configurar a solicitação:", error.message);
    }
    throw new Error("Erro ao obter filmes mais bem avaliados");
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await movieService.get("movie/now_playing");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data);
      console.error("Status do erro:", error.response.status);
      console.error("Headers da resposta:", error.response.headers);
    } else if (error.request) {
      console.error(
        "Solicitação feita, mas sem resposta do servidor:",
        error.request
      );
    } else {
      console.error("Erro ao configurar a solicitação:", error.message);
    }
    throw new Error("Erro ao obter filmes em exibição");
  }
};

export default movieService;
