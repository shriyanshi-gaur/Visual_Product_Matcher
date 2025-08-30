
// import React from 'react';
// import './ProductMatcher.css';

// // --- ICONS (No changes) ---
// const UploadIcon = ({ color = 'currentColor' }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8L12 3L7 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
// const LinkIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
// const LoaderIcon = () => <svg className="spinner" viewBox="0 0 50 50"><circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle></svg>;


// const ProductMatcher = () => {
//     const [activeTab, setActiveTab] = React.useState('upload');
//     const [imagePreview, setImagePreview] = React.useState(null);
//     const [selectedFile, setSelectedFile] = React.useState(null);
//     const [results, setResults] = React.useState([]);
//     const [isLoading, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState(null);
//     const [imageUrl, setImageUrl] = React.useState('');
//     const [similarityThreshold, setSimilarityThreshold] = React.useState(50);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             setSelectedFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             handleReset();
//         }
//     };

//     const handleSearch = async () => {
//         if ((activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !imageUrl)) {
//             setError("Please select a file or enter a URL.");
//             return;
//         }
        
//         setIsLoading(true);
//         setError(null);

//         const formData = new FormData();
//         if (activeTab === 'upload' && selectedFile) {
//             formData.append('image', selectedFile);
//         } else if (activeTab === 'url' && imageUrl) {
//             formData.append('image_url', imageUrl);
//         }

//         try {
//             const minSimilarityFloat = similarityThreshold / 100;

//             // --- THIS IS THE KEY CHANGE FOR DEPLOYMENT ---
//             // Use the environment variable for the live URL, but fall back to localhost for development.
//             const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/search/';
//             const API_ENDPOINT = `${API_BASE_URL}?min_similarity=${minSimilarityFloat}`;
            
//             const response = await fetch(API_ENDPOINT, { method: "POST", body: formData });

//             if (!response.ok) {
//                 const errData = await response.json();
//                 throw new Error(errData.detail || "Search failed");
//             }

