import { useEffect, useState } from "react";
 import "./theme.css"; // Adjust the path as needed
 
 const ThemeToggle = () => {
   const [lightMode, setLightMode] = useState(false);
 
   useEffect(() => {
     const saved = localStorage.getItem("lightMode");
     if (saved === "true") {
       setLightMode(true);
       document.body.classList.add("light-header-mode");
     }
   }, []);
 
   useEffect(() => {
     if (lightMode) {
       document.body.classList.add("light-header-mode");
     } else {
       document.body.classList.remove("light-header-mode");
     }
     localStorage.setItem("lightMode", lightMode);
   }, [lightMode]);
 
   return (
     <img
       onClick={() => setLightMode(prev => !prev)}
       src={"/icons/darkmode1.png"}
       alt="Toggle Light Header"
       style={{ cursor: "pointer", width: "24px", height: "24px" }}
     />
   );
 };
 
 export default ThemeToggle;