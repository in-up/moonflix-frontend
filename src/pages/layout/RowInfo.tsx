import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Poster from './Poster'; // Corrected import path
import { useRouter } from 'next/router';
import requests from '../../apis/tmdb_requests';
import Rating from './Rating';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
  rating_count: number; // Added rating_count property
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  max-width: 600px; // This line ensures the max width
  cursor: pointer; // Added cursor pointer to indicate clickable area

  &:hover {
    background-color: #f9f9f9; // Optional: change background color on hover
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #333;
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: #888;
  margin-top: 0.5rem;
`;

const RatingCount = styled.span`
  font-size: 1rem;
  color: #888;
  margin-top: 0.5rem;
`;

const TmdbInfo = styled.div`
  display: flex;
`;

const RoundImg = styled.div`
  margin-right: 1rem;
  margin-top: 0.5rem;
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
        // Assuming rating is available directly in the data
        setRating(data.vote_average); // Replace 'rating' with the correct key in the response
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);


  // Round rating to one decimal place
  const roundedRating = rating % 1 === 0 ? rating.toFixed(1) : Math.round(rating * 10) / 10;
  const tmdbRoundedRating = Math.round(tmdb_rating * 100 / 10);

  const handleClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Poster
        id={id}
        path={`${base_url}${poster_path}`}
        alt={title}
        width={100}
        height={150}
        isNoUse={true} // 추가된 prop
      />
      <Info>
        <Title>{title}</Title>
        <TmdbInfo>       
          <RoundImg>
          <Rating 
          rating={tmdb_rating}
          size={35}
        />
          </RoundImg>
          <RatingText><br/>{tmdbRoundedRating}%</RatingText> 
        </TmdbInfo>
        <RatingText>TMDB 평점 </RatingText>
        <RatingCount>영화달 평가수: {rating_count}</RatingCount>
        <RatingText>영화달 평점: {roundedRating} / 5.0</RatingText>   
        
      </Info>
    </Container>
  );
};

export default RowInfo;
