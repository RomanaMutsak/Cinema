import "./MovieCard.css";
import { Link } from "react-router-dom";
import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} className="poster-img" />
      <div className="card-content">
        <h3>{movie.title}</h3>
        <p className="description">{movie.description}</p>
        <p><strong>Жанр:</strong> {movie.genre}</p>
        <p><strong>Сеанс:</strong> {movie.datetime}</p>
        <Link to={`/booking/${movie.id}`}>
        <button className="book-btn">Забронювати</button>
      </Link>
      </div>
    </div>
  );
}

export default MovieCard;