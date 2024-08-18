import { useState } from "react";
import { fetchMovies } from "../api_functions/fetchMovies";
import ErrorAlert from "./ErrorAlert.js";
import MovieDetail from "./MovieDetail.js";

function MoviesPortal() {
    // Define two state variables:
    // 1. inputText: stores the content entered by the user in the input box in real time
    // 2. enteredInputText: stores the final input content when the user submits the form
    const [inputText, setInputText] = useState("");
    const [enteredInputText, setEnteredInputText] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1); // current page is page 1

    // Function called when submitting the form:
    // e.preventDefault() prevents the default form submission behavior (avoids page refresh)
    // Then save the current inputText value to enteredInputText using setEnteredInputText
    // (e) => equals to lambda function
    const handleSubmit = (e) => {
        e.preventDefault();
        // Back to page 1
        setCurrentPage(1);
        // use '()=>' so it will not be implemented directly but operated when doing finallyCallback
        fetchMovies(inputText, setMovies, setError, ()=>setEnteredInputText(inputText), resultsPerPage);
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
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={handleSubmit}> {/* call handleSubmit once the form submits */}
                    <div className="row">
                    <div className="col-md-10">
                    <input
                        type="text"
                        placeholder="Search for Movies"
                        className="form-control"
                        value={inputText} // The value of the input box is bound to the searchInputText state
                        onChange={(e) => setInputText(e.target.value)} // Update searchInputText when the content of the input box changes
                    />
                    </div>
                    <div className="col-md-1">
                        <select
                            className="form-select me-2" 
                            value={resultsPerPage}
                            onChange={(e) => setResultsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10 Movies</option>
                            <option value={20}>20 Movies</option>
                            <option value={30}>30 Movies</option>
                            <option value={40}>40 Movies</option>
                            <option value={50}>50 Movies</option>
                            <option value={60}>60 Movies</option>
                            <option value={70}>70 Movies</option>
                            <option value={80}>80 Movies</option>
                            <option value={90}>90 Movies</option>
                            <option value={100}>100 Movies</option>
                        </select>
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        <br/>
        {/* "A && B" --> if A is true then do B */}
        {error && <ErrorAlert error={error} searchTerm={enteredInputText}/>}
        {movies.length > 0 &&  <p className='text-light'>Showing {movies.length} Movies for '{enteredInputText}'</p>}
        {/*{movies.map((movie) => (*/}
        {currentMovies.map((movie) => (
            <MovieDetail key={movie.imdbID} movie={movie} />
        ))}

        <div className="pagination-buttons d-flex justify-content-center align-items-center mt-3">
            <button onClick={jumpToFirstPage} className="btn btn-secondary" disabled={currentPage === 1}>
                First Page
            </button>
            <button onClick={prevPage} className="btn btn-secondary" disabled={currentPage === 1}>
                Previous
            </button>
            <span className="text-light mx-2">Page {currentPage} of {Math.ceil(movies.length / 10)}</span>
            <button onClick={nextPage} className="btn btn-secondary" disabled={currentPage === Math.ceil(movies.length / 10)}>
                Next
            </button>
            <button onClick={jumpToLastPage} className="btn btn-secondary" disabled={currentPage === Math.ceil(movies.length / 10)}>
                Last Page
            </button>
        </div>

        {/*
        {<p> Results per page is: '{resultsPerPage}' </p>}
        {JSON.stringify(movies)}
        */}
        </>
    );
}

export default MoviesPortal;

/*
    About why const is used instead of let:

    1. const ensures that variable references remain unchanged:
    - Variables declared with const cannot be reassigned, for example:
    searchInputText = "new value"; // This is not allowed
    - The const here ensures that the references of searchInputText and setSearchInputText are fixed and will not be accidentally reassigned.

    2. State updates are done through functions provided by React:
    - In React, state updates are done through functions such as setSearchInputText() and setEnteredSearchText().
    - These updates do not change the references of state variables, but the values ​​they store.

    3. const does not affect state updates:
    - Using const does not mean that the state cannot be updated. It just ensures that the reference (not the value) of the variable is immutable.
    - In React, using const is in line with best practices because the reference of state variables is usually unchanged during the life cycle of the component.

    In summary, using const can prevent unexpected errors and ensure that the code is more stable and safe.
*/