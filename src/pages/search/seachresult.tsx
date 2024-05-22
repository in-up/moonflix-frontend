import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RowInfo from '../layout/RowInfo'; // Corrected import path

interface searchProp {
  word: string;
}

interface Movie {
  tmdbId: number;
  title: string;
  poster_path: string;
  rating_avg: number;
  rating_count: number;
}

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.5rem;
  color: #666;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center items horizontally
  justify-content: center; // Center items vertically
  width: 100%;
  padding: 2rem;
`;

const SearchResult: React.FC<searchProp> = ({ word }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/search/?query=${word}`);
        const data = await res.json();
        setMovies(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [word]);

  console.log(movies);

  return (
    <Container>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <RowInfo
            key={movie.tmdbId}
            id={movie.tmdbId}
            title={movie.title}
            poster_path={movie.poster_path}
            rating={movie.rating_avg}
            rating_count={movie.rating_count}
          />
        ))
      ) : (
        <NoResults>결과가 존재하지 않습니다</NoResults>
      )}
    </Container>
  );
};

export default SearchResult;
