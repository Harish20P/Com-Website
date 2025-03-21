// Footer.jsx
import React, { useState, useEffect } from "react";
import "../components/Footer.css";
import logo1 from "../Images/Logo1.png";

const Footer = () => {
  const [itemsCount, setItemsCount] = useState(5);
  const [scrollState, setScrollState] = useState("top"); // "top", "hiding", "hidden"

  useEffect(() => {
    const updateItemsCount = () => {
      const width = window.innerWidth;
      if (width > 1200) setItemsCount(7);
      else if (width > 768) setItemsCount(5);
      else if (width > 480) setItemsCount(3);
      else setItemsCount(2);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50; // Adjust this threshold as needed
      
      if (scrollY <= 0) {
        setScrollState("top");
      } else if (scrollY > 0 && scrollY <= threshold) {
        setScrollState("hiding");
      } else {
        setScrollState("hidden");
      }
    };

    updateItemsCount();
    window.addEventListener("resize", updateItemsCount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateItemsCount);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`footer footer-${scrollState}`}>
      <div className="footer-content">
        {[...Array(itemsCount)].map((_, index) => (
          <div key={index} className="footer-item">
            <img src={logo1} alt="RhodNet Logo" className="footer-logo" />
            <span className="footer-text">RhodNet</span>
            <span className="footer-line">|</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;