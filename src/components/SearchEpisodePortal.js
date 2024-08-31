import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToWatchList, removeFromWatchList } from '../watchlist_functions/WatchListOperations.js';
import { searchEpisodesAndSeries } from '../api_functions/searchEpisodesAndSeries.js';
import ErrorAlert from './ErrorAlert';
import defaultPoster from '../pics/blank-movie-poster1.jpg';

const SearchEpisodePortal = () => {
    const [searchText, setSearchText] = useState('');
    const [season, setSeason] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [watchList, setWatchList] = useState(() => {
        const storedWatchList = {};
        Object.keys(localStorage).forEach(key => {
            storedWatchList[key] = true;
        });
        return storedWatchList;
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 12;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchText.trim() === '') {
            setError('Please enter a series name.');
            return;
        }

        setLoading(true);
        setError(null); // Reset error before new search
        setEpisodes([]);  // Reset episodes list before new search

        await searchEpisodesAndSeries(
            searchText,
            season,
            setEpisodes,
            setError
        );

        setLoading(false);
    };

    // Dynamically load Font Awesome script
    useEffect(() => {
        const scriptUrl = "https://kit.fontawesome.com/d5635d350d.js";
        
        // Function to load the Font Awesome script
        const loadFontAwesome = () => {
            const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = scriptUrl;
                script.crossOrigin = "anonymous";
                script.async = true;

                script.onload = () => {
                    console.log("Font Awesome script loaded successfully");
                };

                script.onerror = (err) => {
                    console.error("Failed to load Font Awesome script:", err);
                };

                document.body.appendChild(script);
            }
        };

        // Load the script immediately in useEffect
        loadFontAwesome();

        // Clean up the script when the component unmounts
        return () => {
            const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
            if (existingScript && existingScript.parentNode) {
                existingScript.parentNode.removeChild(existingScript);
            }
        };
    }, []);     

    const handleCardClick = (imdbID) => {
        navigate(`/content/${imdbID}`);  // guide to a specific episode page
    };

    const handleWatchListToggle = (episode) => {
        const isAdded = watchList[episode.imdbID];
        if (isAdded) {
            removeFromWatchList(episode.imdbID);
        } else {
            addToWatchList(episode);
        }
        setWatchList((prev) => ({
            ...prev,
            [episode.imdbID]: !isAdded
        }));
    };

    const handleErrorAlertClose = () => {
        setError(null); 
    };

    // Pagination functions
    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
    const jumpToFirstPage = () => setCurrentPage(1);
    const jumpToLastPage = () => setCurrentPage(Math.ceil(episodes.length / episodesPerPage));

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between p-0">
            <div className="container-fluid text-center py-5" style={{ background: 'linear-gradient(135deg, #2d3e50 30%, #1b1b1b 100%)' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <div className="text-white fw-bold mb-3 text-start" style={{ fontSize: '3rem', lineHeight: '2' }}>
                            Search for Episodes
                        </div>
                        <div className="ml-auto">
                            <a href="/watchlist" className="text-light">Watchlist</a> 
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSearch} className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="input-group">
                            <select
                                id="searchType"
                                name="searchType"
                                className="form-select form-select-lg rounded-start"
                                value={season}
                                onChange={(e) => setSeason(Number(e.target.value))}
                                style={{ maxWidth: '160px' }}
                            >
                                {[...Array(20).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        Season {num + 1}
                                    </option>
                                ))}
                            </select>

                            <input
                                id="searchText"
                                type="text"
                                placeholder="Type in series name ..."
                                className="form-control form-control-lg"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />

                            <button type="submit" className="btn btn-light btn-lg rounded-end">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* ErrorAlert aligned to top */}
            {error && (
                <div className="container-fluid text-center d-flex justify-content-center align-items-start" style={{ backgroundColor: '#f5f5f5' }}>
                    <div className="row justify-content-center w-100">
                        <ErrorAlert error={error} searchTerm={searchText} onClose={handleErrorAlertClose} />
                    </div>
                </div>
            )}

            <div className="container-fluid text-center flex-grow-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row justify-content-center w-100">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        episodes.length > 0 ? (
                            <div className="col-md-8">
                                <br></br>
                                <div className="row">
                                    {currentEpisodes.map((episode, index) => (
                                        <div 
                                            key={index} 
                                            className="col-lg-3 col-md-4 col-6 mb-4"
                                            onClick={() => handleCardClick(episode.imdbID)}  
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div 
                                                className="card bg-light" 
                                                style={{ 
                                                    width: '100%', 
                                                    boxShadow: '1px 2px #a1a1a1', 
                                                    borderRadius: '4px' 
                                                }}
                                            >
                                                <div className="fav-poster" style={{ padding: '10px 0 5px 0' }}>
                                                    <img 
                                                        src={episode.Poster && episode.Poster !== 'N/A' ? episode.Poster : defaultPoster}
                                                        className="card-img-top" 
                                                        alt={episode.Title} 
                                                        style={{ 
                                                            width: '95%', 
                                                            height: 'auto',
                                                            borderRadius: '4px', 
                                                            margin: '0 auto'
                                                        }}
                                                        onError={(e) => { 
                                                            e.target.onerror = null; // prevent no-stop cycles
                                                            e.target.src = defaultPoster;
                                                        }} 
                                                    />
                                                </div>
                                                <div 
                                                    className="card-body d-flex" 
                                                    style={{ padding: '5px 10px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                                                        <h6 className="card-title" style={{ fontSize: '18px', margin: 0, flex: '1', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>
                                                            {episode.Title}
                                                        </h6>
                                                        <button 
                                                            className={`btn btn-sm ms-2 ${watchList[episode.imdbID] ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                                            style={{ alignSelf: 'flex-start' }} 
                                                            onClick={(e) => {
                                                                e.stopPropagation(); 
                                                                handleWatchListToggle(episode);
                                                            }}
                                                        >
                                                            <i className={`fa-solid fa-bookmark ${watchList[episode.imdbID] ? 'text-light' : ''}`}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-footer d-flex justify-content-start" style={{ padding: '5px 10px' }}>
                                                    <span style={{ fontSize: '16px' }}>{episode.Year}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-buttons d-flex justify-content-center align-items-center mt-4">
                                    <button onClick={jumpToFirstPage} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                                        First Page
                                    </button>
                                    <button onClick={prevPage} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span className="text-dark mx-2">Page {currentPage} of {Math.ceil(episodes.length / episodesPerPage)}</span>
                                    <button onClick={nextPage} className="btn btn-secondary ms-2" disabled={currentPage === Math.ceil(episodes.length / episodesPerPage)}>
                                        Next
                                    </button>
                                    <button onClick={jumpToLastPage} className="btn btn-secondary ms-2" disabled={currentPage === Math.ceil(episodes.length / episodesPerPage)}>
                                        Last Page
                                    </button>
                                    <br/><br/><br/><br/>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-muted fw-bold start-exploring">
                                <i className="fa-solid fa-film fa-8x mb-3"></i><br/>
                                <span style={{ fontSize: '3rem' }}>Start Exploring!</span>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchEpisodePortal;
