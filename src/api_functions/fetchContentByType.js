export const fetchContentByType = async (searchText, moviesCallback, errorCallback, finallyCallback, resultsPerPageOrSeason, type) => {
    /*
    Asynchronous function that takes searchText as input and three functions as output
    1. moviesCallback: function that receives the list of movies as input
    2. errorCallback: function that receives an error message as input
    3. finallyCallback: function that is called after the API call is complete

    Call them according to API call results, using async because there's an await api call
    */
    try {
        if (type === "episode") {
            // If type is "episode", fetch all episodes for the given season
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=8f80b26a&t=${encodeURIComponent(searchText)}&Season=${resultsPerPageOrSeason}`
            );
            const data = await response.json();

            if (data.Response === "True") {
                const allEpisodes = data.Episodes;

                if (allEpisodes.length > 0) {
                    // Fetch detailed information (including Poster) for each episode
                    const episodeDetailsPromises = allEpisodes.map((episode) =>
                        fetchEpisodeDetails(episode.imdbID, errorCallback)
                    );
                    const episodeDetails = await Promise.all(episodeDetailsPromises);

                    moviesCallback(episodeDetails);
                    errorCallback(null);
                } else {
                    moviesCallback([]);
                    errorCallback("No episodes found.");
                }
            } else {
                moviesCallback([]);
                errorCallback(data.Error);
            }
        } 
        else
        {
            //console.log("Fetching movies for:", searchText);
            //console.log("Results per page:", resultsPerPage);

            // 10 results each page
            const totalPages = Math.ceil(resultsPerPageOrSeason / 10);
            const allMovies = [];

            for (let page = 1; page <= totalPages; page++)
            {
                //console.log(`Fetching page ${page}`);

                // Use the fetch function to call the OMDB API, retrieving a list of movies
                const response = await fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=8f80b26a&type=${type}&page=${page}`);
                const data = await response.json();

                //console.log("API response:", data);

                if (data.Response === 'True') 
                {
                    allMovies.push(...data.Search); // use '...' so each is added individually
                }
                else if (page > 1)
                {
                    break;
                }
                else
                {
                    moviesCallback([]);
                    errorCallback(data.Error);
                    return;
                }
            }
            const movieDetailsPromises = allMovies.map((movie) => fetchMovieDetails(movie.imdbID, errorCallback));
            const movieDetails = await Promise.all(movieDetailsPromises); // wait for all promises to be done, then assign value

            //console.log("Fetched movie details:", movieDetails);

            moviesCallback(movieDetails);
            errorCallback(null);
        }
    } 
    catch (err) 
    {
        //console.error("Error during fetching:", err);

        moviesCallback([]);
        errorCallback('An error occurred while fetching data.');
    } 
    finally 
    {
        finallyCallback()
    }
};

export const fetchMovieDetails = async (id, errorCallback) => {
    /*
    Asynchronous function that search a movie by its id
    Return according to API call results, using async because there's an await api call
    */
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=8f80b26a`);
        const data = await response.json();

        if (data.Response === 'True') 
        {
            return data;
        } 
        else 
        {
            throw new Error(data.Error);
        }
    } 
    catch (err)
    {
        errorCallback('An error occurred while fetching movie details.');
    }
};

export const fetchEpisodeDetails = async (id, errorCallback) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=8f80b26a`);
        const data = await response.json();

        if (data.Response === "True") {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (err) {
        errorCallback('An error occurred while fetching episode details.');
    }
};