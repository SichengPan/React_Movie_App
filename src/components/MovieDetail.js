function MovieDetail({ movie })
{
    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <img src={movie.Poster} alt={movie.Title} width='100%' />
                </div>
                <div class='col-md-10'>
                    <div className="card bg-transparent border-2" style={{ border: '1px solid #b0b0b0' }}>
                        <div class="card-body card-body text-light">
                            <h3 class="card-title">{movie.Title}</h3>
                            <h6 class="card-subtitle mb-2" style={{ color: '#a9a9a9' }}>{movie.Released}</h6>
                            <p class="card-text">{movie.Plot}</p>
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" class="card-link">IMDB</a>
                            <a href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`} target="_blank" class="card-link">Watch Trailer</a>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

export default MovieDetail;