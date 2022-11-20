import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { MovieType } from "../../types";
import "./styles.scss";

import notAvailable from "../../assets/Image-Not-Available.png";

export default function SearchMovie() {
  const [movieTitle, setMovieTitle] = useState([]);
  const [movieInfo, setMovieInfo] = useState<MovieType>();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick(id: number | undefined) {
    setLoading(true);
    if (id) {
      const { data } = await api.get(`movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_AUTH_KEY,
        },
      });
      setMovieInfo(data);
      setMovieTitle([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function searchMovies() {
      if (query) {
        const { data } = await api.get("search/movie", {
          params: {
            api_key: process.env.REACT_APP_AUTH_KEY,
            page: 1,
            query,
          },
        });
        setMovieTitle(data.results.slice(0, 10));
        setLoading(false);
      } else {
        return;
      }
    }
    searchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading movies...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="search-movie-container">
        <form className="search-movie-form">
          <h2>Find here your favorite movie</h2>
          <input onChange={(e: any) => setQuery(e.target.value)} />
        </form>
      </div>
      <div className="movie-title-container">
        {movieTitle.map((movie: MovieType) => (
          <h2 key={movie.id} onClick={() => handleClick(movie.id)}>
            {movie.title}
          </h2>
        ))}
      </div>
      {movieInfo ? (
        <div className="selected-movie-info-container">
          {movieInfo.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${
                movieInfo!.poster_path
              }`}
              alt={movieInfo!.title}
            />
          ) : (
            <img src={notAvailable} alt="not available" />
          )}

          <Link to={`/movie/${movieInfo!.id}`}>See more</Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
