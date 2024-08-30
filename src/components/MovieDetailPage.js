import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToWatchList, removeFromWatchList } from '../watchlist_functions/WatchListOperations'; // Import watchlist functions


import defaultPoster from '../pics/blank-movie-poster1.jpg';

const apiKey = '8f80b26a'; // Your API key
const baseURL = 'https://www.omdbapi.com/';

const MovieDetailPage = () => {
    const { imdbID } = useParams();  
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const [watchList, setWatchList] = useState(() => {
        const storedWatchList = {};
        Object.keys(localStorage).forEach(key => {
            storedWatchList[key] = true;
        });
        return storedWatchList;
    });

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${baseURL}?i=${imdbID}&apikey=${apiKey}`);
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (error) {
                setError('An error occurred while fetching movie details.');
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    const handleWatchListToggle = (movie) => {
        const isAdded = watchList[movie.imdbID];
        if (isAdded) {
            removeFromWatchList(movie.imdbID);
        } else {
            addToWatchList(movie);
        }
        setWatchList((prev) => ({
            ...prev,
            [movie.imdbID]: !isAdded
        }));
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <h1 className="font-weight-bold" style={{ fontSize: '3rem', fontWeight: '700' }}>Movie Details</h1>
                <div className="col-md-4">
                    <img src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultPoster} alt="Movie Poster" className="img-fluid" />
                    <div className="mt-3">
                        <button onClick={() => navigate(-1)} className="btn btn-primary btn-block">Back to Previous Page</button> {/* Use navigate(-1) to go back */}
                    </div>
                    <br/>
                </div>
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-start">
                        <h1 style={{ fontWeight: '700' }}>{movie.Title}</h1>
                        <button 
                            className={`btn btn-sm ms-2 ${watchList[movie.imdbID] ? 'btn-secondary' : 'btn-outline-secondary'}`}
                            style={{ alignSelf: 'flex-start' }} 
                            onClick={(e) => {
                            e.stopPropagation(); // prevent default card click
                            handleWatchListToggle(movie);
                            }}
                        >
                            <i className={`fa-solid fa-bookmark ${watchList[movie.imdbID] ? 'text-light' : ''}`}></i>
                        </button>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span style={{ fontWeight: '700' }}>{`${movie.Year} • ${movie.Country} • Rating - ${movie.imdbRating}/10`}</span>
                    </div>
                    <ul className="list-unstyled mt-3">
                        <li><strong>Actors: </strong>{movie.Actors}</li>
                        <li><strong>Director: </strong>{movie.Director}</li>
                        <li><strong>Writers: </strong>{movie.Writer}</li>
                        <li><strong>Genre: </strong>{movie.Genre}</li>
                        <li><strong>Release Date: </strong>{movie.DVD}</li>
                        <li><strong>Box Office: </strong>{movie.BoxOffice}</li>
                        <li><strong>Runtime: </strong>{movie.Runtime}</li>
                    </ul>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>{movie.Plot}</p>
                    <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#222', marginTop: '10px' }}>
                        <i className="fa-solid fa-award"></i>&thinsp; {movie.Awards}
                    </p>
                    <div>
                        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" className="btn btn-info mr-2">IMDB</a>
                        <a href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`} target="_blank" className="btn btn-warning">Watch Trailer</a>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
