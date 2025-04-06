import MusicBox from "./container/MusicBox";
import "./MainShop.css";

const musicGenre = [
  {
    genre: "Rock",
    image: "/images/rock.jpg",
  },
  {
    genre: "Pop",
    image: "/images/pop.jpg",
  },
  {
    genre: "Jazz",
    image: "/images/jazzClassic.jpg",
  },
  {
    genre: "Techno",
    image: "/images/techno.jpg",
  },
  {
    genre: "Trap",
    image: "/images/trap.jpg",
  },
  {
    genre: "Traditional Romanian Music",
    image: "/images/rom.jpg",
  },
];

const MainShop = () => {
  return (
    <div className="main-shop-container">
      <div className="dynamic-bg">
        <div className="music-grid">
          {musicGenre.map(({ genre, image }) => (
            <MusicBox key={genre} genre={genre} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainShop;