// pages/movie/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../apis/tmdbRequests";
import Head from "next/head";
import styled from "styled-components";
import Header from "../layout/Header";
import Backdrop from "./Backdrop";
import Credits from "./Credits";
import Rating from "../layout/Rating";
import Comment from "./Comment";
import { slateDark } from "@radix-ui/colors";
import Footer from "../layout/Footer";
import Itembase from "./Itembase";

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
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
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
  margin: 2rem;
  display: flex;
`;

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

const BannerRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const BoxText = styled.div`
  margin: 1rem;
`;

const RatingWord = styled.div`
  margin-right: 0.7rem;
`;

const Movie: React.FC = () => {
  const pageTitle = "영화달 MOONFLIX - 영화정보";
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  const apikey = process.env.TMDB_API_KEY;

  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const tmdbId = typeof id === "string" ? parseInt(id, 10) : -1;
  const [personalizeUrl, setPersonalizeUrl] = useState<string>(
    "/item-based/" + id
  );

  useEffect(() => {
    const fetchMovieAndComments = async () => {
      try {
        const movieResponse = await axios.get(
          `${requests.fetchMovie}${id}?api_key=${apikey}&language=ko-KR`
        );
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
        console.error("Failed to fetch movie:", error);
      }
    };

    if (id) {
      fetchMovieAndComments();
    }
  }, [id, apikey]);

  const addRating = (rating: number) => {
    const url = `/item-based/${id}`;
    setPersonalizeUrl(url);
  };

  console.log(movie);
  if (!movie) {
    return <p>Loading...</p>;
  }
  console.log(personalizeUrl + id);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Main>
        <StyledContainer>
          <Backdrop
            path={movie.backdrop_path}
            title={movie.title}
            year={movie.year}
          />
          <div>
            <MovieInfo>
              <BannerRating>
                <Rating rating={movie.vote_average} size={45} />
                <p>{Math.round(movie.vote_average * 10)}%</p>
              </BannerRating>
            </MovieInfo>
            {/* <MovieInfo>
              <Box>
                <BoxText>테스트</BoxText>
              </Box>
            </MovieInfo> */}
            <Overview>{movie.overview}</Overview>
            <Credits tmdbId={tmdbId} />
            <Itembase
              title="비슷한 작품"
              id="about"
              fetchUrl={personalizeUrl}
              addRating={addRating}
            />
            {id && <Comment id={id as string} />}
          </div>
          <Footer />
        </StyledContainer>
      </Main>
    </>
  );
};

export default Movie;
