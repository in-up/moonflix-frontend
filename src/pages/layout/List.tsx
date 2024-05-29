import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Poster from "./PosterItem"; // Corrected import path
import { useRouter } from "next/router";
import requests from "../../apis/tmdbRequests";
import Rating from "./Rating";
import { slate, slateDarkA } from "@radix-ui/colors";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
  rating_count: number;
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${slateDarkA.slateA5};
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color, border-color 0.3s ease;
  border: 3px solid #ffffff00;

  &:hover {
    background-color: ${slateDarkA.slateA6};
    border-color: #fff;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30vw;
`;

const OverviewText = styled.div`
  font-size: 1rem;
  font-weight: 300;
  max-width: 30vw;
  color: ${slate.slate7};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingText = styled.span`
  font-size: 1rem;
  font-weight: 300;
  color: ${slate.slate7};
`;

const TmdbInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const RoundImg = styled.div`
  margin-right: 1rem;
`;

const PosterWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  height: 150px;
  @media (max-width: 768px) {
    max-width: 40vw;
  }
`;

const List: React.FC<Movie> = ({
  id,
  title,
  poster_path,
  rating,
  rating_count,
}) => {
  const router = useRouter();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [tmdb_rating, setRating] = useState<number>(-1);
  const [movieOverview, setMovieOverview] = useState<string>("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `${requests.fetchMovie}${id}?api_key=${requests.tmdbAPI}`
        );
        const data = await response.json();
        setRating(data.vote_average);
        setMovieOverview(data.overview);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  const roundedRating =
    rating % 1 === 0 ? rating.toFixed(1) : Math.round(rating * 10) / 10;
  const tmdbRoundedRating = Math.round((tmdb_rating * 100) / 10);

  const handleClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <PosterWrapper>
        <Poster
          id={id}
          path={`${base_url}${poster_path}`}
          alt={title}
          width={200}
          height={150}
          hovering={false}
        />
      </PosterWrapper>
      <Info>
        <Title>{title}</Title>
        <OverviewText>{movieOverview}</OverviewText>
        <TmdbInfo>
          <RoundImg>
            <Rating rating={tmdb_rating} size={45} />
          </RoundImg>
          <RatingText>
            {tmdbRoundedRating}% ({rating_count})
          </RatingText>
        </TmdbInfo>
      </Info>
    </Container>
  );
};

export default List;
