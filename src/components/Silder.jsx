import React, { useEffect, useRef } from 'react';
import './Slider.css';

const Slider = () => {
  const parallaxImageRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const parallaxImage = parallaxImageRef.current;
    const imageContainer = imageContainerRef.current;

    const handleScroll = () => {
      if (!parallaxImage || !imageContainer) return;

      const scrollPosition = window.scrollY;
      const containerTop = imageContainer.getBoundingClientRect().top + window.scrollY;
      const containerHeight = imageContainer.offsetHeight;
      const imageHeight = parallaxImage.offsetHeight;
      
      // Calculate how much of the image can be scrolled
      const maxScroll = imageHeight - containerHeight;
      
      // Only apply parallax effect when the container is in view
      if (scrollPosition > containerTop - window.innerHeight && 
          scrollPosition < containerTop + containerHeight) {
          
          // Calculate the scroll percentage based on the container's position
          const scrollPercentage = (scrollPosition - (containerTop - window.innerHeight)) / 
                                  (containerHeight + window.innerHeight);
          
          // Apply the transform
          const translateY = Math.min(maxScroll * scrollPercentage, maxScroll);
          parallaxImage.style.transform = `translateY(-${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger scroll event once to position elements correctly on page load
    window.dispatchEvent(new Event('scroll'));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='slider-container'>
        <div className="container">
            <div className="hero-section">
                <div className="content-section content-section-first">
                <div>
                    <h1 className="heading">WE ARE YOUR PARTNERS IN PROGRESS</h1>
                </div>
                <div>
                    <p className="description">
                    We build data systems and AI solutions that understand your industry's unique challenges. 
                    By combining technical expertise with a deep appreciation for your specific context, 
                    we create technology that gives you advantages competitors struggle to match.
                    </p>
                </div>
                </div>
                
                <div className="image-container" ref={imageContainerRef}>
                    <div className="grid-container">
                        <div className="grid visible"></div>
                        <div className="grid hidden"></div>
                        <div className="grid visible"></div>
                        <div className="grid hidden "></div>
                        <div className="grid hidden"></div>
                        <div className="grid visible third"></div>
                        <div className="grid hidden"></div>
                        <div className="grid visible"></div>
                    </div>
                <img 
                    src="src/Images/image.png" 
                    alt="Abstract sculpture with cloud-like textures in blue and gold tones" 
                    className="parallax-image"
                    ref={parallaxImageRef}
                />
                </div>
                <div className="content-section">
                <div>
                    <h1 className="heading">WE ARE YOUR PARTNERS IN PROGRESS</h1>
                </div>
                <div>
                    <p className="description">
                    We build data systems and AI solutions that understand your industry's unique challenges. 
                    By combining technical expertise with a deep appreciation for your specific context, 
                    we create technology that gives you advantages competitors struggle to match.
                    </p>
                </div>
                </div>
                <div className="content-section">
                <div>
                    <h1 className="heading">WE ARE YOUR PARTNERS IN PROGRESS</h1>
                </div>
                <div>
                    <p className="description">
                    We build data systems and AI solutions that understand your industry's unique challenges. 
                    By combining technical expertise with a deep appreciation for your specific context, 
                    we create technology that gives you advantages competitors struggle to match.
                    </p>
                </div>
                </div>
            </div>
            </div>
    </div>
  );
};

export default Slider;