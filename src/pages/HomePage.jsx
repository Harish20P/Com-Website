import React from 'react';
import Header from '../components/Header';
import Slider from '../components/silder';
import Footer from '../components/Footer';
import './HomePage.css';
import Roller from '../components/Roller';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <h1>Welcome to RhodNet</h1>
      </main>
      <Slider />
      <Roller />
      <Footer />
    </div>
  );
};

export default HomePage;