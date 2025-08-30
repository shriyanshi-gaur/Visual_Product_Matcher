import React from 'react';
import './AboutSection.css'; 

const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About the Developer</h2>
      <p className="section-subtitle bio">
        This project was created by <b>Shriyanshi Gaur</b> as a technical assessment for a Software Engineer position at Unthinkable Solutions. 
        <br /><br />
        It showcases a full-stack application built with React, FastAPI, and a Sentence Transformer AI model.
      </p>
      <div className="profile-links">
        <h3>Connect with the Developer</h3>
        <div className="buttons-container">
          <a 
            href="https://github.com/shriyanshi-gaur" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/shriyanshi-gaur"
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;