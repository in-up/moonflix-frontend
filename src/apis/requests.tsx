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
  fetchActionMovies: `/genres/action`,
  fetchComedyMovies: `/genres/comedy`,
  fetchHorrorMovies: `/genres/horror`,
  fetchRomanceMovies: `/genres/romance`,
  fetchAdventureMovies: `/genres/adventure`,
  fetchAnimationMovies: `/genres/animation`,
  fetchChildrenMovies: `/genres/children`,
  fetchFantasyMovies: `/genres/fantasy`,
  fetchCrimeMovies:`/genres/crime`,
  fetchThrillerMovies: `/genres/thriller`,
  fetchDramaMovies: `/genres/drama`,
  fetchWarMovies: `/genres/war`,
  fetchMysteryMovies: `/genres/mystery`,
  fetchSciFiMovies: `/genres/scifi`,
  fetchDocumentaryMovies: `/genres/documentary`,
  fetchIMAXMovies: `/genres/imax`,
  fetchFilmNoirMovies: `/genres/filmNoir`,
  fetchMusicalMovies: `/genres/musical`,
  fetchWesternMovies: `/genres/western`
};

export default requests;