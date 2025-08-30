import React from 'react';
import './AboutSection.css'; // We will create this file next


const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About the Developer</h2>
      <p className="section-subtitle bio">
        This project was created by Shriyanshi Gaur as a technical assessment for a Software Engineer position at Unthinkable Solutions. 
        <br>
        </br><br></br>
        It showcases a full-stack application built with React, FastAPI, and a Sentence Transformer AI model.
      </p>
      <div className="social-links">
        <a href="https://github.com/shriyanshi-gaur" target="_blank" rel="noopener noreferrer" className="social-link">
           GitHub
        </a>
        <a href="https://www.linkedin.com/in/shriyanshi-gaur-a4419428b" target="_blank" rel="noopener noreferrer" className="social-link">
           LinkedIn
        </a>
      </div>
    </section>
  );
};

export default AboutSection;