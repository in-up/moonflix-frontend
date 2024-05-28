import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { slateDarkA, orange } from "@radix-ui/colors";
import supabase from "../../apis/supabaseClient";
import { getUserId } from "@/apis/auth";

const Main = styled.main`
  position: relative;
  width: 100%;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  display: flex;
  justify-content: center;
  color: white;
`;

const StyledContainer = styled.div`
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 90vw;
    margin: 1rem;
  }
`;

const Button = styled.button`
  font-family: "Pretendard", Pretendard;
  background-color: ${orange.orange9};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1rem;
`;

const Tab2 = () => {
  const router = useRouter();

  const deleteAccount = async () => {
    const userId = getUserId();

    if (!userId) {
      alert("사용자 ID를 가져오는 데 실패했습니다.");
      return;
    }

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      alert("계정 삭제 중 오류가 발생했습니다.");
      console.error(error);
    } else {
      alert("계정이 성공적으로 삭제되었습니다.");
      router.push("/"); // 계정 삭제 후 메인 페이지로 이동
    }
  };

  return (
    <>
      <Main>
        <StyledContainer>
          <Button onClick={deleteAccount}>계정 삭제</Button>
        </StyledContainer>
      </Main>
    </>
  );
};

export default Tab2;
