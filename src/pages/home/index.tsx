import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "../layout/Header";
import Page1 from "./Page1";
import Footer from "../layout/Footer";

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const App: React.FC = () => {
  const pageTitle = "영화달 MOONFLIX - 홈";
  const [currentPage, setCurrentPage] = useState("tab1");

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Page1 />
      <Footer />
    </Main>
  );
};

export default App;
