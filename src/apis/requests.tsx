const API_KEY: string = "4c0745192a76ad66b5dc1c5d83c340f0";

interface Requests {
  fetchDQsPick: string;
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchRomanceMovies: string;
  fetchAdventureMovies: string;
  fetchAnimationMovies: string;
  fetchChildrenMovies: string;
  fetchFantasyMovies: string;
  fetchCrimeMovies: string;
  fetchThrillerMovies: string;
  fetchDramaMovies: string;
  fetchWarMovies: string;
  fetchMysteryMovies: string;
  fetchSciFiMovies: string;
  fetchDocumentaryMovies: string;
  fetchIMAXMovies: string;
  fetchFilmNoirMovies: string;
  fetchMusicalMovies: string;
  fetchWesternMovies: string;
}

const requests: Requests = {
  fetchDQsPick: `/all`,
  fetchActionMovies: `/genres/Action`,
  fetchComedyMovies: `/genres/Comedy`,
  fetchHorrorMovies: `/genres/Horror`,
  fetchRomanceMovies: `/genres/Romance`,
  fetchAdventureMovies: `/genres/Adventure`,
  fetchAnimationMovies: `/genres/Animation`,
  fetchChildrenMovies: `/genres/Children`,
  fetchFantasyMovies: `/genres/Fantasy`,
  fetchCrimeMovies:`/genres/Crime`,
  fetchThrillerMovies: `/genres/Thriller`,
  fetchDramaMovies: `/genres/Drama`,
  fetchWarMovies: `/genres/War`,
  fetchMysteryMovies: `/genres/Mystery`,
  fetchSciFiMovies: `/genres/Scifi`,
  fetchDocumentaryMovies: `/genres/Documentary`,
  fetchIMAXMovies: `/genres/Imax`,
  fetchFilmNoirMovies: `/genres/FilmNoir`,
  fetchMusicalMovies: `/genres/Musical`,
  fetchWesternMovies: `/genres/Western`
};

export default requests;