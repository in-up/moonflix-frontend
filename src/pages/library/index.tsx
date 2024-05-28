import React, { useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";

const Main = styled.main`
  color: white;
  padding-top: 3rem;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const StyledContainer = styled.div`
  margin: 3rem;
`;

const LibraryPage = () => {
  const [currentPage, setCurrentPage] = useState("tab3");

  return (
    <Main>
      <Header />
      <StyledContainer>
        <h1>내 보관함</h1>
        <p>예정</p>
      </StyledContainer>
    </Main>
  );
};

export default LibraryPage;
