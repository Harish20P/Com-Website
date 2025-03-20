import React from 'react';
import Header from '../components/Header';
import './HomePage.css';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <h1>Welcome to RhodNet</h1>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 