import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleContentDetails = () => {
    const { imdbID } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=8f80b26a`);
                const data = await response.json();
                if (data.Response === 'True') {
                    setMovieDetails(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError('An error occurred while fetching the details.');
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            {/* Render movie details here */}
        </div>
    );
};

export default SingleContentDetails;