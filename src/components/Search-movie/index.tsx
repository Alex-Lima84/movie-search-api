import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { MovieType } from "../../types";
import "./styles.scss";

export default function SearchMovie() {
  const [searchMovie, setSearchMovie] = useState([]);
  const [query, setQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    setLoading(true)
    e.preventDefault();
    setQuery(queryValue);
  };

  async function searchMovies() {
    if (query) {
      const { data } = await api.get("search/movie", {
        params: {
          api_key: process.env.REACT_APP_AUTH_KEY,
          page: 1,
          query,
        },
      });
      setSearchMovie(data.results.slice(0, 5));
      setLoading(false);
    } else {
      return;
    }
  }

  console.log(searchMovie);

  useEffect(() => {
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
        <form onSubmit={handleSubmit}>
          <h2>Find here your favorite movie</h2>
          <input onChange={(e: any) => setQueryValue(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="movie-info-container">
        {searchMovie.map((movie: MovieType) => (
          <div className="slide" key={movie.id}>
            <div className="movie-container">
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/movie/${movie.id}`}>See more</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
