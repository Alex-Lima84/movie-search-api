import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { MovieType } from "../Home";
import "./styles.scss";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function showMovieInfo() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_AUTH_KEY,
            language: "pt-BR",
          },
        })
        .then(({ data }) => {
          setMovie(data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
        });
    }
    showMovieInfo();

    return () => {
      setMovie({});
      setLoading(true);
      console.log("Componente foi desmontado");
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading movie info...</h2>
      </div>
    );
  }

  return (
    <div className="movie-info-container">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <h4>Avaliação: {movie.vote_average!.toFixed(1)} /10</h4>
      <div className="movie-buttons-container">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
    </div>
  );
}
