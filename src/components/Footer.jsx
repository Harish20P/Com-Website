import React, { useState, useEffect } from "react";
import "../components/Footer.css";
import logo1 from "../Images/Logo1.png";

const Footer = () => {
  const [itemsCount, setItemsCount] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateItemsCount = () => {
      const width = window.innerWidth;
      if (width > 1200) setItemsCount(7);
      else if (width > 768) setItemsCount(5);
      else if (width > 480) setItemsCount(3);
      else setItemsCount(2);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY === 0);
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
    <footer className={`footer ${!isVisible ? 'hidden' : ''}`}>
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