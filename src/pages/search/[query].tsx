import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from "styled-components";
import Header from "../layout/Header";
import SearchResult from "./seachresult"; // Corrected import path

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-position: center;
  margin-top: 5rem;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px; // This line ensures the max width
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
  max-width: 600px; // This line ensures the max width
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    if (searchValue) {
      router.push(`/search/${encodeURIComponent(searchValue)}`);
      setSubmittedSearchValue(searchValue);
    }
  };

  return (
    <>
      <Head>
        <title>영화달 MOONFLIX - 검색 결과</title>
      </Head>
      <Header setCurrentPage={() => {}} /> {/* Replace with the actual implementation */}
      <Main>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="제목, 태그, 시리즈 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
