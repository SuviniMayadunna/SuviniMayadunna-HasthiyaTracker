import React from 'react';
import Hero from '../components/Hero';

/**
 * Home page component - Landing page for the application
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
};

export default Home;
