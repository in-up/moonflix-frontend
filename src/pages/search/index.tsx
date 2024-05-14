import React, { useState } from "react";
import Head from 'next/head';
import styled from "styled-components";
import Header from "../layout/Header";

const Main = styled.main`
  position: relative;
  display: flex;
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

const Search: React.FC = () => {
  const pageTitle = '영화달 MOONFLIX - 홈';
  const [currentPage, setCurrentPage] = useState("tab1");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Handle search logic
    console.log("Search value:", searchValue);
  };

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage}/>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="제목, 태그, 시리즈 검색 (예정)"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
          <i className="ri-search-line"></i>
        </SearchButton>
      </SearchContainer>
    </Main>
  );
};

export default Search;
