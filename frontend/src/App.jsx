// // In frontend/src/App.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   // Use a single state object for the image source to prevent conflicts
//   const [imageSource, setImageSource] = useState({ file: null, url: '' });
//   const [preview, setPreview] = useState(null);
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // When a file is selected, update the source and create a stable preview
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageSource({ file: file, url: '' });
//       setPreview(URL.createObjectURL(file));
//       setResults([]); // Clear previous results
//     }
//   };

//   // When a URL is typed, update the source and preview
//   const handleUrlChange = (event) => {
//     const url = event.target.value;
//     setImageSource({ file: null, url: url });
//     setPreview(url); // The URL itself is the preview
//     setResults([]); // Clear previous results
//   };

//   const handleSearch = async () => {
//     const { file, url } = imageSource;
//     if (!file && !url) {
//       setError('Please select an image file or enter a URL.');
//       return;
//     }
    
//     setIsLoading(true);
//     setError('');
    
//     const formData = new FormData();
//     if (file) {
//       formData.append('image', file);
//     } else if (url) {
//       formData.append('image_url', url);
//       // Add a dummy file for the 'image' field as the backend expects it
//       formData.append('image', new Blob(), '');
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/search/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setResults(response.data);
//     } catch (err) {
//       setError('Failed to fetch results. Check the URL or ensure the backend is running.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Visual Product Matcher</h1>
//         <p>Upload an image to find visually similar products.</p>
//       </header>
      
//       <main className="content">
//         <div className="uploader-section">
//           <input 
//             type="file" 
//             onChange={handleFileChange} 
//             accept="image/*" 
//             // Add a key to force re-mount when URL is typed, clearing the file input text
//             key={imageSource.url} 
//           />
//           <span className="separator-text">OR</span>
//           <input 
//             type="text" 
//             value={imageSource.url} 
//             onChange={handleUrlChange} 
//             placeholder="Enter an image URL" 
//             className="url-input"
//           />
//           <button onClick={handleSearch} disabled={isLoading || (!imageSource.file && !imageSource.url)}>
//             {isLoading ? 'Searching...' : 'Search'}
//           </button>
//         </div>

//         {error && <p className="error-message">{error}</p>}
        
//         {preview && (
//           <div className="query-section">
//             <h2>Your Image:</h2>
//             <img 
//               src={preview} 
//               alt="Query preview" 
//               className="preview-image"
//               // Add a key to help React differentiate between blob and http URLs
//               key={preview}
//               onError={() => setError('Could not load image preview. Please check the URL.')}
//             />
//           </div>
//         )}
        
//         {results.length > 0 && (
//           <div className="results-section">
//             <h2>Similar Products:</h2>
//             <div className="results-grid">
//               {results.slice(0, 5).map((item) => (
//                 <div key={item.id} className="result-item">
//                   <img src={item.image_url} alt={item.name} />
//                   <p className="item-name">{item.name}</p>
//                   <p className="item-category">{item.category}</p>
//                   <p className="item-score">Score: {item.score.toFixed(2)}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
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