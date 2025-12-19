import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';

/**
 * Home page component - Landing page for the application
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Hasthiya Project Tracker. Built by Suvini Mayadunna
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
