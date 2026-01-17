import { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import { fetchMovies, addMovie, updateMovie, deleteMovie, updateRating } from './services/movieService';
import './styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please make sure JSON server is running.');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = movies.length > 0
    ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
    : 0;

  const handleAddMovie = async (movieData) => {
    try {
      const newMovie = await addMovie(movieData);
      setMovies([...movies, newMovie]);
      setIsFormOpen(false);
    } catch (err) {
      alert('Failed to add movie');
    }
  };

  const handleUpdateMovie = async (id, movieData) => {
    try {
      const updatedMovie = await updateMovie(id, movieData);
      setMovies(movies.map(m => m.id === id ? updatedMovie : m));
      setIsFormOpen(false);
      setMovieToEdit(null);
    } catch (err) {
      alert('Failed to update movie');
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        setMovies(movies.filter(m => m.id !== id));
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  const handleRatingChange = async (id, newRating) => {
    try {
      await updateRating(id, newRating);
      setMovies(movies.map(m => m.id === id ? { ...m, rating: newRating } : m));
    } catch (err) {
      alert('Failed to update rating');
    }
  };

  // NEW: Remove all ratings function
  const handleRemoveRatings = async () => {
    if (window.confirm('Are you sure you want to remove all ratings? This will set all movie ratings to 0.')) {
      try {
        // Update all movies to have rating 0
        const updatePromises = movies.map(movie => 
          updateRating(movie.id, 0)
        );
        
        await Promise.all(updatePromises);
        
        // Update local state
        setMovies(movies.map(m => ({ ...m, rating: 0 })));
        
        alert('All ratings have been removed successfully!');
      } catch (err) {
        alert('Failed to remove ratings');
      }
    }
  };

  const handleEdit = (movie) => {
    setMovieToEdit(movie);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setMovieToEdit(null);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error-page">{error}</div>;
  }

  return (
    <div className="app">
      <Header 
        totalMovies={movies.length}
        averageRating={averageRating}
        onAddClick={() => setIsFormOpen(true)}
        onRemoveRatings={handleRemoveRatings}
      />
      
      <MovieList 
        movies={movies}
        onEdit={handleEdit}
        onDelete={handleDeleteMovie}
        onRatingChange={handleRatingChange}
      />

      {isFormOpen && (
        <MovieForm
          movie={movieToEdit}
          onSubmit={movieToEdit ? handleUpdateMovie : handleAddMovie}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}

export default App;