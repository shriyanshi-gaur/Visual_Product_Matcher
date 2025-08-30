// // src/components/Header.jsx

// // ... (imports and icon code)

// const Header = () => {
//   return (
//     <header className="main-header">
//       <div className="header-content">
//         <a href="/" className="logo">
//           {/* ... logo content */}
//         </a>
//         <nav className="main-nav">
//           {/* Update these links */}
//           <a href="#features">Features</a>
//           <a href="#how-it-works">How it Works</a>
//           <a href="#contact">Contact</a>
//         </nav>
//         <div className="header-actions">
//           {/* ... button */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import './Header.css';

// SVG for the logo icon
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <a href="/" className="logo">
          <div className="logo-icon"><SearchIcon /></div>
          <span>VisualMatch</span>
        </a>
        <nav className="main-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-secondary">GitHub</button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;