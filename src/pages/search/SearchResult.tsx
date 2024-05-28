import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import List from '../layout/List'; // Corrected import path

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
  font-size: 1.25rem;
  color: white;
  margin: 1rem ;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center items horizontally
  justify-content: center; // Center items vertically
  width: 100%;
  margin: 0 1rem;
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

  return (
    <Container>
      {movies.length > 0 ? <NoResults>{movies.length}개의 영화를 찾았어요.</NoResults> : <NoResults/>}
      {movies.length > 0 ? (
        movies.map((movie) => (
          <List
            key={movie.tmdbId}
            id={movie.tmdbId}
            title={movie.title}
            poster_path={movie.poster_path}
            rating={movie.rating_avg}
            rating_count={movie.rating_count}
          />
        ))
      ) : (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </Container>
  );
};

export default SearchResult;
