import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">Student Connect</div>
        <style>
            
        </style>
      </header>
      <main className="content">
        <h1>Welcome to Student Connect</h1>
        <p>Your all-in-one school online management system</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </main>
    </div>
  );
}

export default Home;