//             const data = await response.json();
//             setResults(data);
            
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleReset = () => {
//         setImagePreview(null);
//         setSelectedFile(null);
//         setImageUrl('');
//         setResults([]);
//         setError(null);
//     };

//     return (
//         <>
//             <section className="matcher-container">
//                 <div className="tab-buttons">
//                     <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
//                         <UploadIcon /> Upload Image
//                     </button>
//                     <button className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`} onClick={() => setActiveTab('url')}>
//                         <LinkIcon /> Image URL
//                     </button>
//                 </div>
//                 <div className="tab-content">
//                     {activeTab === 'upload' && (
//                         <div className="drop-zone">
//                             {imagePreview ? (
//                                 <div className="preview-container">
//                                     <img src={imagePreview} alt="Selected preview" className="image-preview" />
//                                     <button onClick={handleReset} className="remove-btn">×</button>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <p>Drag and drop your product image here</p>
//                                     <span>or click to browse files</span>
//                                     <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
//                                     <label htmlFor="file-upload" className="btn btn-primary">
//                                         Choose File
//                                     </label>
//                                 </>
//                             )}
//                         </div>
//                     )}
//                     {activeTab === 'url' && (
//                          <div className="url-zone">
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter an image URL here..." 
//                                 value={imageUrl}
//                                 onChange={(e) => setImageUrl(e.target.value)}
//                             />
//                             <button onClick={handleSearch} className="btn btn-primary" disabled={isLoading}>
//                                 {isLoading ? <LoaderIcon /> : 'Submit'}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <div className="filter-container">
//                 <label htmlFor="similarity">Minimum Similarity: <strong>{similarityThreshold}%</strong></label>
//                 <input
//                     type="range"
//                     id="similarity"
//                     min="0"
//                     max="100"
//                     value={similarityThreshold}
//                     onChange={(e) => setSimilarityThreshold(e.target.value)}
//                     className="similarity-slider"
//                 />
//             </div>
            
//             {(selectedFile || imageUrl) &&
//                 <div className="search-button-container">
//                     <button onClick={handleSearch} className="btn btn-primary search-btn" disabled={isLoading}>
//                         {isLoading ? <LoaderIcon /> : 'Search for Similar Products'}
//                     </button>
//                 </div>
//             }

//             {isLoading && <div className="status-message">Searching...</div>}
//             {error && <div className="status-message error">Error: {error}</div>}
            
//             {results.length > 0 && (
//                 <section className="results-container">
//                     <h2>Similar Products Found</h2>
//                     <div className="results-grid">
//                         {results.map((product) => (
//                             <div key={product.id} className="result-card">
//                                 <div className="result-image-wrapper">
//                                     <img src={product.image_url} alt={product.name} className="result-image" />
//                                     <div className="result-score">{Math.round(product.score * 100)}% Match</div>
//                                 </div>
//                                 <div className="result-info">
//                                     <h3 className="result-name">{product.name}</h3>
//                                     <p className="result-category">{product.category}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// };

// export default ProductMatcher;

import React from 'react';
import './ProductMatcher.css';

// --- ICONS ---
const UploadIcon = ({ color = 'currentColor' }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8L12 3L7 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LinkIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LoaderIcon = () => <svg className="spinner" viewBox="0 0 50 50"><circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle></svg>;

// --- SUB-COMPONENTS ---
const UploaderTabs = ({ activeTab, setActiveTab }) => (
    <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
            <UploadIcon /> Upload Image
        </button>
        <button className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`} onClick={() => setActiveTab('url')}>
            <LinkIcon /> Image URL
        </button>
    </div>
);

const ImageUploader = ({ imagePreview, handleReset, handleFileChange }) => (
    <div className="drop-zone">
        {imagePreview ? (
            <div className="preview-container">
                <img src={imagePreview} alt="Selected preview" className="image-preview" />
                <button onClick={handleReset} className="remove-btn">×</button>
            </div>
        ) : (
            <>
                <p>Drag and drop your product image here</p>
                <span>or click to browse files</span>
                <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                <label htmlFor="file-upload" className="btn btn-primary">Choose File</label>
            </>
        )}
    </div>
);

const UrlUploader = ({ imageUrl, setImageUrl, handleSearch, isLoading }) => (
    <div className="url-zone">
        <input 
            type="text" 
            placeholder="Enter an image URL here..." 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <LoaderIcon /> : 'Submit'}
        </button>
    </div>
);

const Filter = ({ similarityThreshold, setSimilarityThreshold }) => (
    <div className="filter-container">
        <label htmlFor="similarity">Minimum Similarity: <strong>{similarityThreshold}%</strong></label>
        <input
            type="range"
            id="similarity"
            min="0"
            max="100"
            value={similarityThreshold}
            onChange={(e) => setSimilarityThreshold(e.target.value)}
            className="similarity-slider"
        />
    </div>
);

const SearchResults = ({ results }) => (
    <section className="results-container">
        <h2>Similar Products Found</h2>
        <div className="results-grid">
            {results.map((product) => (
                <div key={product.id} className="result-card">
                    <div className="result-image-wrapper">
                        <img src={product.image_url} alt={product.name} className="result-image" />
                        <div className="result-score">{Math.round(product.score * 100)}% Match</div>
                    </div>
                    <div className="result-info">
                        <h3 className="result-name">{product.name}</h3>
                        <p className="result-category">{product.category}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

// --- MAIN COMPONENT ---
const ProductMatcher = () => {
    const [activeTab, setActiveTab] = React.useState('upload');
    const [imagePreview, setImagePreview] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [results, setResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState('');
    const [similarityThreshold, setSimilarityThreshold] = React.useState(50);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            handleReset();
        }
    };

    const handleSearch = async () => {
        if ((activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !imageUrl)) {
            setError("Please select a file or enter a URL.");
            return;
        }
        
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        if (activeTab === 'upload' && selectedFile) {
            formData.append('image', selectedFile);
        } else if (activeTab === 'url' && imageUrl) {
            formData.append('image_url', imageUrl);
        }

        try {
            const minSimilarityFloat = similarityThreshold / 100;
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/search/';
            const API_ENDPOINT = `${API_BASE_URL}?min_similarity=${minSimilarityFloat}`;
            
            const response = await fetch(API_ENDPOINT, { method: "POST", body: formData });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || "Search failed");
            }

            const data = await response.json();
            setResults(data);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setImagePreview(null);
        setSelectedFile(null);
        setImageUrl('');
        setResults([]);
        setError(null);
    };

    return (
        <>
            <section className="matcher-container">
                <UploaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="tab-content">
                    {activeTab === 'upload' ? (
                        <ImageUploader 
                            imagePreview={imagePreview} 
                            handleReset={handleReset} 
                            handleFileChange={handleFileChange} 
                        />
                    ) : (
                        <UrlUploader 
                            imageUrl={imageUrl} 
                            setImageUrl={setImageUrl} 
                            handleSearch={handleSearch} 
                            isLoading={isLoading} 
                        />
                    )}
                </div>
            </section>

            <Filter 
                similarityThreshold={similarityThreshold} 
                setSimilarityThreshold={setSimilarityThreshold} 
            />
            
            {(selectedFile || imageUrl) &&
                <div className="search-button-container">
                    <button onClick={handleSearch} className="btn btn-primary search-btn" disabled={isLoading}>
                        {isLoading ? <LoaderIcon /> : 'Search for Similar Products'}
                    </button>
                </div>
            }

            {isLoading && <div className="status-message">Searching...</div>}
            {error && <div className="status-message error">Error: {error}</div>}
            
            {results.length > 0 && <SearchResults results={results} />}
        </>
    );
};

export default ProductMatcher;