import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from "styled-components";
import Header from "../layout/Header";
import SearchResult from "./SearchResult"; // Corrected import path

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

const SearchContainer = styled.div`
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
    max-width: 90vw;
  }
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

const SearchResultPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchValue, setSearchValue] = useState<string>("");
  const [submittedSearchValue, setSubmittedSearchValue] = useState<string>("");

  useEffect(() => {
    if (typeof query === "string") {
      setSearchValue(query);
      setSubmittedSearchValue(query);
    } else if (Array.isArray(query) && query.length > 0) {
      setSearchValue(query[0]);
      setSubmittedSearchValue(query[0]);
    }
  }, [query]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
      setSubmittedSearchValue(searchValue);
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
        <title>영화달 MOONFLIX - 검색 결과</title>
      </Head>
      <Header/>
      <Main>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="제목, 태그, 시리즈 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress} // Added onKeyPress event
          />
          <SearchButton onClick={handleSearch}>
            <i className="ri-search-line"></i>
          </SearchButton>
        </SearchContainer>
        <ResultContainer>
          {submittedSearchValue && <SearchResult word={submittedSearchValue} />}
        </ResultContainer>
      </Main>
    </>
  );
};

export default SearchResultPage;
