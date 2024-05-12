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
  display: flex;
`;



const Container = styled.div`
  display: flex;
  height: 100%;
`;

const LeftContainer = styled.div`
  width: 20%;
  height: 100%;
  filter: blur(10px); /* 블러 처리 */
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  background-color: rgb();
  filter: blur(10px); /* 블러 처리 */
`;

const MiddleContainer = styled.div`
  width: 60%;
  height: 100%;
`;

const MovieTitle = styled.h1`
  font-size: 2.75rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  margin-bottom: 0;
`;

const Overview = styled.p`
  font-size: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  padding-bottom: 2rem;
`;

const Detail = styled.p`
  font-size: 0.8rem;
  padding-right: 3rem;
  padding-left: 3rem;
  color: white;
  padding-top: 0.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2); /* 흰색의 20% 투명도 배경색 */
  margin: 1rem 0; /* 위아래 여백 */
`;

interface MovieInfo {
  id: number;
  title: string;
  overview: string;
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
          overview: data.overview, // Assuming TMDB API provides director information
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

  console.log(movie);
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <LeftContainer>
          {/* 왼쪽 컨테이너에 들어갈 블러 처리 요소 */}
        </LeftContainer>
        <MiddleContainer>
          <Backdrop
            path={movie.backdrop_path}
          />
          <div>
            <MovieTitle>{movie.title}</MovieTitle>
            <Detail>Year: {movie.year}</Detail>
            <Divider />
            <Overview>{movie.overview}</Overview>
            <Divider />
            <Credits
              tmdbId={tmdbId}
            />
          </div>
        </MiddleContainer>
        <RightContainer>
          {/* 오른쪽 컨테이너에 들어갈 블러 처리 요소 */}
        </RightContainer>
      </Main>
    </>
  );
};

export default Movie;