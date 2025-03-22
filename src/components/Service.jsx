import React, { useEffect, useRef, useState } from 'react';
import './Service.css';

const Service = () => {
  const parallaxImageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const serviceTitleRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const parallaxImage = parallaxImageRef.current;
    const imageContainer = imageContainerRef.current;
    const serviceTitle = serviceTitleRef.current;

    const handleScroll = () => {
      // Determine scroll direction
      const st = window.scrollY;
      if (st > lastScrollTop.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollTop.current = st;

      // Parallax effect for the image
      if (parallaxImage && imageContainer) {
        const scrollPosition = window.scrollY;
        const containerTop = imageContainer.getBoundingClientRect().top + window.scrollY;
        const containerHeight = imageContainer.offsetHeight;
        const imageHeight = parallaxImage.offsetHeight;
        
        const maxScroll = imageHeight - containerHeight;
        
        if (scrollPosition > containerTop - window.innerHeight && 
            scrollPosition < containerTop + containerHeight) {
          const scrollPercentage = (scrollPosition - (containerTop - window.innerHeight)) / 
                                  (containerHeight + window.innerHeight);
          const translateY = Math.min(maxScroll * scrollPercentage, maxScroll);
          parallaxImage.style.transform = `translateY(-${translateY}px)`;
        }
      }

      // Title visibility and scale logic
      if (serviceTitle) {
        const rect = serviceTitle.getBoundingClientRect();
        const viewportThreshold = 0.2; // 20% threshold for entering/exiting viewport
        
        // Calculate visibility percentage (how much of the element is in the viewport)
        const visibilityPercentage = Math.min(
          (window.innerHeight - rect.top) / rect.height, 
          rect.bottom / rect.height
        );
        
        // Set title visibility based on threshold and scroll direction
        if (visibilityPercentage > viewportThreshold) {
          setIsTitleVisible(true);
        } else {
          setIsTitleVisible(false);
        }
      }

      // Image container visibility and scale logic
      if (imageContainer) {
        const rect = imageContainer.getBoundingClientRect();
        const viewportThreshold = 0.3; // 30% threshold for entering/exiting viewport
        
        // Calculate visibility percentage (how much of the element is in the viewport)
        const visibilityPercentage = Math.min(
          (window.innerHeight - rect.top) / rect.height, 
          rect.bottom / rect.height
        );
        
        // Set image visibility based on threshold
        if (visibilityPercentage > viewportThreshold) {
          setIsImageVisible(true);
        } else {
          setIsImageVisible(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.dispatchEvent(new Event('scroll'));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection]); // Added scrollDirection as a dependency

  const titleScaleClass = isTitleVisible ? 'service-title-enlarged' : '';
  const imageScaleClass = isImageVisible ? 'service-image-enlarged' : '';

  return (
    <div className='service-slider-container'>
      <div className="service-container">
        <div className="service-hero-section">
          <div className="service-content-section">
          </div>
          
          <div 
            className={`service-services-title ${titleScaleClass}`}
            ref={serviceTitleRef}
          >
            OUR SERVICES
          </div>

          <div 
            className={`service-image-container ${imageScaleClass}`} 
            ref={imageContainerRef}
          >
            <img 
              src="src/Images/image.png" 
              alt="Abstract sculpture with cloud-like textures in blue and gold tones" 
              className="service-parallax-image"
              ref={parallaxImageRef}
            />
          </div>
          
          <div className="service-content-section">
            <div>
              <h1 className="service-heading">WE ARE YOUR PARTNERS IN PROGRESS</h1>
            </div>
            <div>
              <p className="service-description">
                We build data systems and AI solutions that understand your industry's unique challenges. 
                By combining technical expertise with a deep appreciation for your specific context, 
                we create technology that gives you advantages competitors struggle to match.
              </p>
            </div>
          </div>
          <div className="service-content-section">
            <div>
              <h1 className="service-heading">WE ARE YOUR PARTNERS IN PROGRESS</h1>
            </div>
            <div>
              <p className="service-description">
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

export default Service;