// SearchPage 컴포넌트

import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "../layout/Header";
import GenreResult from "./GenreResult";
import { useRouter } from "next/router";

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 10rem;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  @media (max-width: 768px) {
    top: 5rem;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60vw;
  margin: 1rem 20vw;
  @media (max-width: 768px) {
    margin: 1rem;
    max-width: 90vw;
  }
`;

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { genre } = router.query;
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentGenre, setCurrentGenre] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (genre) {
      if (typeof genre === "string") {
        setCurrentGenre(genre);
      } else if (Array.isArray(genre) && genre.length > 0) {
        setCurrentGenre(genre[0]);
      }
    }
  }, [genre]);

  return (
    <>
      <Head>
        <title>영화달 MOONFLIX - 검색</title>
      </Head>
      <Header />
      <Main>
        <ResultContainer>
          {/* 선택된 장르와 페이지에 따라 GenreResult 컴포넌트 로딩 */}
          {currentGenre && (
            <GenreResult genre={currentGenre} year={null} sorting={false} />
          )}
        </ResultContainer>
      </Main>
    </>
  );
};

export default SearchPage;
