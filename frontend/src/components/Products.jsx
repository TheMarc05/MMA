import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductBox from "./container/ProductBox";
import "./Products.css";

const Products = () => {
  const { genre } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    // Date statice pentru fiecare stil muzical
    const staticProducts = {
      rock: [
        {
          id: 1,
          name: "Geacă din piele neagră cu aplicații metalice",
          price: 449.99,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.5
        },
        {
          id: 2,
          name: "Tricou cu logo Metallica - Black Album",
          price: 129.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.8
        },
        {
          id: 3,
          name: "Pantaloni skinny din piele cu ținte",
          price: 289.99,
          imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.3
        },
        {
          id: 4,
          name: "Curea cu ținte și aplicații metalice",
          price: 89.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.7
        },
        {
          id: 23,
          name: "Tricou cu logo AC/DC - Back in Black",
          price: 99.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.9
        },
        {
          id: 24,
          name: "Pantaloni cargo cu aplicații metalice",
          price: 159.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.6
        },
        {
          id: 25,
          name: "Căciulă cu urechi și aplicații metalice",
          price: 69.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Rock",
          rating: 4.4
        }
      ],
      pop: [
        {
          id: 5,
          name: "Tricou crop cu design colorat",
          price: 79.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.6
        },
        {
          id: 6,
          name: "Fustă plisată cu model floral",
          price: 119.99,
          imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.4
        },
        {
          id: 7,
          name: "Sneakers cu platformă și detalii strălucitoare",
          price: 159.99,
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.9
        },
        {
          id: 8,
          name: "Rucsac mini cu lanț și aplicații",
          price: 99.99,
          imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.5
        },
        {
          id: 26,
          name: "Rochie cu volane și model floral",
          price: 189.99,
          imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.7
        },
        {
          id: 27,
          name: "Tricou cu logo Taylor Swift - Midnights",
          price: 89.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.8
        },
        {
          id: 28,
          name: "Pantaloni cu talie înaltă și model geometric",
          price: 129.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Pop",
          rating: 4.5
        }
      ],
      jazz: [
        {
          id: 9,
          name: "Rochie lungă din satin cu decolteu",
          price: 399.99,
          imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.8
        },
        {
          id: 10,
          name: "Costum complet din lână cu vesta",
          price: 599.99,
          imageUrl: "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.9
        },
        {
          id: 11,
          name: "Cămașă din mătase cu guler înalt",
          price: 189.99,
          imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.6
        },
        {
          id: 12,
          name: "Pantaloni de smoking cu bandă laterală",
          price: 249.99,
          imageUrl: "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.7
        },
        {
          id: 29,
          name: "Papion din mătase cu model geometric",
          price: 79.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.8
        },
        {
          id: 30,
          name: "Rochie cocktail cu detaliu de pene",
          price: 349.99,
          imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.9
        },
        {
          id: 31,
          name: "Cămașă cu manșete și butoane de perle",
          price: 159.99,
          imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Jazz",
          rating: 4.7
        }
      ],
      techno: [
        {
          id: 13,
          name: "Geacă transparentă cu detaliu LED",
          price: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.8
        },
        {
          id: 14,
          name: "Pantaloni cargo cu benzi reflectorizante",
          price: 199.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.9
        },
        {
          id: 15,
          name: "Body cu model geometric și detaliu neon",
          price: 129.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.7
        },
        {
          id: 16,
          name: "Accesorii LED pentru evenimente",
          price: 79.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.6
        },
        {
          id: 32,
          name: "Tricou cu model holografic și detaliu LED",
          price: 149.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.8
        },
        {
          id: 33,
          name: "Pantaloni cu model geometric și detaliu neon",
          price: 179.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.7
        },
        {
          id: 34,
          name: "Geacă cu detaliu LED și fermoar cu lumini",
          price: 329.99,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Techno",
          rating: 4.9
        }
      ],
      trap: [
        {
          id: 17,
          name: "Adidași high-top cu detaliu auriu",
          price: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.9
        },
        {
          id: 18,
          name: "Hanorac oversized cu logo mare",
          price: 189.99,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.7
        },
        {
          id: 19,
          name: "Pantaloni cargo cu buzunare multiple",
          price: 159.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.8
        },
        {
          id: 20,
          name: "Lanț auriu supradimensionat cu pendent",
          price: 199.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.9
        },
        {
          id: 35,
          name: "Tricou cu logo Drake - Certified Lover Boy",
          price: 119.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.8
        },
        {
          id: 36,
          name: "Pantaloni cu talie joasă și logo mare",
          price: 169.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.7
        },
        {
          id: 37,
          name: "Geacă cu blugi și detaliu auriu",
          price: 249.99,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Trap",
          rating: 4.9
        }
      ],
      rom: [
        {
          id: 21,
          name: "Ie tradițională cusută manual cu motive românești",
          price: 349.99,
          imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Traditional Romanian Music",
          rating: 4.6
        },
        {
          id: 22,
          name: "Ie bărbătească tradițională cu broderie",
          price: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Traditional Romanian Music",
          rating: 4.5
        },
        {
          id: 38,
          name: "Cămașă tradițională cu motive din Maramureș",
          price: 279.99,
          imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Traditional Romanian Music",
          rating: 4.8
        },
        {
          id: 39,
          name: "Pantaloni tradiționali cu broderie",
          price: 229.99,
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Traditional Romanian Music",
          rating: 4.7
        },
        {
          id: 40,
          name: "Căciulă tradițională din lână",
          price: 149.99,
          imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          productStyle: "Traditional Romanian Music",
          rating: 4.9
        }
      ]
    };

    // Setăm produsele în funcție de stilul selectat
    if (genre && staticProducts[genre]) {
      setProducts(staticProducts[genre]);
    } else if (!genre) {
      // Dacă nu există un gen muzical specificat, afișăm toate produsele
      const allProducts = Object.values(staticProducts).flat();
      setProducts(allProducts);
    } else {
      setProducts([]);
    }
  }, [genre]);

  // Filtrare produse în funcție de termenul de căutare și filtru
  useEffect(() => {
    let result = [...products];
    
    // Filtrare după termenul de căutare
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrare după preț
    if (priceFilter !== "all") {
      result = result.filter(product => {
        const price = product.price;
        switch (priceFilter) {
          case "under100":
            return price < 100;
          case "100to200":
            return price >= 100 && price <= 200;
          case "200to300":
            return price > 200 && price <= 300;
          case "over300":
            return price > 300;
          default:
            return true;
        }
      });
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, priceFilter]);

  const formatGenreName = (genre) => {
    if (!genre) return "Toate stilurile muzicale";
    
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  if (loading) {
    return <div className="products-loading">Loading...</div>;
  }

  if (error) {
    return <div className="products-error">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Produse pentru {formatGenreName(genre)}</h1>
      
      <div className="products-controls">
        <div className="products-search">
          <input 
            type="text" 
            placeholder="Caută produse..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="products-filter">
          <select value={priceFilter} onChange={handleFilterChange}>
            <option value="all">Toate prețurile</option>
            <option value="under100">Sub 100 RON</option>
            <option value="100to200">100 - 200 RON</option>
            <option value="200to300">200 - 300 RON</option>
            <option value="over300">Peste 300 RON</option>
          </select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductBox
              key={product.id}
              id={product.id}
              image={product.imageUrl}
              title={product.name}
              price={product.price.toFixed(2)}
              rating={{ rate: product.rating || 4.5 }}
            />
          ))}
        </div>
      ) : (
        <p className="products-message">
          Nu există produse disponibile pentru {formatGenreName(genre)} momentan.
        </p>
      )}
    </div>
  );
};

export default Products;