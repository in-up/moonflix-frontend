import React from "react";
import styled from "styled-components";

// 스타일링
const Container = styled.div`
  color: white;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>내 보관함</h1>
      <p>예정</p>
    </Container>
  );
};

export default HomePage;
