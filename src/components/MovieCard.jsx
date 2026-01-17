import React from 'react';
import '../styles/MovieCard.css';
import RatingStars from './RatingStars';

function MovieCard({ movie, onEdit, onDelete, onRatingChange }) {
  const handleEdit = () => {
    onEdit(movie);
  };

  const handleDelete = () => {
    onDelete(movie.id);
  };

  const handleRating = (newRating) => {
    onRatingChange(movie.id, newRating);
  };

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img src={movie.image} alt={movie.name} className="movie-image" />
        {movie.inTheaters && (
          <span className="in-theaters-badge">In Theaters</span>
        )}
        <div className="rating-badge">
          <span className="rating-star">⭐</span>
          <span className="rating-number">{movie.rating}</span>
        </div>
      </div>

      <div className="movie-content">
        <h3 className="movie-title">{movie.name}</h3>
        
        <div className="movie-genres">
          {movie.genres.map((genre, index) => (
            <span key={index} className="genre-badge">{genre}</span>
          ))}
        </div>

        <p className="movie-description">{movie.description}</p>

        <div className="movie-rating">
          <span className="rating-label">Rating: ({movie.rating}/5)</span>
          <RatingStars 
            rating={movie.rating} 
            onRatingChange={handleRating}
          />
        </div>

        <div className="movie-actions">
          <button className="btn-edit" onClick={handleEdit}>
            ✏️ Edit
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;