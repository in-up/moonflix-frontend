interface requests{
    fetchMovie: string;
}

const tmdb_requests: requests = {
    fetchMovie: 'https://api.themoviedb.org/3/movie/',
};

export default tmdb_requests;