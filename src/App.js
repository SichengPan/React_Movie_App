import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MoviesPortal from "./components/MoviesPortal";
import SeriesPortal from "./components/SeriesPortal";
import EpisodePortal from "./components/EpisodePortal";

function App() {
  
  return (
    <Router>
      <div>
        <Header /> {/* JSX Syntax for React component*/}

         {/* <br></br> is also okay, but this is more recommended for React component*/}

        <div>
          {/* JSX Syntax for React component*/}
          <Routes>
            <Route path="/react_movie_app" element={<MainPage />} />
            <Route path="/movies" element={<MoviesPortal />} />
            <Route path="/series" element={<SeriesPortal />} />
            <Route path="/episodes" element={<EpisodePortal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
  
  
}

export default App;
