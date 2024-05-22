// pages/search/index.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../layout/Header';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  outline: none;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
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

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState('tab1');
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Head>
        <title>영화달 MOONFLIX - 검색</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="제목, 태그, 시리즈 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>
            <i className="ri-search-line"></i>
          </SearchButton>
        </SearchContainer>
      </Main>
    </>
  );
};

export default SearchPage;
