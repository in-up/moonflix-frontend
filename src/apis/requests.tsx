const API_KEY: string = "4c0745192a76ad66b5dc1c5d83c340f0";

interface Requests {
  fetchDQsPick: string;
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchRomanceMovies: string;
}

const requests: Requests = {
  fetchDQsPick: `/all`,
  fetchActionMovies: `/genres/action`,
  fetchComedyMovies: `/genres/comedy`,
  fetchHorrorMovies: `/genres/horror`,
  fetchRomanceMovies: `/genres/romance`,
};

export default requests;