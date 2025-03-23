import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Slider from '../components/silder'; // Fix typo if needed: 'silder' → 'Slider'
import Footer from '../components/Footer';
import './HomePage.css';
import Roller from '../components/Roller';
import Service from '../components/Service';
import WhyChoose from '../components/WhyChoose';
import Mover from '../components/Mover';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  const [stars, setStars] = useState([]);
  const [manualStars, setManualStars] = useState([]);
  const [nearbyStar, setNearbyStar] = useState(null); // Track the star near the mouse
  const starPositionsRef = useRef({});
  const pausedStarsRef = useRef({});
  const starfieldRef = useRef(null); // Ref to starfield for mouse tracking

  // Define constants for manual stars
  const MANUAL_STAR_SPEED = { x: 0.03, y: 0.03 };
  const MANUAL_STAR_SIZE = 5;
  const MANUAL_STAR_OPACITY = 0.8;
  const MANUAL_STAR_COLOR = 'rgb(58, 255, 173)';
  const MANUAL_STAR_TWINKLE = 2;
  const PROXIMITY_RADIUS = 50; // Distance in pixels to trigger tooltip

  // Manual stars data
  const manualStarsData = [
    { id: 'manual-1', x: 25, y: 30, speed: { x: MANUAL_STAR_SPEED.x, y: -MANUAL_STAR_SPEED.y }, text: 'Hello Anto J Nickson. How Are you!!!!!!' },
    { id: 'manual-2', x: 75, y: 40, speed: { x: -MANUAL_STAR_SPEED.x, y: MANUAL_STAR_SPEED.y }, text: 'Yo Yo Nickson Whats Up Man' },
    { id: 'manual-3', x: 40, y: 70, speed: { x: MANUAL_STAR_SPEED.x, y: MANUAL_STAR_SPEED.y }, text: 'Are bhai kya re aap ko kya chahiye' },
    { id: 'manual-4', x: 60, y: 20, speed: { x: -MANUAL_STAR_SPEED.x, y: -MANUAL_STAR_SPEED.y }, text: 'Are you mad, idiot arivu illa' },
    { id: 'manual-5', x: 15, y: 60, speed: { x: MANUAL_STAR_SPEED.x, y: -MANUAL_STAR_SPEED.y }, text: 'Ipl starting have fun guys' },
  ];

  useEffect(() => {
    // Initialize random stars
    const starCount = 20;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 3,
      opacity: Math.random() * 0.5 + 0.5,
      color: Math.random() > 0.7 ? 'rgba(200, 220, 255, 1)' : (Math.random() > 0.5 ? 'rgba(255, 255, 255, 1)' : 'rgb(116, 230, 255)'),
      speed: { x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 },
      twinkleSpeed: Math.random() * 3 + 2,
    }));
    setStars(newStars);

    // Initialize manual stars
    const initialManualStars = manualStarsData.map(star => ({
      ...star,
      size: MANUAL_STAR_SIZE,
      opacity: MANUAL_STAR_OPACITY,
      color: MANUAL_STAR_COLOR,
      twinkleSpeed: MANUAL_STAR_TWINKLE,
    }));
    setManualStars(initialManualStars);

    // Initialize positions ref
    starPositionsRef.current = {};
    initialManualStars.forEach(star => {
      starPositionsRef.current[star.id] = { x: star.x, y: star.y };
    });

    // Animation loop
    let animationId;
    let lastTime = 0;

    const animate = (time) => {
      if (time - lastTime > 16) { // ~60fps
        lastTime = time;

        // Update random stars
        setStars(prevStars =>
          prevStars.map(star => {
            let newX = star.x + star.speed.x;
            let newY = star.y + star.speed.y;

            if (newX < 0 || newX > 100) star.speed.x = -star.speed.x;
            if (newY < 0 || newY > 100) star.speed.y = -star.speed.y;

            return {
              ...star,
              x: Math.max(0, Math.min(100, newX)),
              y: Math.max(0, Math.min(100, newY)),
            };
          })
        );

        // Update manual stars
        setManualStars(prevManualStars =>
          prevManualStars.map(star => {
            if (pausedStarsRef.current[star.id]) return star;

            const pos = starPositionsRef.current[star.id];
            let newX = pos.x + star.speed.x;
            let newY = pos.y + star.speed.y;

            if (newX < 0 || newX > 100) star.speed.x = -star.speed.x;
            if (newY < 0 || newY > 100) star.speed.y = -star.speed.y;

            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));

            starPositionsRef.current[star.id] = { x: newX, y: newY };
            return { ...star, x: newX, y: newY };
          })
        );
      }
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup animation
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Track mouse position and check proximity to stars
  useEffect(() => {
    const handleMouseMove = (e) => {
      const starfield = starfieldRef.current;
      if (!starfield) return;

      const rect = starfield.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Convert mouse position to percentage of starfield dimensions
      const mouseXPercent = (mouseX / rect.width) * 100;
      const mouseYPercent = (mouseY / rect.height) * 100;

      let closestStar = null;
      let minDistance = Infinity;

      manualStars.forEach(star => {
        const starPos = starPositionsRef.current[star.id];
        const starX = (starPos.x / 100) * rect.width;
        const starY = (starPos.y / 100) * rect.height;

        const distance = Math.sqrt(
          Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2)
        );

        if (distance < PROXIMITY_RADIUS && distance < minDistance) {
          minDistance = distance;
          closestStar = star.id;
        }
      });

      if (closestStar) {
        setNearbyStar(closestStar);
        pausedStarsRef.current[closestStar] = true; // Pause the closest star
      } else if (nearbyStar) {
        pausedStarsRef.current[nearbyStar] = false; // Resume the previously paused star
        setNearbyStar(null);
      }
    };

    const starfield = starfieldRef.current;
    if (starfield) {
      starfield.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (starfield) {
        starfield.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [manualStars, nearbyStar]);

  return (
    <div>
      <div className="home-page">
        <Header />
        <main className="main-content">
          <div className="starfield" ref={starfieldRef}>
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
                  animationDuration: `${star.twinkleSpeed}s`,
                }}
              />
            ))}
            {manualStars.map(star => (
              <div
                key={star.id}
                className={`star manual-star ${pausedStarsRef.current[star.id] ? 'paused' : ''}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.color,
                  opacity: star.opacity,
                  animationDuration: `${star.twinkleSpeed}s`,
                  animationPlayState: pausedStarsRef.current[star.id] ? 'paused' : 'running',
                  boxShadow: `0 0 15px 5px ${star.color}`,
                  transition: 'left 0.016s linear, top 0.016s linear',
                }}
              >
                {nearbyStar === star.id && (
                  <div className="star-tooltip">{star.text}</div>
                )}
              </div>
            ))}
          </div>
          <div className="center-star"></div>
          <div className="content-wrapper">
            <h1>Welcome to RhodNet</h1>
          </div>
        </main>
        <Slider />
        <Roller />
        <Service />
        <Footer />
      </div>
      <WhyChoose />
      <Mover />
      <ContactForm />
    </div>
  );
};

export default HomePage;