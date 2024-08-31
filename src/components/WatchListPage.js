import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { displayWatchList } from '../watchlist_functions/WatchListOperations.js';


const WatchlistPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Call the displayWatchList function and pass navigate to display the favorite movie list
        displayWatchList(navigate);
    }, [navigate]);

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between p-0">
            <div className="container-fluid text-center py-5 pb-4" style={{ background: 'linear-gradient(135deg, #2d3e50 30%, #1b1b1b 100%)' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-white fw-bold" style={{ fontSize: '3rem', lineHeight: '2', textAlign: 'left' }}>
                                    Your Watchlist
                                </h1>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-8">
                                <p className="text-white" style={{ textAlign: 'left' }}>
                                    Your Watchlist is the place to track the contents you want to watch. You can add or remove contents, or access their IMDB page and watch them on youtube.
                                </p>
                            </div>
                    
                            {/* Search More */}
                            <div className="col-md-3 text-end">
                                <a href="/react_movie_app/search" className="text-light" style={{ textAlign: 'right' }}>Search More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid text-center flex-grow-1 d-flex align-items-start justify-content-center" style={{ backgroundColor: '#f5f5f5', paddingTop: '20px' }}>
                <div className="row justify-content-center w-100">
                    <div className="col-md-8">
                        <div className="row fav-container d-flex align-items-start"> 
                            {/* Cards will be rendered here */}
                        </div>

                        <div className="pagination-container mt-4">
                            {/* Pagination buttons will be rendered here */}
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistPage;
