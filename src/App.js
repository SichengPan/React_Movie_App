import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MoviesPortal from "./components/MoviesPortal";
import SeriesPortal from "./components/SeriesPortal";
import EpisodePortal from "./components/EpisodePortal";
import Footer from './components/Footer';

import SearchShowScount from './components/SearchShowScount';
import MovieDetailPage from './components/MovieDetailPage';
import WatchlistPage from './components/WatchListPage.js'; 
import SearchEpisodePortal from './components/SearchEpisodePortal';


function App() {

  useEffect(() => {
    const handleGlobalError = (event) => {
      console.error('Global error captured:', event.error);
    };
    
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup the listeners on component unmount
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Ensure the app takes at least the full viewport height */}
        <Header /> 

        <div className="flex-grow-1"> {/* This div will take up remaining space between header and footer */}
          <Routes>
            <Route path="/react_movie_app" element={<MainPage />} />
            <Route path="/react_movie_app/search" element={<SearchShowScount />} />
            <Route path="/react_movie_app/series" element={<SearchEpisodePortal />} />
            <Route path="/react_movie_app/content/:imdbID" element={<MovieDetailPage />} />
            <Route path="/react_movie_app/watchlist" element={<WatchlistPage />} />
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;