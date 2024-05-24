// pages/movieinfo/[id]/[title].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../../../apis/tmdb_requests';
import Head from 'next/head';
import styled from "styled-components";
import Header from "../../layout/Header";
import Backdrop from '../Backdrop';
import Credits from '../Credits';
import Rating from '../../layout/Rating';
import Row from '../../layout/Row';

interface MovieInfo {
  id: number;
  title: string;
  overview: string;
  year: number;
  backdrop_path: string;
  vote_average: number;
}

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

const LeftContainer = styled.div`
  width: 20%;
  height: 100%;
  filter: blur(10px);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  background-color: rgb();
  filter: blur(10px);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MiddleContainer = styled.div`
  width: 60%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 0;
  }
`;

const MovieTitle = styled.h1`
  font-size: 3.75rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  margin-bottom: 0.4rem;
`;

const Overview = styled.p`
  font-size: 1.3rem;
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
  background-color: rgba(255, 255, 255, 0.2);
  margin: 1rem 0; 
`;

const RatingBox = styled.div`
  padding-left: 3rem;
  display: flex;
`;

const RatingWord = styled.div`
  margin-right: 0.7rem;
`;

const Movie: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  const router = useRouter();
  const { id, title } = router.query;
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const tmdbId = typeof id === 'string' ? parseInt(id, 10) : -1;
  const [personalizeUrl, setPersonalizeUrl] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${requests.fetchMovie}${id}?api_key=${requests.tmdbAPI}&language=ko-KR`);
        const data = response.data;
        const movieData: MovieInfo = {
          id: data.id,
          title: data.title,
          overview: data.overview,
          year: new Date(data.release_date).getFullYear(),
          backdrop_path: data.backdrop_path,
          vote_average: data.vote_average,
        };
        setMovie(movieData);
      } catch (error) {
        console.error('영화 정보를 불러오는데 오류가 발생했습니다:', error);
      }
    };

    if (id) {
      fetchMovie();
    //   setPersonalizeUrl(`/api/item-based/${MovieTitle}`);
    }
  }, [id]);

  if (!movie) {
    return <p>로딩 중...</p>;
  }

  const addRating = (rating: number) => {
    const url = `/api/item-based/${MovieTitle}`;
    setPersonalizeUrl(url);
  };

  return (
    <>
      <Head>
        <title>영화달 MOONFLIX - {movie.title}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <LeftContainer />
        <MiddleContainer>
          <Backdrop path={movie.backdrop_path} />
          <div>
            <MovieTitle>{movie.title} ({movie.year})</MovieTitle>
            <RatingBox>
              <Rating rating={movie.vote_average} size={70} />
            </RatingBox>
            <RatingBox>
              <RatingWord>평점 : {Math.round(movie.vote_average * 10)}%</RatingWord>
            </RatingBox>
            <Divider />
            <Overview>{movie.overview}</Overview>
            <Divider />
            <Credits tmdbId={tmdbId} />
            <Row
            title="관련 영화"
            id="about"
            fetchUrl={`/item-based/${title}`}
            addRating={addRating}
            />
          </div>
        </MiddleContainer>
        <RightContainer />
      </Main>
    </>
  );
};

export default Movie;
