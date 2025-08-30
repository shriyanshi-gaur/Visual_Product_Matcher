import React from 'react';
import './HowItWorksSection.css'; // Create this new CSS file

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-container alt-background">
      <h2 className="section-title">How It Works</h2>
      <p className="section-subtitle">Find the products you're looking for in three simple steps.</p>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Upload Your Image</h3>
          <p>Provide an image by uploading a file from your device or by pasting a direct URL.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>AI Analysis</h3>
          <p>Our AI analyzes the key visual features of your product, from color to shape and texture.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Discover Matches</h3>
          <p>Instantly see a list of visually similar products from our extensive database, ranked by similarity.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;