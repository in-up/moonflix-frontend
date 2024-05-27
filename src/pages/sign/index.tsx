import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../layout/Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp"; // SignUp 컴포넌트를 불러옵니다.
import { slateDarkA } from "@radix-ui/colors";

const Main = styled.main`
  position: relative;
  width: 100%;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  color: white;
`;

const StyledContainer = styled.div`
  background-color: ${slateDarkA.slateA5};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 700px;
  margin: 5rem;
  @media (max-width: 768px) {
    width: 90vw;
    margin: 1rem;
  }
`;

const TitleText = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin: 2rem;
  padding-top: 2rem;

  i {
    font-weight: 300;
    margin-right: 0.75rem;
  }
`;

const DetailText = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  margin: 1.5rem;

  div {
    margin: 0.75rem;
    transition: opacity 0.2s ease;
    &:hover {
      cursor: pointer;
      opacity: calc(0.8);
    }
  }
`;

const Sign = () => {
  const pageTitle = "영화달 MOONFLIX - 로그인";
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState("SignIn"); // 초기값을 SignIn으로 설정합니다.

  const handleSignUpClick = () => {
    if (currentPage === "SignIn") {
      setCurrentPage("SignUp");
    } else {
      setCurrentPage("SignIn");
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Main>
        {currentPage === "SignIn" ? (
          <StyledContainer>
            <TitleText>
              <i className="ri-login-box-line"></i>로그인
            </TitleText>
            <SignIn />
            <DetailText>
              <div onClick={handleSignUpClick}>
                아직 계정이 없으신가요? 회원가입
              </div>
              <div>비밀번호를 잊어버렸어요.</div>
            </DetailText>
          </StyledContainer>
        ) : (
          <StyledContainer>
            <TitleText>
              <i className="ri-sparkling-line"></i>회원가입
            </TitleText>
            <SignUp />
            <DetailText>
              <div onClick={handleSignUpClick}>이미 계정을 가지고 있어요.</div>
              <div>비밀번호를 잊어버렸어요.</div>
            </DetailText>
          </StyledContainer>
        )}
      </Main>
    </>
  );
};

export default Sign;
