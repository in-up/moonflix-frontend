// pages/movieinfo/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../../apis/tmdb_requests';
import Head from 'next/head';
import styled from "styled-components";
import Header from "../layout/Header";
import Backdrop from './Backdrop';
import Credits from './Credits';

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  margin-top: 6rem;
  color: white;
`;

interface MovieInfo {
  id: number;
  title: string;
  director: string;
  year: number;
  backdrop_path: string;
}

const apikey = 'YOUR_TMDB_API_KEY';

const Movie: React.FC = () => {
  //header 정보
  const pageTitle = '영화달 MOONFLIX - 영화정보';
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  //페이지 상단 네비게이터

  //api key
  const apikey = process.env.TMDB_API_KEY;

  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const tmdbId = typeof id === 'string' ? parseInt(id, 10) : -1; // 문자열 id를 number로 변환


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${requests.fetchMovie}${id}?api_key=${apikey}&language=ko-KR`);
        const data = response.data;
        console.log(response.data);
        const movieData: MovieInfo = {
          id: data.id,
          title: data.title,
          director: data.director, // Assuming TMDB API provides director information
          year: new Date(data.release_date).getFullYear(),
          backdrop_path: data.backdrop_path,
        };
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Backdrop
        path={movie.backdrop_path}
      />

      <div>
        <h1>{movie.title}</h1>
        <p>Director: {movie.director}</p>
        <p>Year: {movie.year}</p>

        <Credits
          tmdbId={tmdbId}
        />


      </div>
    </Main>
  );
};

export default Movie;