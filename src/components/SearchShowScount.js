import React, { useState, useEffect } from 'react';
import MovieDetail from './MovieDetail.js';
import ErrorAlert from './ErrorAlert';
import { fetchContentByType } from "../api_functions/fetchContentByType.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/style.css'; // 引入 CSS 文件

function SearchShowScount() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false); // 控制结果显示

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        await fetchContentByType(
            searchTerm,
            setMovies,
            setError,
            () => setLoading(false),
            10,
            'movie' // 可以根据需要更改为 'series'
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const triggerPosition = window.innerHeight * 0.4; // 40% 视口高度

            if (scrollPosition >= triggerPosition) {
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="search-show-scount">
            {/* 搜索部分 */}
            <div className="search-header">
                <div className="container">
                    <h1 className="search-title">Search for Movies</h1>
                    <form onSubmit={handleSearch}>
                        <div className="input-group my-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type movie name here..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-light" type="submit">
                                <i className="bi bi-search"></i> {/* Bootstrap 放大镜图标 */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* 结果部分 */}
            <div
                className={`search-results container my-4 ${showResults ? 'visible' : 'hidden'}`}
            >
                {loading && <div className="text-center">Loading...</div>}
                {error && <ErrorAlert error={error} searchTerm={searchTerm} />}
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="col-md-4 mb-3">
                            <div className="card">
                                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.Title}</h5>
                                    <p className="card-text"><small>{movie.Year}</small></p>
                                    <a href={`/movie/${movie.imdbID}`} className="btn btn-primary">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchShowScount;
