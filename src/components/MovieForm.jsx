import React, { useState, useEffect } from 'react';
import '../styles/MovieForm.css';
const AVAILABLE_GENRES = ['Action', 'Comedy', 'Drama', 'Crime', 'Sci-Fi', 'Thriller', 'Horror', 'Romance'];

function MovieForm({ movie, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    genres: [],
    inTheaters: false,
    rating: 0
  });

  const [errors, setErrors] = useState({});

  // If editing, populate form with movie data
  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name,
        description: movie.description,
        image: movie.image,
        genres: movie.genres,
        inTheaters: movie.inTheaters,
        rating: movie.rating
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selectedGenres = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value);
      }
    }
    setFormData({ ...formData, genres: selectedGenres });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Movie name is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    if (formData.genres.length === 0) {
      newErrors.genres = 'Please select at least one genre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    if (movie) {
      // Edit mode
      onSubmit(movie.id, formData);
    } else {
      // Add mode
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter movie name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter movie description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>

          <div className="form-group">
            <label>Genres *</label>
            <select
              multiple
              name="genres"
              value={formData.genres}
              onChange={handleGenreChange}
              className="multi-select"
            >
              {AVAILABLE_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <small>Hold Ctrl/Cmd to select multiple genres</small>
            {errors.genres && <span className="error-message">{errors.genres}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="inTheaters"
                checked={formData.inTheaters}
                onChange={handleChange}
              />
              In Theaters
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {movie ? 'Update' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;