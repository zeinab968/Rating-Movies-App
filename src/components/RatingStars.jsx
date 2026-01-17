import React, { useState } from 'react';
import '../styles/RatingStars.css';
function RatingStars({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    onRatingChange(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : 'empty'}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          {star <= (hoverRating || rating) ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default RatingStars;