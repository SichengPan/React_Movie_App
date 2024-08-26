import { useState } from "react";
import { fetchContentByType } from "../api_functions/fetchContentByType";
import ErrorAlert from "./ErrorAlert.js";
import MovieDetail from "./MovieDetail.js";

function SeriesPortal() {
    // Define two state variables:
    // 1. inputText: stores the content entered by the user in the input box in real time
    // 2. enteredInputText: stores the final input content when the user submits the form
    const [inputText, setInputText] = useState("");
    const [enteredInputText, setEnteredInputText] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1); // current page is page 1
    const type = "series";

    // Function called when submitting the form:
    // e.preventDefault() prevents the default form submission behavior (avoids page refresh)
    // Then save the current inputText value to enteredInputText using setEnteredInputText
    // (e) => equals to lambda function
    const handleSubmit = (e) => {
        e.preventDefault();
        // Back to page 1
        setCurrentPage(1);
        // use '()=>' so it will not be implemented directly but operated when doing finallyCallback
        fetchContentByType(inputText, setMovies, setError, ()=>setEnteredInputText(inputText), resultsPerPage, type);
    };

    // Calculate the index of the first and last movie on the current page
    const indexOfLastMovie = currentPage * 10;
    const indexOfFirstMovie = indexOfLastMovie - 10;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const nextPage = () => {
        if (currentPage < Math.ceil(movies.length / 10)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const jumpToFirstPage = () => {
        setCurrentPage(1);
    };

    const jumpToLastPage = () => {
        setCurrentPage(Math.ceil(movies.length / 10));
    };

    // once submit, update the inputText in input box
    // then update enteredInputText with inputText and present
    return (
        <> {/* <></> Return multiple elements without effecting layout */}
        <div
            className="d-flex flex-column"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', 
                background: 'linear-gradient(135deg, #2d3e50 30%, #1b1b1b 100%)',
                padding: '20px'
            }}
        >
        <div className="row mb-4">
            <div className="col-md-12">
                <form onSubmit={handleSubmit}> {/* call handleSubmit once the form submits */}
                    <div className="row g-3">
                    <div className="col-md-1 text-white fw-bold text-center" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                        Search Series
                    </div>
                    <div className="col-md-9">
                    <input
                        type="text"
                        placeholder="Search for Series"
                        className="form-control form-control-lg"
                        value={inputText} // The value of the input box is bound to the searchInputText state
                        onChange={(e) => setInputText(e.target.value)} // Update searchInputText when the content of the input box changes
                    />
                    </div>
                    <div className="col-md-1">
                        <select
                            className="form-select form-select-lg" 
                            value={resultsPerPage}
                            onChange={(e) => setResultsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10 Series</option>
                            <option value={20}>20 Series</option>
                            <option value={30}>30 Series</option>
                            <option value={40}>40 Series</option>
                            <option value={50}>50 Series</option>
                            <option value={60}>60 Series</option>
                            <option value={70}>70 Series</option>
                            <option value={80}>80 Series</option>
                            <option value={90}>90 Series</option>
                            <option value={100}>100 Series</option>
                        </select>
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-primary btn-lg">Search</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        
        <br/>
        {/* "A && B" --> if A is true then do B */}
        {error && <ErrorAlert error={error} searchTerm={enteredInputText}/>}
        {movies.length > 0 &&  <p className='text-light'>Showing {movies.length} Series for '{enteredInputText}'</p>}
        {/*{movies.map((movie) => (*/}
        {currentMovies && currentMovies.length > 0 && currentMovies.map((movie) => (
            <MovieDetail key={movie.imdbID} movie={movie} />
        ))}

        {!error && movies.length > 0 && (
        <div className="pagination-buttons d-flex justify-content-center align-items-center mt-4">
            <button onClick={jumpToFirstPage} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                First Page
            </button>
            <button onClick={prevPage} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                Previous
            </button>
            <span className="text-light mx-2">Page {currentPage} of {Math.ceil(movies.length / 10)}</span>
            <button onClick={nextPage} className="btn btn-secondary ms-2" disabled={currentPage === Math.ceil(movies.length / 10)}>
                Next
            </button>
            <button onClick={jumpToLastPage} className="btn btn-secondary ms-2" disabled={currentPage === Math.ceil(movies.length / 10)}>
                Last Page
            </button>
        </div>
        )}

        {/*
        {<p> Results per page is: '{resultsPerPage}' </p>}
        {JSON.stringify(movies)}
        */}
        </div>
        </>
    );
}

export default SeriesPortal;
