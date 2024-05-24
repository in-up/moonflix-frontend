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
import Rating from '../layout/Rating';
import { slateDark } from "@radix-ui/colors";
import Itembase from './Itembase';

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
  justify-content: center;
`;

// 중앙 & 메인
const StyledContainer = styled.div`
  width: 60%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 0;
  }
`;

const Overview = styled.p`
  font-size: 1rem;
  padding: 1rem;
  color: white;
  padding-bottom: 2rem;
  line-height: 1.875rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 1rem 0; 
`;

const MovieInfo = styled.div`
  margin: 1rem;
  display: flex;
`

const Box = styled.div`
  background-color: ${slateDark.slate1};
  border-radius: 16px;
  border: #ffffff55 1px solid;
  padding: 0.5rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;

  div {
    margin-left: 1rem;
  }
`;

const BoxText = styled.div`
  margin: 1rem;
`;


const RatingWord = styled.div`
  margin-right: 0.7rem;
`;


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
  const [personalizeUrl, setPersonalizeUrl] = useState<string>('/item-based/'+id);


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
          vote_average: data.vote_average,
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

  const addRating = (rating: number) => {
    const url = `/item-based/${id}`;
    setPersonalizeUrl(url);
  };

  console.log(movie);
  if (!movie) {
    return <p>Loading...</p>;
  }
  console.log(personalizeUrl+id);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <StyledContainer>
          <Backdrop
            path={movie.backdrop_path}
            title={movie.title}
            year={movie.year}
          />
          <div>
            <MovieInfo>
              <Box>
                <div>
                   <Rating rating={movie.vote_average} size={30} />
                </div>
                <BoxText>{Math.round(movie.vote_average * 10)}%의 사용자가 긍정적으로 평가했습니다!</BoxText>
              </Box>
            </MovieInfo>
            {/* <MovieInfo>
              <Box>
                <BoxText>테스트</BoxText>
              </Box>
            </MovieInfo> */}
            <Overview>{movie.overview}</Overview>
            <Credits
              tmdbId={tmdbId}
            />
            <Itembase
            title="비슷한 작품"
            id="about"
            fetchUrl={personalizeUrl}
            addRating={addRating}
            />
          </div>
        </StyledContainer>
      </Main>
    </>
  );
};

export default Movie;