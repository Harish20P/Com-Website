import React from 'react';
import './Mover.css';

const Mover = () => {
  // List of 15 AI-related terms
  const aiTerms = [
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'Generative AI',
    'Supervised Learning',
    'Unsupervised Learning',
    'Transfer Learning',
    'AI Ethics',
    'Data Science',
    'Predictive Analytics',
    'Robotics',
    'Expert Systems',
  ];

  return (
    <div className="mover-container">
      <div className="mover">
        {aiTerms.concat(aiTerms).map((term, index) => (
          <span 
            key={index} 
            className="mover-item"
            aria-hidden={index >= aiTerms.length ? "true" : "false"}
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Mover;