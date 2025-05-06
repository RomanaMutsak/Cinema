import React, { useState } from "react";
import { movies as movieData } from "../data/movies";
import MovieList from "../components/MovieList";
import "../App.css";

function Home() {
  const [query, setQuery] = useState("");

  const filteredMovies = movieData.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <h1>MOONVIE</h1>
      <input
        type="text"
        placeholder="Пошук фільму..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default Home;