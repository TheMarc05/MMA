import React, { useState, useEffect } from "react";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  // Verifică dacă există un token salvat la încărcarea componentei
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Aici puteți verifica validitatea token-ului sau să-l folosiți pentru a preîncărca datele utilizatorului
      console.log("Token găsit:", token);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validare email
    if (!formData.email) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email-ul nu este valid";
    }

    // Validare parolă
    if (!formData.password) {
      newErrors.password = "Parola este obligatorie";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parola trebuie să aibă cel puțin 6 caractere";
    }

    // Validare pentru înregistrare
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "Prenumele este obligatoriu";
      }

      if (!formData.lastName) {
        newErrors.lastName = "Numele este obligatoriu";
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Numărul de telefon este obligatoriu";
      } else if (!/^[0-9+\s-]{10,}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Numărul de telefon nu este valid";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Parolele nu coincid";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:5191/api/Auth/login"
        : "http://localhost:5191/api/Auth/register";

      console.log("Trimitere request către:", endpoint);
      console.log("Date trimise:", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        }),
      });

      console.log("Status răspuns:", response.status);
      console.log(
        "Headers răspuns:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Eroare răspuns:", errorText);
        throw new Error(
          `Eroare la autentificare/înregistrare: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Succes:", data);

      // Salvează token-ul JWT dacă există în răspuns
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        console.log("Token salvat:", data.token);
      }

      showNotification(
        isLogin ? "Autentificare reușită!" : "Înregistrare reușită!"
      );

      // Resetare formular după succes
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Eroare:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Șterge eroarea pentru câmpul modificat
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const toggleForm = (isLoginForm) => {
    if (isLoginForm !== isLogin) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsLogin(isLoginForm);
        setIsAnimating(false);
        // Resetare erori la schimbarea formularului
        setErrors({});
      }, 300);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? "Autentificare" : "Înregistrare"}</h2>
          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => toggleForm(true)}
            >
              Autentificare
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => toggleForm(false)}
            >
              Înregistrare
            </button>
          </div>
        </div>

        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`auth-form ${isAnimating ? "sliding" : ""}`}
        >
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prenume"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nume"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Număr de telefon"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? "error" : ""}
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>
            </>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Parolă"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmă parola"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : isLogin ? (
              "Autentificare"
            ) : (
              "Înregistrare"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
