import React, { useState } from "react";
import Head from 'next/head';
import styled from "styled-components";
import Header from "../layout/Header";
import Page1 from "./tab1/Page1";
import Page2 from "./tab2/Page2";
import Page3 from "./tab3/Page3";
import Footer from "../layout/Footer"

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  margin-top: 6rem;
`;

const App: React.FC = () => {
  const pageTitle = '영화달 MOONFLIX - 홈';
  const [currentPage, setCurrentPage] = useState("tab1");

  const renderPage = () => {
    switch (currentPage) {
      case "tab1":
        return <Page1 />;
      case "tab2":
        return <Page2 />;
      case "tab3":
        return <Page3 />;
      default:
        return <Page1 />;
    }
  };

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      
      {renderPage()}
      <Footer/>
    </Main>
  );
};

export default App;
