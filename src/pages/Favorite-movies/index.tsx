import { useState, useEffect } from "react";
import { MovieType } from "../Home";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function FavoriteMovies() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favoriteMoviesList = localStorage.getItem("@moviesList");
    setFavoriteMovies(JSON.parse(favoriteMoviesList!) || []);
  }, []);

  function deleteMovie(id: number | undefined) {
    let filteredMovies = favoriteMovies.filter((item: any) => {
      return item.id !== id;
    });
    setFavoriteMovies(filteredMovies);
    localStorage.setItem("@moviesList", JSON.stringify(filteredMovies));
  }

  return (
    <div className="favorite-movies-container">
      <h1>My movies list</h1>

      {favoriteMovies.length === 0 && <p>Your list is empty! 😢</p>}

      <ul>
        {favoriteMovies.map((movie: MovieType) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>See details</Link>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
