import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Slider from '../components/silder';
import Footer from '../components/Footer';
import './HomePage.css';
import Roller from '../components/Roller';

const HomePage = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars
    const starCount = 100;
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100,
        size: Math.random() * 4 + 1, // 1-5px
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1
        color: Math.random() > 0.7 ? 
          'rgba(200, 220, 255, 1)' : 
          (Math.random() > 0.5 ? 'rgba(255, 255, 255, 1)' : 'rgba(150, 200, 255, 1)'),
        speed: {
          x: (Math.random() - 0.5) * 0.1, // random direction and speed
          y: (Math.random() - 0.5) * 0.1
        },
        twinkleSpeed: Math.random() * 3 + 2 // 2-5s
      });
    }
    
    setStars(newStars);
    
    // Animation frame for star movement
    let animationId;
    const animate = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          // Update position based on speed
          let newX = star.x + star.speed.x;
          let newY = star.y + star.speed.y;
          
          // Boundary check with direction change
          if (newX < 0 || newX > 100) {
            star.speed.x = -star.speed.x;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY < 0 || newY > 100) {
            star.speed.y = -star.speed.y;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          return {
            ...star,
            x: newX,
            y: newY
          };
        })
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        {/* Dynamic stars */}
        <div className="starfield">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                opacity: star.opacity,
                animationDuration: `${star.twinkleSpeed}s`
              }}
            />
          ))}
        </div>
        
        {/* Central star */}
        <div className="center-star"></div>
        
        <div className="content-wrapper">
          <h1>Welcome to RhodNet</h1>
        </div>
      </main>
      <Slider />
      <Roller />
      <Footer />
    </div>
  );
};

export default HomePage;