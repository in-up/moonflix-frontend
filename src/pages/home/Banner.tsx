import React, { useEffect, useState } from "react";
import requests from "../../apis/requests";
import styled from "styled-components";
import { slate, slateA, slateDark, slateDarkA } from "@radix-ui/colors";
import { useRouter } from "next/router";
import Rating from "../layout/Rating";
import { formatTitle } from "../../apis/formatTitle";

interface Movie {
  movieId: number;
  tmdbId: number;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string;
  overview?: string;
  genres?: string;
  rating_avg: number;
}

const BannerWrapper = styled.header<{ imageUrl: string }>`
  color: white;
  object-fit: contain;
  height: 36rem;
  background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.9)
    ),
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.1)
    ),
    url(${(props) => props.imageUrl}) center/cover no-repeat;
`;

const BannerContents = styled.div`
  margin-left: 10rem;
  padding-top: 12rem;
  height: 24rem;
  @media (max-width: 768px) {
    margin-left: 2rem;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const BannerTag = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const GenreBox = styled.div`
  background-color: ${slateDark.slate12};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  color: #171a27;
  font-weight: 600;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin: 0 0.3rem;
  white-space: nowrap;
`;

const BannerDescription = styled.p`
  width: 80%;
  line-height: 1.3;
  font-weight: 500;
  font-size: 1rem;
  max-width: 1000px;
  height: 60px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    max-width: 80vw;
    width: auto;
  }
`;

const BannerButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.2);
  background-color: ${slate.slate1};
  color: black;
  transition: transform 0.3s ease;
  i {
    padding: 0rem 0.5rem;
    transition: transform 0.3s ease;
    transform: translateX(-3px);
  }

  &:hover {
    transform: scale(1.08);

    i {
      transform: translateX(3px);
    }
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const BannerInfo = styled.div`
  display: flex;
  justify-content: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  .divider {
    margin: 0 0.75rem 0 0;
    height: 2.3rem;
    width: 0.07rem;
    background-color: ${slateDarkA.slateA10};
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

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie>({
    movieId: 0,
    tmdbId: 0,
    title: "",
    name: "",
    original_name: "",
    poster_path: "",
    overview: "",
    genres: "",
    rating_avg: 5,
  });
  const router = useRouter();

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api${requests.fetchTopMovies}`);
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.result.length);
      setMovie(data.result[randomIndex]);
    }

    fetchData();
  }, []);

  const formattedTitle = movie.title ? formatTitle(movie.title) : "";

  const handleClick = (movieId: number) => {
    router.push("/movie/" + movieId);
  };

  return (
    <BannerWrapper
      imageUrl={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
    >
      <BannerContents>
        <BannerTitle>
          {formattedTitle || movie?.name || movie?.original_name}
        </BannerTitle>
        <BannerDescription>
          {truncate(movie?.overview || "", 150)}
        </BannerDescription>
        <BannerButton onClick={() => handleClick(movie.tmdbId)}>
          <i className="ri-arrow-right-line"></i>
          &nbsp;자세히 보기
        </BannerButton>
        <BannerInfo>
          <BannerRating>
            <Rating rating={movie.rating_avg * 2} size={45} />
            <p>{Math.round(movie.rating_avg * 20)}%</p>
          </BannerRating>
          <div className="divider"></div>
          <BannerTag>
            {movie?.genres?.split("|").map((genre, index) => (
              <GenreBox key={index}># {genre}</GenreBox>
            ))}
          </BannerTag>
        </BannerInfo>
      </BannerContents>
    </BannerWrapper>
  );
};

export default Banner;
