import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MoviesPortal from "./components/MoviesPortal";
import SeriesPortal from "./components/SeriesPortal";
import EpisodePortal from "./components/EpisodePortal";
import Footer from './components/Footer';

import SearchShowScount from './components/SearchShowScount';
import MovieDetailPage from './components/MovieDetailPage';
import WatchlistPage from './components/WatchListPage';
import SearchEpisodePortal from './components/SearchEpisodePortal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename="/react_movie_app">
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchShowScount />} />
            <Route path="/series" element={<SearchEpisodePortal />} />
            <Route path="/content/:imdbID" element={<MovieDetailPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

