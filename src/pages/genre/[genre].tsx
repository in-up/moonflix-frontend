import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../layout/Header';
import GenreResult from './GenreResult'; // GenreResult 컴포넌트 import
import { useRouter } from 'next/router';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 10rem;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  @media (max-width: 768px) {
    top: 5rem;
  }
`;

const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 8px 16px;
  height: 2.5rem;
  max-width: 60vw;
  margin: 1rem 20vw;
  @media (max-width: 768px) {
    margin: 1rem;
    max-width: 100vw;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
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
    const [searchValue, setSearchValue] = useState<string>('');
    const [currentGenre, setCurrentGenre] = useState<string | string[] | undefined>(genre);

    return (
        <>
            <Head>
                <title>영화달 MOONFLIX - 검색</title>
            </Head>
            <Header />
            <Main>
                <ResultContainer>
                    {/* 선택된 장르와 페이지에 따라 GenreResult 컴포넌트 로딩 */}
                    {currentGenre && <GenreResult word={currentGenre} />}
                </ResultContainer>
            </Main>
        </>
    );
};

export default SearchPage;
