import { useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { MovieType } from "../../../types";
import "./styles.scss";

const delay = 5000;

export default function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const timeoutRef: any = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    async function loadNowPlayingMovies() {
      const { data } = await api.get("movie/now_playing", {
        params: {
          api_key: process.env.REACT_APP_AUTH_KEY,
          // language: "pt-BR",
          page: 1,
        },
      });

      setMovies(data.results.slice(0, 10));
      setLoading(false);
    }

    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      loadNowPlayingMovies();
      resetTimeout();
    };
  }, [index]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading movies...</h2>
      </div>
    );
  }

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {movies.map((movie: MovieType, index) => (
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
      
    </div>
  );
}
