import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MoviesPortal from "./components/MoviesPortal";
import SeriesPortal from "./components/SeriesPortal";
import EpisodePortal from "./components/EpisodePortal";
import Footer from './components/Footer';

import SearchShowScount from './components/SearchShowScount';
import MovieDetailPage from './components/MovieDetailPage';
import WatchlistPage from './components/WatchlistPage'; 
import SearchEpisodePortal from './components/SearchEpisodePortal';


function App() {
  
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Ensure the app takes at least the full viewport height */}
        <Header /> 

        <div className="flex-grow-1"> {/* This div will take up remaining space between header and footer */}
          <Routes>
            <Route path="/react_movie_app" element={<MainPage />} />
            <Route path="/search" element={<SearchShowScount />} />
            <Route path="/series2" element={<SearchEpisodePortal />} />
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
