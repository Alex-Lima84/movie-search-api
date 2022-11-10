import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.scss";

export type MovieType = {
  title?: string;
  id?: number;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadNowPlayingMovies() {
      const { data } = await api.get("movie/now_playing", {
        params: {
          api_key: process.env.REACT_APP_AUTH_KEY,
          language: "pt-BR",
          page: 1,
        },
      });

      setMovies(data.results.slice(0, 10));
      setLoading(false);
      console.log(data.results.slice(0, 10));
    }
    loadNowPlayingMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading movies...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movies-list-container">
        {movies.map((movie: MovieType) => {
          return (
            <article key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
