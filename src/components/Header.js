import { Link } from 'react-router-dom';
import 'bootswatch/dist/cosmo/bootstrap.min.css'; 

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2d3e50', padding: '1rem 0' }}>
            <div className="container-fluid">
                {/* Header of the App */}
                <a className="navbar-brand fs-3 ms-4 fw-bold text-white" href="/react_movie_app">Show Scount</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-3">
                            <Link to="/react_movie_app" className="nav-link text-white fs-5">Home Page</Link>
                        </li>
                        
                        <li className="nav-item mx-3">
                            <Link to="/react_movie_app/search" className="nav-link text-white fs-5">Search ShowScount</Link>
                        </li>

                        <li className="nav-item mx-3">
                            <Link to="/react_movie_app/series" className="nav-link text-white fs-5">Search Series By Episode</Link>
                        </li>

                        <li className="nav-item mx-3">
                            <Link to="/react_movie_app/watchlist" className="nav-link text-white fs-5">Watchlist</Link>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;