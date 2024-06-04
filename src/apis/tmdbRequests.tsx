interface requests {
  fetchMovie: string;
  tmdbAPI: string | undefined;
}

const tmdb_requests: requests = {
  fetchMovie: "https://api.themoviedb.org/3/movie/",
  tmdbAPI: process.env.NEXT_PUBLIC_TMDB_API_KEY,
};

export default tmdb_requests;
