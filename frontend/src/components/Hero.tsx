import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hero section component for the home page
 * Features clean design with call-to-action
 */
const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">


          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hasthiya Project Tracker
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Streamline your workflow, track progress, and deliver projects on time with our intuitive project management dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-200"
            >
              Get Started →
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200 text-sm md:text-base">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">Real-time</div>
              <div className="text-blue-200 text-sm md:text-base">Updates</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">Easy</div>
              <div className="text-blue-200 text-sm md:text-base">To Manage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
