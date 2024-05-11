import { useRouter } from "next/router"; // useRouter import 추가
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from "../../../apis/requests";
import Row from "../../layout/Row";
import styled from 'styled-components';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  genre: string;
  poster_url: string;
}

// 스타일 컴포넌트 정의
const MovieRow = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;
`;

const MoviePoster = styled.img`
  width: 150px;
  height: 225px;
  margin-right: 10px;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const GenreTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const API_URL = 'http://127.0.0.1:8000';  // 백엔드 서버 주소

// Page2 컴포넌트 정의
const Page2: React.FC = () => {
  const router = useRouter();
  const [moviesByGenre, setMoviesByGenre] = useState<Map<string, Movie[]>>(new Map());
  const genres = ['애니메이션', '액션', '코미디', '드라마', '로맨스', '어드벤처', '애니메이션', '어린이', '판타지', '범죄', '스릴러', '전쟁', '미스터리', 'SF', '다큐멘터리', 'IMAX', '느와르', '뮤지컬', '서부'];  // 필요한 장르 리스트
  const { pathname, query } = router; // useRouter로 변경
  const { asPath } = router; // 추가된 부분

  const searchParams = new URLSearchParams(asPath.split("?")[1]); // URLSearchParams에서 쿼리 파라미터 가져오기

  const [personalizeUrl, setPersonalizeUrl] = useState<string>("/all");
  const [myRating, setMyRating] = useState<number[]>([]);
  
  const addRating = (rating: number) => {
    const updatedRatings = [...myRating, rating];
    setMyRating(updatedRatings);
    const userBasedParams = updatedRatings.join("&params=");
    const url = `/api/user-based/?params=${userBasedParams}`;
    setPersonalizeUrl(url);
  };

  useEffect(() => {
    // 각 장르별로 영화 데이터를 가져오는 함수
    const fetchMoviesByGenre = async (genre: string) => {
      try {
        const response = await axios.get(`${API_URL}/movies?genre=${encodeURIComponent(genre)}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        return [];
      }
    };

    // 모든 장르에 대해 데이터를 가져와 상태에 저장
    const loadMovies = async () => {
      const newMoviesByGenre = new Map<string, Movie[]>();

      for (const genre of genres) {
        const movies = await fetchMoviesByGenre(genre);
        newMoviesByGenre.set(genre, movies);
      }

      setMoviesByGenre(newMoviesByGenre);
    };

    loadMovies();
  }, []);

  return (
    <div className="app">
      <Row
        title="액션"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        addRating={addRating}
      />
      <Row
        title="코미디"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        addRating={addRating}
      />
      <Row
        title="공포"
        id="HM"
        fetchUrl={requests.fetchHorrorMovies}
        addRating={addRating}
      />
      <Row
        title="로맨스/멜로"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
        addRating={addRating}
      />
      <Row
        title="어드벤쳐"
        id="AD"
        fetchUrl={requests.fetchAdventureMovies}
        addRating={addRating}
      />
      <Row
        title="애니메이션"
        id="AN"
        fetchUrl={requests.fetchAnimationMovies}
        addRating={addRating}
      />
      <Row
        title="어린이"
        id="CH"
        fetchUrl={requests.fetchChildrenMovies}
        addRating={addRating}
      />
      <Row
        title="판타지"
        id="FT"
        fetchUrl={requests.fetchFantasyMovies}
        addRating={addRating}
      />
      <Row
        title="범죄"
        id="CR"
        fetchUrl={requests.fetchCrimeMovies}
        addRating={addRating}
      />
      <Row
        title="스릴러"
        id="TH"
        fetchUrl={requests.fetchThrillerMovies}
        addRating={addRating}
      />
      <Row
        title="드라마"
        id="DR"
        fetchUrl={requests.fetchDramaMovies}
        addRating={addRating}
      />
      <Row
        title="전쟁"
        id="WR"
        fetchUrl={requests.fetchWarMovies}
        addRating={addRating}
      />
      <Row
        title="미스터리"
        id="MS"
        fetchUrl={requests.fetchMysteryMovies}
        addRating={addRating}
      />
      <Row
        title="SF"
        id="SF"
        fetchUrl={requests.fetchSciFiMovies}
        addRating={addRating}
      />
      <Row
        title="IMAX"
        id="IM"
        fetchUrl={requests.fetchIMAXMovies}
        addRating={addRating}
      />
      <Row
        title="누아르"
        id="NR"
        fetchUrl={requests.fetchFilmNoirMovies}
        addRating={addRating}
      />
      <Row
        title="뮤지컬"
        id="MU"
        fetchUrl={requests.fetchMusicalMovies}
        addRating={addRating}
      />
      <Row
        title="서부"
        id="WE"
        fetchUrl={requests.fetchWesternMovies}
        addRating={addRating}
      />
    </div>
  );
};

export default Page2;