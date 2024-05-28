import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "../layout/List"; // Corrected import path

interface SearchProp {
  genre: string;
  year: number | null;
  sorting: boolean;
}

interface Movie {
  tmdbId: number;
  title: string;
  poster_path: string;
  rating_avg: number;
  rating_count: number;
}

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

const Results = styled.div`
  text-align: center;
  font-size: 2.25rem;
  color: white;
  margin: 1rem;
  font-weight: 600;
`;

const GenreResult: React.FC<SearchProp> = ({ genre, year, sorting }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const baseUrl = "/api/filter_movies/";

  useEffect(() => {
    async function fetchData() {
      try {
        const yearParam = year ? `&year=${year}` : "";
        const sortParam = sorting
          ? "&sort_by_year=true"
          : "&sort_by_year=false";
        const res = await fetch(
          `${baseUrl}?genre=${genre}${yearParam}${sortParam}`
        );
        const data = await res.json();
        setMovies(data.result);
        setCurrentPage(1); // 페이지를 초기화
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [genre, year, sorting]);

  useEffect(() => {
    // Reset to page 1 when `genre` changes
    setCurrentPage(1);
  }, [genre]);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  let pageNumbersToShow: number[] = [];

  if (totalPages <= 5) {
    pageNumbersToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    pageNumbersToShow = [1, 2, 3, 4, 5];
  } else if (currentPage >= totalPages - 2) {
    pageNumbersToShow = [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pageNumbersToShow = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }

  return (
    <Container>
      <Results>{genre}</Results>
      {movies.length > 0 && (
        <>
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
            {pageNumbersToShow.map((pageNumber) => (
              <PaginationButton
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationButton>
            ))}
            <PaginationButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              다음
            </PaginationButton>
          </PaginationControls>
        </>
      )}
    </Container>
  );
};

export default GenreResult;
