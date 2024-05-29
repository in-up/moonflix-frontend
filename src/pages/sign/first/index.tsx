import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/pages/layout/Header";
import { slateDarkA } from "@radix-ui/colors";
import TextArea from "@/pages/layout/TextArea";
import supabase from "../../../apis/supabaseClient";
import { getUserId } from "../../../apis/auth";
import { slate, orange } from "@radix-ui/colors";

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
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  max-width: 700px;
  margin: 5rem;
  @media (max-width: 768px) {
    width: 90vw;
    margin: 1rem;
  }
`;

const Button = styled.button`
  margin: 2rem 1rem;
  padding: 0.75rem 1rem;
  background-color: ${slate.slate1};
  color: ${slate.slate12};
  border: none;
  border-radius: 13px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const First = () => {
  const pageTitle = "영화달 MOONFLIX - 로그인";
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [currentPage, setCurrentPage] = useState("SignIn"); // 초기값을 SignIn으로 설정합니다.

  const handleSignUpClick = () => {
    if (currentPage === "SignIn") {
      setCurrentPage("SignUp");
    } else {
      setCurrentPage("SignIn");
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSaveNickname = async () => {
    const userId = getUserId();

    const { data, error } = await supabase
      .from("userdata")
      .insert({ user_id: userId, user_name: nickname });

    if (error) {
      console.error("Error updating nickname:", error);
    } else {
      console.log("Nickname updated successfully:", data);
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Main>
        <StyledContainer>
          <h2>반가워요! 닉네임을 설정해주세요.</h2>
          <div>
            <TextArea
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <Button onClick={handleSaveNickname}>닉네임 저장</Button>
        </StyledContainer>
      </Main>
    </>
  );
};

export default First;
