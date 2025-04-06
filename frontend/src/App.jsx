import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import Layout from "./components/Layout";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainShop from "./components/MainShop";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const mainTimeline = gsap.timeline();

    gsap.set(".main-content", { opacity: 0 });
    gsap.set([".logo", ".nav-menu", ".header-right"], { opacity: 0 });

    mainTimeline.to({}, { duration: 0.8 });

    mainTimeline.fromTo(
      [".logo", ".nav-menu", ".header-right"],
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    mainTimeline.add(() => {
      window.headerAnimationComplete = true;
      setContentVisible(true);
    });

    mainTimeline.to(".main-content", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <CartProvider>
      <Router>
        <Layout>
          <div className="app">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/MainShop" element={<MainShop />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:genre" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
