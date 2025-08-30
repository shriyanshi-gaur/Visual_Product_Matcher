import React from 'react';
import './index.css'; 
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductMatcher from './components/ProductMatcher.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
// Import the new AboutSection component
import AboutSection from './components/AboutSection.jsx';


function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="header-separator"></div>
      
      <main>
        <Hero />
        <ProductMatcher />
        <FeaturesSection />
        <HowItWorksSection />
        {/* Replace ContactSection with AboutSection */}
        <AboutSection />
      </main>
    </div>
  );
}

export default App;