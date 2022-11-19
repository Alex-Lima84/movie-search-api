import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { MovieType } from "../Home";
import "./styles.scss";

export default function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieType>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function showMovieInfo() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_AUTH_KEY,
          },
        })
        .then(({ data }) => {
          setMovie(data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Movie not found");
          navigate("/", { replace: true });
          return;
        });
    }
    showMovieInfo();

    return () => {
      setMovie({});
      setLoading(true);
      console.log("Component unmounted");
    };
  }, [id, navigate]);

  function saveMovie() {
    const myMoviesList: string | null = localStorage.getItem("@moviesList");  

    let savedMovies = myMoviesList ? JSON.parse(myMoviesList) : [];

    const movieAlreadySaved = savedMovies.some(
      (savedMovie: { id: number | undefined }) => savedMovie.id === movie.id
    );

    if (movieAlreadySaved) {
      alert("Movie already saved in the list! 😃");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@moviesList", JSON.stringify(savedMovies));
    alert("Movie saved! 😊");
  }

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
      <h3>Overview</h3>
      <span>{movie.overview}</span>
      <h4>Rating: {movie.vote_average!.toFixed(1)} /10</h4>
      <div className="movie-buttons-container">
        <button onClick={saveMovie}>Save</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${movie.title} trailer official`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
