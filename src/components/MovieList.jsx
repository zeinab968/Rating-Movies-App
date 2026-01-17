import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onEdit, onDelete, onRatingChange }) {
  if (movies.length === 0) {
    return <div className="empty-state">No movies found. Add your first movie!</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
          onRatingChange={onRatingChange}
        />
      ))}
    </div>
  );
}

export default MovieList;