// API Key and Base URL
const apiKey = '8f80b26a';
const baseURL = 'https://www.omdbapi.com/';

// Define the searchEpisodesAndSeries function
export const searchEpisodesAndSeries = async (searchText, season, callback, errorCallback) => {
    try {
        const response = await fetch(`${baseURL}?apikey=${apiKey}&t=${encodeURIComponent(searchText)}&Season=${season}`);
        const data = await response.json();

        if (data.Response === "True") {
            const episodes = data.Episodes || [];

            // Map episodes to include only the necessary fields
            const formattedEpisodes = await Promise.all(
                episodes.map(async (episode) => {
                    // Fetch detailed information for each episode
                    const detailsResponse = await fetch(`${baseURL}?apikey=${apiKey}&i=${episode.imdbID}`);
                    const detailsData = await detailsResponse.json();

                    if (detailsData.Response === "True") {
                        return {
                            imdbID: episode.imdbID,
                            Poster: detailsData.Poster !== "N/A" ? detailsData.Poster : null,
                            Title: episode.Title,
                            Year: detailsData.Year,
                            Season: season, // Include Season
                            Episode: episode.Episode // Include Episode number
                        };
                    } else {
                        throw new Error(detailsData.Error);
                    }
                })
            );

            callback(formattedEpisodes);
        } else {
            errorCallback(data.Error || 'No episodes found.');
        }
    } catch (error) {
        errorCallback('An error occurred while searching.');
    }
};

