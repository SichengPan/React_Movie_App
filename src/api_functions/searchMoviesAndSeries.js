// API Key and Base URL
const apiKey = '8f80b26a';
const baseURL = 'https://www.omdbapi.com/';

// Search Function for Movies and Series
export const searchMoviesAndSeries = async (searchText, searchType, callback, errorCallback) => {
    try {
        let results = [];
        let page = 1;
        let retryCount = 0;

        while (page <= 10 && retryCount < 2) {
            let url = `${baseURL}?s=${searchText}&apikey=${apiKey}&page=${page}`;
            
            if (searchType === 'movie') {
                url += '&type=movie';
            } else if (searchType === 'series') {
                url += '&type=series';
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === 'True') {
                results = [...results, ...data.Search];
                retryCount = 0;
            } else {
                retryCount += 1;
            }

            page += 1; // 增加页数以获取下一页结果
        }

        // test
        console.log(results.length);

        if (results.length > 0) {
            callback(results); // 返回所有结果
        } else {
            errorCallback('No results found.');
        }
    } catch (error) {
        errorCallback('An error occurred while searching.');
    }
};

