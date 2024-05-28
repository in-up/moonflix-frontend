import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../layout/Header';
import GenreResult from './GenreResult'; // GenreResult 컴포넌트 import

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 6rem;
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  /* background-color: rgba(255, 255, 255, 0.25); */
  border-radius: 16px;
  padding: 8px 16px;
  height: auto;
  width: 80%;
  max-width: 60vw;
  margin: 1rem 20vw;
  margin-top: 0;
  @media (max-width: 768px) {
    margin: 1rem;
    max-width: 100vw;
  }
`;

const YearContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  /* background-color: rgba(255, 255, 255, 0.25); */
  border-radius: 16px;
  padding: 8px 16px;
  height: auto;
  width: 45%;
  max-width: 60vw;
  margin: 1rem 20vw;
  @media (max-width: 768px) {
    margin: 1rem;
    max-width: 100vw;
  }
`;

const Button = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
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
  const [currentGenre, setCurrentGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [key, setKey] = useState(0); // key state for re-rendering

  // 장르 버튼 클릭 시 해당 장르 설정 및 연도 초기화
  const handleGenreButtonClick = (genre: string) => {
    setCurrentGenre(genre);
    setSelectedYear(null);
    setKey(prevKey => prevKey + 1); // update key to re-render
  };

  // 연도 버튼 클릭 시 해당 연도 설정
  const handleYearButtonClick = (year: number) => {
    setSelectedYear(year);
    setKey(prevKey => prevKey + 1); // update key to re-render
  };

  return (
    <>
      <Head>
        <title>영화달 MOONFLIX - 검색</title>
      </Head>
      <Header />
      <Main>
        <ResultContainer>
          {/* 장르별 버튼 영역 */}
          <GenreContainer>
            <Button onClick={() => handleGenreButtonClick('Action')}>액션</Button>
            <Button onClick={() => handleGenreButtonClick('Comedy')}>코미디</Button>
            <Button onClick={() => handleGenreButtonClick('Horror')}>공포</Button>
            <Button onClick={() => handleGenreButtonClick('Romance')}>로맨스/멜로</Button>
            <Button onClick={() => handleGenreButtonClick('Adventure')}>어드벤쳐</Button>
            <Button onClick={() => handleGenreButtonClick('Animation')}>애니메이션</Button>
            <Button onClick={() => handleGenreButtonClick('Children')}>어린이</Button>
            <Button onClick={() => handleGenreButtonClick('Fantasy')}>판타지</Button>
            <Button onClick={() => handleGenreButtonClick('Crime')}>범죄</Button>
            <Button onClick={() => handleGenreButtonClick('Thriller')}>스릴러</Button>
            <Button onClick={() => handleGenreButtonClick('Drama')}>드라마</Button>
            <Button onClick={() => handleGenreButtonClick('War')}>전쟁</Button>
            <Button onClick={() => handleGenreButtonClick('Mystery')}>미스터리</Button>
            <Button onClick={() => handleGenreButtonClick('Scifi')}>SF</Button>
            <Button onClick={() => handleGenreButtonClick('Imax')}>IMAX</Button>
            <Button onClick={() => handleGenreButtonClick('FilmNoir')}>누아르</Button>
            <Button onClick={() => handleGenreButtonClick('Musical')}>뮤지컬</Button>
            <Button onClick={() => handleGenreButtonClick('Western')}>서부</Button>
            {/* 다른 장르 버튼들 추가 */}
          </GenreContainer>

          {/* 연도별 버튼 영역 - 장르가 선택된 경우에만 표시 */}
          {currentGenre && (
            <YearContainer>
              <Button onClick={() => handleYearButtonClick(2018)}>2018</Button>
              <Button onClick={() => handleYearButtonClick(2017)}>2017</Button>
              <Button onClick={() => handleYearButtonClick(2016)}>2016</Button>
              <Button onClick={() => handleYearButtonClick(2015)}>2015</Button>
              <Button onClick={() => handleYearButtonClick(2014)}>2014</Button>
              <Button onClick={() => handleYearButtonClick(2013)}>2013</Button>
              <Button onClick={() => handleYearButtonClick(2012)}>2012</Button>
              <Button onClick={() => handleYearButtonClick(2011)}>2011</Button>
              <Button onClick={() => handleYearButtonClick(2010)}>2010</Button>
              <Button onClick={() => handleYearButtonClick(2009)}>2009</Button>
              <Button onClick={() => handleYearButtonClick(2008)}>2008</Button>
              <Button onClick={() => handleYearButtonClick(2007)}>2007</Button>
              {/* 다른 연도 버튼들 추가 */}
            </YearContainer>
          )}

          {/* 선택된 장르와 연도에 따라 GenreResult 컴포넌트 로딩 */}
          {currentGenre && <GenreResult key={key} genre={currentGenre} year={selectedYear} sorting={false} />}
        </ResultContainer>
      </Main>
    </>
  );
};

export default SearchPage;
