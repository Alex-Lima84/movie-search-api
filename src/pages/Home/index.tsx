import "./styles.scss";
import MovieCarousel from "../../components/Movie-carousel";
import SearchMovie from "../../components/Search-movie";

export default function Home() {
  return (
    <>
      <MovieCarousel />
      <SearchMovie />
    </>
  );
}
