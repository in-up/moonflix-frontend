import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Poster from './Poster'; // Corrected import path
import { useRouter } from 'next/router';
import requests from '../../apis/tmdb_requests';
import Rating from './Rating';
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
  font-size: 1.2rem;
  margin: 0;
  color: white;
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: ${slate.slate3};
  margin-top: 0.5rem;
`;

const RatingCount = styled.span`
  font-size: 1rem;
  color: ${slate.slate3};
  margin-top: 0.5rem;
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
  border-radius: 12px; /* 원하는 모서리 둥글기 */
  width: 200px; /* Poster 컴포넌트의 width와 일치시켜야 함 */
  height: 150px; /* Poster 컴포넌트의 height와 일치시켜야 함 */
`;

const RowInfo: React.FC<Movie> = ({ id, title, poster_path, rating, rating_count }) => {
  const router = useRouter();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [tmdb_rating, setRating] = useState<number>(-1);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`${requests.fetchMovie}${id}?api_key=${requests.tmdbAPI}`);
        const data = await response.json();
        setRating(data.vote_average); // Replace 'rating' with the correct key in the response
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  const roundedRating = rating % 1 === 0 ? rating.toFixed(1) : Math.round(rating * 10) / 10;
  const tmdbRoundedRating = Math.round(tmdb_rating * 100 / 10);

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
          isNoUse={true}
        />
      </PosterWrapper>
      <Info>
        <Title>{title}</Title>
        <TmdbInfo>
          <RoundImg>
            <Rating rating={tmdb_rating} size={45} />
          </RoundImg>
          <RatingText><br/>{tmdbRoundedRating}% ({rating_count})</RatingText>
        </TmdbInfo>
      </Info>
    </Container>
  );
};

export default RowInfo;
