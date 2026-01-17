import '../styles/Header.css';

function Header({ totalMovies, averageRating, onAddClick, onRemoveRatings }) {
  return (
    <header className="header">
      <div className="header-info">
        <h1>Movie Rating App</h1>
        <div className="stats">
          <span>Total Movies: {totalMovies}</span>
          <span>/</span>
          <span>Average Rating: {averageRating}</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn-secondary" onClick={onRemoveRatings}>
          Remove Ratings
        </button>
        <button className="btn-primary" onClick={onAddClick}>
          Add Movie
        </button>
      </div>
    </header>
  );
}

export default Header;