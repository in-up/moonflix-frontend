import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "../layout/List"; // Corrected import path

interface SearchProp {
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
  margin: 1rem;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 1rem;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchResult: React.FC<SearchProp> = ({ word }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  useEffect(() => {
    // Reset to page 1 when `word` changes
    setCurrentPage(1);
  }, [word]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <Container>
      {movies.length > 0 ? (
        <>
          <NoResults>{movies.length}개의 영화를 찾았어요.</NoResults>
          {currentMovies.map((movie) => (
            <List
              key={movie.tmdbId}
              id={movie.tmdbId}
              title={movie.title}
              poster_path={movie.poster_path}
              rating={movie.rating_avg}
              rating_count={movie.rating_count}
            />
          ))}
          <PaginationControls>
            <PaginationButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              이전
            </PaginationButton>
            <PaginationButton
              onClick={handleNextPage}
              disabled={endIndex >= movies.length}
            >
              다음
            </PaginationButton>
          </PaginationControls>
        </>
      ) : (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </Container>
  );
};

export default SearchResult;
