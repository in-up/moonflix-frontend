// pages/movie/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../../apis/tmdb_requests';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../layout/Header';
import Backdrop from './Backdrop';
import Credits from './Credits';
import Rating from '../layout/Rating';
import Comment from './Comment';
import supabase from '@/apis/supabaseClient';

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
  filter: blur(10px); /* 블러 처리 */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  background-color: rgb();
  filter: blur(10px); /* 블러 처리 */

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
  const pageTitle = '영화달 MOONFLIX - 영화정보';
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  const apikey = process.env.TMDB_API_KEY;

  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const tmdbId = typeof id === 'string' ? parseInt(id, 10) : -1;
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);

  useEffect(() => {
    const fetchMovieAndComments = async () => {
      try {
        const movieResponse = await axios.get(`${requests.fetchMovie}${id}?api_key=${apikey}&language=ko-KR`);
        const movieData = movieResponse.data;
        setMovie({
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          year: new Date(movieData.release_date).getFullYear(),
          backdrop_path: movieData.backdrop_path,
          vote_average: movieData.vote_average,
        });
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    if (id) {
      fetchMovieAndComments();
    }
  }, [id, apikey]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <LeftContainer />
        <MiddleContainer>
          <Backdrop path={movie ? movie.backdrop_path : ''} />
          <div>
            <MovieTitle>{movie ? `${movie.title} (${movie.year})` : 'Loading...'}</MovieTitle>
            <RatingBox>
              <Rating rating={movie ? movie.vote_average : 0} size={70} />
            </RatingBox>
            <RatingBox>
              <RatingWord>평점 : {movie ? Math.round(movie.vote_average * 10) : 0}%</RatingWord>
            </RatingBox>
            <Divider />
            <Overview>{movie ? movie.overview : 'Loading...'}</Overview>
            <Divider />
            <Credits tmdbId={tmdbId} />
            {id && <Comment id={id as string} />}
          </div>
        </MiddleContainer>
        <RightContainer />
      </Main>
    </>
  );
};

export default Movie;
