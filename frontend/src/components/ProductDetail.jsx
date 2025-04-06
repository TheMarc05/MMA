import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    // Date statice pentru produse
    const staticProducts = {
      1: {
        id: 1,
        name: "Geacă din piele neagră cu aplicații metalice",
        price: 449.99,
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Rock",
        description: "Geacă din piele autentică cu aplicații metalice și design modern. Perfectă pentru stilul rock, această geacă oferă confort și durabilitate. Cuplajul metalic și detaliile distinctive o fac o piesă unică în garderoba ta.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negru", "Maro", "Roșu"],
        rating: 4.5,
        reviews: 128,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      2: {
        id: 2,
        name: "Tricou cu logo Metallica - Black Album",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Rock",
        description: "Tricou cu logo-ul iconic al albumului Black Album al trupei Metallica. Material de înaltă calitate, cu design clasic care nu se demodează niciodată. Perfect pentru fani și nu numai.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negru", "Alb", "Gri"],
        rating: 4.8,
        reviews: 256,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      3: {
        id: 3,
        name: "Pantaloni skinny din piele cu ținte",
        price: 289.99,
        imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Rock",
        description: "Pantaloni skinny din piele autentică cu ținte metalice. Design modern și confortabil, perfect pentru stilul rock. Cuplajul metalic adaugă un aspect distinctiv și rebel.",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Negru", "Maro", "Roșu"],
        rating: 4.3,
        reviews: 95,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      4: {
        id: 4,
        name: "Curea cu ținte și aplicații metalice",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Rock",
        description: "Curea din piele autentică cu ținte și aplicații metalice. Design clasic care se potrivește cu orice outfit rock. Cuplajul metalic adaugă un aspect distinctiv și rebel.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negru", "Maro"],
        rating: 4.7,
        reviews: 78,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      5: {
        id: 5,
        name: "Tricou crop cu design colorat",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Pop",
        description: "Tricou crop cu design colorat și modern. Material de înaltă calitate, cu design care se potrivește cu orice outfit pop. Perfect pentru o look fresh și vibrant.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Roz", "Albastru", "Galben", "Verde"],
        rating: 4.6,
        reviews: 142,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      6: {
        id: 6,
        name: "Fustă plisată cu model floral",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Pop",
        description: "Fustă plisată cu model floral și design modern. Material de înaltă calitate, cu design care se potrivește cu orice outfit pop. Perfect pentru o look fresh și vibrant.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Alb", "Roz", "Albastru"],
        rating: 4.4,
        reviews: 87,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      7: {
        id: 7,
        name: "Sneakers cu platformă și detalii strălucitoare",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Pop",
        description: "Sneakers cu platformă și detalii strălucitoare. Design modern și confortabil, perfect pentru stilul pop. Detaliile strălucitoare adaugă un aspect distinctiv și vibrant.",
        sizes: ["36", "37", "38", "39", "40", "41", "42"],
        colors: ["Alb", "Negru", "Roz"],
        rating: 4.9,
        reviews: 203,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      8: {
        id: 8,
        name: "Rucsac mini cu lanț și aplicații",
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Pop",
        description: "Rucsac mini cu lanț și aplicații. Design modern și funcțional, perfect pentru stilul pop. Lanțul și aplicațiile adaugă un aspect distinctiv și elegant.",
        sizes: ["One Size"],
        colors: ["Negru", "Alb", "Roșu"],
        rating: 4.5,
        reviews: 156,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      9: {
        id: 9,
        name: "Rochie lungă din satin cu decolteu",
        price: 399.99,
        imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Jazz",
        description: "Rochie lungă din satin cu decolteu. Design elegant și sofisticat, perfect pentru stilul jazz. Materialul de înaltă calitate și designul rafinat o fac o piesă unică în garderoba ta.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Negru", "Roșu", "Albastru"],
        rating: 4.8,
        reviews: 112,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      10: {
        id: 10,
        name: "Costum complet din lână cu vesta",
        price: 599.99,
        imageUrl: "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Jazz",
        description: "Costum complet din lână cu vesta. Design elegant și sofisticat, perfect pentru stilul jazz. Materialul de înaltă calitate și designul rafinat îl fac o piesă unică în garderoba ta.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negru", "Gri", "Navy"],
        rating: 4.9,
        reviews: 87,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1594938298196-a35d0b5f2b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      },
      11: {
        id: 11,
        name: "Cămașă din mătase cu guler înalt",
        price: 189.99,
        imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        productStyle: "Jazz",
        description: "Cămașă din mătase cu guler înalt. Design elegant și sofisticat, perfect pentru stilul jazz. Materialul de înaltă calitate și designul rafinat o fac o piesă unică în garderoba ta.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Alb", "Negru", "Bej"],
        rating: 4.6,
        reviews: 134,
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ]
      }
    };

    // Simulăm o încărcare asincronă
    setTimeout(() => {
      if (staticProducts[id]) {
        setProduct(staticProducts[id]);
        setMainImage(staticProducts[id].imageUrl);
        setLoading(false);
      } else {
        setError("Produsul nu a fost găsit");
        setLoading(false);
      }
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vă rugăm să selectați mărimea și culoarea");
      return;
    }

    // Aici ar trebui să adăugăm logica pentru coș
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    addToCart(
      product, 
      quantity, 
      selectedSize, 
      selectedColor
    );
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vă rugăm să selectați mărimea și culoarea");
      return;
    }

    // Aici ar trebui să adăugăm logica pentru checkout
    navigate("/checkout");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Adăugăm steluțe pline
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star filled">★</span>);
    }
    
    // Adăugăm o jumătate de stea dacă este cazul
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half-filled">★</span>);
    }
    
    // Adăugăm steluțe goale pentru a completa până la 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-star-${i}`} className="star">★</span>);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Se încarcă...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-error">
        <h2>Eroare</h2>
        <p>{error}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Înapoi
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Produsul nu a fost găsit</h2>
        <p>Produsul pe care îl căutați nu există sau a fost eliminat.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Înapoi
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Înapoi
      </button>
      <div className="product-detail-content">
        <div className="product-detail-gallery">
          <div className="product-detail-main-image">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="product-detail-thumbnails">
            {product.additionalImages.map((image, index) => (
              <div key={index} className="product-detail-thumbnail">
                <img src={image} alt={`${product.name} - imagine ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-rating">
            <div className="product-detail-stars">
              {renderStars(product.rating)}
            </div>
            <span className="product-detail-reviews">
              ({product.reviews} review-uri)
            </span>
          </div>
          <div className="product-detail-price">
            <span className="price-amount">€{product.price}</span>
          </div>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-options">
            <div className="product-detail-option">
              <label htmlFor="size">Mărime:</label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className={selectedSize ? "selected" : ""}
              >
                <option value="">Selectează mărimea</option>
                {product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="product-detail-option">
              <label htmlFor="color">Culoare:</label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className={selectedColor ? "selected" : ""}
              >
                <option value="">Selectează culoarea</option>
                {product.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="product-detail-option">
              <label htmlFor="quantity">Cantitate:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-detail-actions">
            <button
              className={`add-to-cart-button ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? "Adăugat în coș!" : "Adaugă în coș"}
            </button>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Cumpără acum
            </button>
          </div>
          <div className="product-detail-meta">
            <div className="product-detail-meta-item">
              <span className="meta-label">Stil:</span>
              <span className="meta-value">{product.productStyle}</span>
            </div>
            <div className="product-detail-meta-item">
              <span className="meta-label">Disponibilitate</span>
              <span className={`meta-value ${product.inStock ? "in-stock" : "out-of-stock"}`}>
                {product.inStock ? "În stoc" : "Stoc epuizat"}
              </span>
            </div>
            <div className="product-detail-meta-item">
              <span className="meta-label">Livrare</span>
              <span className="meta-value">2-4 zile lucrătoare</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 