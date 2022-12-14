import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Error from "./pages/Error";
import FavoriteMovies from "./pages/Favorite-movies";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorites" element={<FavoriteMovies />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
