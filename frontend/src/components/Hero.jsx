// import React from 'react';
// import './Hero.css';

// const Hero = () => {
//   return (
//     <section className="hero-container">
//       <div className="badge">AI-Powered Visual Search</div>
//       <h1>Find Similar Products with <br/>Visual AI Technology</h1>
//       <p>
//         Upload any product image or paste an image URL to instantly discover similar items
//         from our vast catalog. Powered by advanced computer vision and machine learning.
//       </p>
//       <div className="feature-previews">
//         <span>✓ Image Upload</span>
//         <span>✓ Instant Analysis</span>
//         <span>✓ Accurate Matching</span>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// import React, { useState, useEffect } from 'react';
// import './Hero.css';

// const Hero = () => {
//   // 1. Add state to store the categories
//   const [categories, setCategories] = useState([]);

//   // 2. Fetch the categories from the backend when the component loads
//   useEffect(() => {
//     fetch("http://localhost:8000/categories/")
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error("Error fetching categories:", error));
//   }, []); // The empty array ensures this runs only once

//   return (
//     <section className="hero-container">
//       {/* <div className="badge">AI-Powered Visual Search</div> */}
//       <h1>Find Similar Products with <br/>Visual AI Technology</h1>
//       <p>
//         Upload any product image or paste an image URL to instantly discover similar items
//         from our vast catalog. Powered by advanced computer vision and machine learning.
//       </p>
      
//       {/* 3. Render the list of categories if it has been loaded */}
//       {categories.length > 0 && (
//         <div className="category-suggestion-container">
//           <p>Try uploading images of:</p>
//           <div className="category-list">
//             {categories.map((category, index) => (
//               <span key={index} className="category-badge">{category}</span>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Hero;

import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Use the live backend URL for categories, with a fallback for local dev
    const CATEGORIES_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/').replace('/search/', '/categories/');
    
    fetch(CATEGORIES_URL)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []); // The empty array ensures this runs only once

  return (
    <section className="hero-container">
      <h1>Find Similar Products with <br/>Visual AI Technology</h1>
      <p>
        Upload any product image or paste an image URL to instantly discover similar items
        from our vast catalog. 
      </p>
      
      {categories.length > 0 && (
        <div className="category-suggestion-container">
          <p>Try uploading images of:</p>
          <div className="category-list">
            {categories.map((category, index) => (
              <span key={index} className="category-badge">{category}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;