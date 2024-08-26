import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(135deg, #2d3e50 30%, #1b1b1b 100%)' }}>
            <h1 className="display-3 text-white fw-bold mb-4">Welcome to Show Scount</h1>
            <p className="lead text-light mb-4">Your one-stop solution to search for movies, series, and episodes.</p>
            <Link to="/movies" className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    );
}

export default MainPage;
