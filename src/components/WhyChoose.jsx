import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./WhyChoose.css";

const WhyChoose = () => {
  const [visibleSection, setVisibleSection] = useState("title");
  const [containerVisible, setContainerVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState({
    title: false,
    first: false,
    second: false,
  });

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const firstSetRef = useRef(null);
  const secondSetRef = useRef(null);

  useEffect(() => {
    const containerObserverOptions = { threshold: 0.1 };
    const containerObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setContainerVisible(true);
        } else {
          setContainerVisible(false);
        }
      });
    };

    const containerObserver = new IntersectionObserver(
      containerObserverCallback,
      containerObserverOptions
    );

    if (containerRef.current) {
      containerObserver.observe(containerRef.current);
    }

    const observerOptions = { threshold: 0.4 };
    const observerCallback = (entries) => {
      let highestEntry = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          highestEntry = entry;
        }
      });

      if (highestEntry) {
        if (highestEntry.target === titleRef.current) {
          setVisibleSection("title");
          if (!hasAnimated.title) {
            setHasAnimated((prev) => ({ ...prev, title: true }));
          }
        } else if (highestEntry.target === firstSetRef.current) {
          setVisibleSection("first");
          if (!hasAnimated.first) {
            setHasAnimated((prev) => ({ ...prev, first: true }));
          }
        } else if (highestEntry.target === secondSetRef.current) {
          setVisibleSection("second");
          if (!hasAnimated.second) {
            setHasAnimated((prev) => ({ ...prev, second: true }));
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (firstSetRef.current) observer.observe(firstSetRef.current);
    if (secondSetRef.current) observer.observe(secondSetRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (firstSetRef.current) observer.unobserve(firstSetRef.current);
      if (secondSetRef.current) observer.unobserve(secondSetRef.current);
      if (containerRef.current) containerObserver.unobserve(containerRef.current);
    };
  }, [hasAnimated]);

  const firstSetContent = [
    {
      title: "AI Security Solutions",
      description:
        "Real-time threat detection and automated vulnerability protection using machine learning for anomaly detection, AI-powered threat intelligence, and behavioral analytics for user authentication.",
      benefit: "Ensures robust security for digital assets with proactive, AI-driven defenses",
    },
    {
      title: "Predictive Threat Analysis",
      description: "Anticipate cyber attacks with AI that learns from global threat patterns.",
      benefit: "Enables prevention of attacks before they happen, reducing incident response costs",
    },
    {
      title: "Zero Trust Architecture",
      description: "Implement strict identity verification for every user and device.",
      benefit: "Minimizes breach impact through continuous validation and least privilege access",
    },
    {
      title: "Encrypted Data Shield",
      description: "Protect sensitive data with advanced encryption protocols.",
      benefit: "Safeguards critical information even if other security measures are compromised",
    },
  ];

  const secondSetContent = [
    {
      title: "Smart Incident Response",
      description: "Automate responses to security incidents with AI precision.",
      benefit: "Reduces recovery time and minimizes operational disruption during attacks",
    },
    {
      title: "Cloud Security Monitoring",
      description: "Secure your cloud infrastructure with real-time monitoring.",
      benefit: "Ensures complete visibility across all cloud assets and services",
    },
    {
      title: "Adaptive Access Control",
      description: "Dynamically adjust access based on user behavior and risk.",
      benefit: "Prevents unauthorized access while maintaining seamless user experience",
    },
    {
      title: "Cyber Resilience Framework",
      description: "Build a resilient system to recover quickly from attacks.",
      benefit: "Maintains business continuity with minimal downtime after security incidents",
    },
  ];

  const containerVariants = {
    hidden: { scale: 0.60, opacity: 0.8 },
    visible: { scale: 1, opacity: 1 },
  };

  // Updated: Animate from left to right, slightly higher
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },      // Start from left
    visible: { opacity: 1, x: 0, y: -20 }, // Move to center, slightly higher
    exit: { opacity: 0, x: -100 },         // Exit back to left
  };

  // Updated: Animate from right to left, slightly lower
  const rightVariants = {
    hidden: { opacity: 0, x: 100 },       // Start from right
    visible: { opacity: 1, x: 0, y: 20 },  // Move to center, slightly lower
    exit: { opacity: 0, x: 100 },          // Exit back to right
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={containerRef}
      className="whychoose-us-outer-container"
      variants={containerVariants}
      initial="hidden"
      animate={containerVisible ? "visible" : "hidden"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div ref={titleRef} className="section-title-container">
        <motion.div
          className="whychoose-us-title-container"
          variants={titleVariants}
          initial="hidden"
          animate={visibleSection === "title" ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
          style={{ animation: hasAnimated.title ? "none" : undefined }}
        >
          <h1 className="whychoose-us-title">Why Choose Us?</h1>
        </motion.div>
      </div>

      <div className="sections-wrapper">
        <div ref={firstSetRef} className="section-container">
          <motion.div
            className="whychoose-us-content-container"
            initial="hidden"
            animate={visibleSection === "first" ? "visible" : "hidden"}
          >
            {firstSetContent.map((item, index) => (
              <motion.div
                key={index}
                className={`content-box ${index % 2 === 0 ? "content-box-left" : "content-box-right"}`}
                variants={index % 2 === 0 ? leftVariants : rightVariants}
                initial="hidden"
                animate={visibleSection === "first" ? "visible" : "hidden"}
                exit={index % 2 === 0 ? "exit" : "exit"}
                transition={{ duration: 0.4 }}
                style={{ animation: hasAnimated.first ? "none" : undefined }}
              >
                <h3>{item.title}</h3>
                <p className="description">{item.description}</p>
                <div className="benefit-container">
                  <span className="benefit-label">BENEFIT:</span>
                  <p className="benefit-text">{item.benefit}</p>
                </div>
                <div className="action-buttons">
                  <button className="action-button discover">Discover</button>
                  <button className="action-button connect">Connect</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={secondSetRef} className="section-container">
          <motion.div
            className="whychoose-us-content-container"
            initial="hidden"
            animate={visibleSection === "second" ? "visible" : "hidden"}
          >
            {secondSetContent.map((item, index) => (
              <motion.div
                key={index}
                className={`content-box ${index % 2 === 0 ? "content-box-left" : "content-box-right"}`}
                variants={index % 2 === 0 ? leftVariants : rightVariants}
                initial="hidden"
                animate={visibleSection === "second" ? "visible" : "hidden"}
                exit={index % 2 === 0 ? "exit" : "exit"}
                transition={{ duration: 0.4 }}
                style={{ animation: hasAnimated.second ? "none" : undefined }}
              >
                <h3>{item.title}</h3>
                <p className="description">{item.description}</p>
                <div className="benefit-container">
                  <span className="benefit-label">BENEFIT:</span>
                  <p className="benefit-text">{item.benefit}</p>
                </div>
                <div className="action-buttons">
                  <button className="action-button discover">Discover</button>
                  <button className="action-button connect">Connect</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChoose;