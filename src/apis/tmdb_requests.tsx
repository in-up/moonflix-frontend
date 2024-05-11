interface requests{
    fetchImage: string;
    fetchMovie: string;
}

const tmdb_requests: requests = {
    fetchImage: 'https://image.tmdb.org/t/p/original',
    fetchMovie: 'https://api.themoviedb.org/3/movie/',
};

export default tmdb_requests;