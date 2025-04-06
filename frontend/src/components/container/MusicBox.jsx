import { Link } from "react-router-dom";
import "./MusicBox.css";

const MusicBox = ({ genre, image }) => {
  const formatGenreName = (genre) => {
    const genreNames = {
      rock: "Rock",
      pop: "Pop",
      jazz: "Jazz",
      techno: "Techno",
      trap: "Trap",
      rom: "Traditional Romanian Music",
    };
    return genreNames[genre] || genre.charAt(0).toUpperCase() + genre.slice(1);
  };

  // Convertim genul muzical în formatul corect pentru URL
  const getGenreUrl = (genre) => {
    const genreMap = {
      "Rock": "rock",
      "Pop": "pop",
      "Jazz": "jazz",
      "Techno": "techno",
      "Trap": "trap",
      "Traditional Romanian Music": "rom"
    };
    return genreMap[genre] || genre.toLowerCase();
  };

  return (
    <div className="music-box">
      <Link to={`/products/${getGenreUrl(genre)}`}>
        <div className="music-image">
          <img src={image} alt={formatGenreName(genre)} />
          <div className="music-overlay">
            <h2 className="music-overlay-title">{formatGenreName(genre)}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MusicBox;
