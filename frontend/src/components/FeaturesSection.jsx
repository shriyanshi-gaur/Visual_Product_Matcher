
import React from 'react';
import './FeaturesSection.css';

// You can find free icons from libraries like Lucide React or use your own SVGs
const Feature = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="section-container">
      <h2 className="section-title">Powerful Features</h2>
      <p className="section-subtitle">Discover what makes our visual search technology the best.</p>
      <div className="features-grid">
        <Feature
          title="Advanced AI Matching"
          description="Our core technology uses deep learning to understand the visual details of any product."
        />
        <Feature
          title="Fast & Scalable"
          description="Get search results in milliseconds, backed by a cloud infrastructure that can handle millions of queries."
        />
        <Feature
          title="Easy Integration"
          description="Use our simple REST API to integrate visual search capabilities into your own applications."
        />
        <Feature
          title="URL & File Uploads"
          description="Flexibility to search using either a direct image upload or a URL from anywhere on the web."
        />
        <Feature
          title="Accurate Results"
          description="Trained on vast datasets, our models provide highly accurate and relevant product matches."
        />
        <Feature
          title="Privacy Focused"
          description="Your images are processed securely and are never stored or used for any other purpose."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;