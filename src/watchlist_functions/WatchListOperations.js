// WatchListOperations.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

// add to watchList
export function addToWatchList(movie) {
    if (!movie || !movie.imdbID) return;
    localStorage.setItem(movie.imdbID, JSON.stringify(movie));
    alert(`${movie.Title} has been added to your watchlist!`);
}

// remove from watchList
export function removeFromWatchList(imdbID) {
    if (!imdbID) return;
    localStorage.removeItem(imdbID);
    alert(`Movie has been removed from your watchlist.`);
}

// Display all movies in watchList
export const displayWatchList = (navigate) => {
    const container = document.querySelector('.fav-container');
    container.innerHTML = ''; // 清空容器

    // show prompts if it is empty
    if (localStorage.length === 0) {
        const emptyMessage = `
            <div class="text-center text-muted fw-bold start-exploring">
                <br /> <br /> <br /> <br /> <br /> <br />
                <i class="fa-solid fa-film fa-8x mb-3"></i><br/>
                <span style= "font-size: 2rem; line-height: 1;">
                    Your Watchlist is empty. <br />
                    Start exploring and add some movies & series!
                </span>
            </div>
        `;
        container.innerHTML = emptyMessage;
        return;
    }

    // 获取所有收藏的电影
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const movie = JSON.parse(localStorage.getItem(key));

        // 创建电影卡片
        const movieCard = document.createElement('div');
        movieCard.className = 'col-lg-3 col-md-4 col-6 mb-4';
        movieCard.style.cursor = 'pointer';
        
        // HTML structure for the movie card
        const cardHTML = `
            <div class="card bg-light h-100" style="width: 100%; box-shadow: 1px 2px #a1a1a1; border-radius: 4px;">
                <div class="fav-poster" style="padding: 10px 0 5px 0;">
                    <img src="${movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/pics/blank-movie-poster1.jpg'}"
                         class="card-img-top" alt="${movie.Title}" 
                         style="width: 95%; height: auto; border-radius: 4px; margin: 0 auto;">
                </div>
                <div class="card-body d-flex" style="padding: 5px 10px; flex-direction: row; justify-content: space-between; align-items: flex-start;">
                    <div style="display: flex; align-items: flex-start; width: 100%;">
                        <h6 class="card-title" style="font-size: 18px; margin: 0; flex: 1; text-align: left;">${movie.Title}</h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-start" style="padding: 5px 10px;">
                    <span style="font-size: 16px;">${movie.Year}</span>
                </div>
            </div>
        `;

        movieCard.innerHTML = cardHTML;

        // 创建图标按钮并添加到卡片中
        const button = document.createElement('button');
        button.className = `btn btn-sm ms-2 ${localStorage.getItem(movie.imdbID) ? 'btn-secondary' : 'btn-outline-secondary'}`;
        button.style.alignSelf = 'flex-start';
        button.onclick = (event) => {
            event.stopPropagation();

            // if it is in watchList, remove it; else, add it
            const isInWatchList = localStorage.getItem(movie.imdbID);

            if (isInWatchList) {
                removeFromWatchList(movie.imdbID);
                button.className = 'btn btn-outline-secondary btn-sm ms-2';
            } else {
                addToWatchList(movie);
                button.className = 'btn btn-secondary btn-sm ms-2';
            }
        };

        const icon = document.createElement('i');
        icon.className = 'fa fa-bookmark';

        button.appendChild(icon);

        // 将按钮添加到 .card-body 的 div 里
        movieCard.querySelector('.card-body div').appendChild(button);

        // Add click event listener to navigate to movie detail page
        movieCard.addEventListener('click', () => {
            navigate(`/content/${movie.imdbID}`);
        });

        container.appendChild(movieCard);
    }
}
