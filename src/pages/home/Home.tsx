import React, { useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Page1 from "./Tab1/Page1";
import Page2 from "./Tab2/Page2";
import Page3 from "./Tab3/Page3";

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
`;

const App: React.FC = () => {
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
      <Header setCurrentPage={setCurrentPage} />
      {/* 선택된 페이지 렌더링 */}
      {renderPage()}
    </Main>
  );
};

export default App;
