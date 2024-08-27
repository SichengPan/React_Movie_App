import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from './MovieDetail';
import { fetchMovieDetails } from "../api_functions/fetchContentByType.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDetailPage() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await fetchMovieDetails(imdbID, setError);
            setMovie(details);
        };
        fetchDetails();
    }, [imdbID]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!movie) return <div className="text-center">Loading...</div>;

    return (
        <div className="container my-4">
            <MovieDetail movie={movie} />
        </div>
    );
}

export default MovieDetailPage;
