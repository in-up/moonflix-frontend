import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../apis/auth";
import Head from "next/head";
import Header from "../layout/Header";
import styled from "styled-components";
import { slateDarkA } from "@radix-ui/colors";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

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

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  font-family: "Pretendard", Pretendard;
  color: white;
  background-color: ${(props) =>
    props.active ? slateDarkA.slateA6 : slateDarkA.slateA4};
  border-radius: 10px;
  width: 8rem;
  padding: 0.75rem;
  margin: 0.25rem;
  border: 0px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${slateDarkA.slateA6};
  }
`;

const StyledContainer = styled.div`
  border-radius: 36px;
  display: flex;
  flex-direction: row;
  width: 60vw;
  max-width: 700px;
  margin: 5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90vw;
    margin: 1rem;
  }
`;

const ProfileImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: 3rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  background-image: url("/profile.png");
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.08);
  }
  @media screen and (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const pageTitle = "영화달 MOONFLIX - 프로필";
  const [currentPage, setCurrentPage] = useState("Tab1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const user = await isAuthenticated();
      if (!user) {
        alert("로그인이 필요합니다.");
        router.push("/sign");
      } else {
        setLoading(false);
      }
    };
    checkAndRedirect();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Main>
        <StyledContainer>
          <TabContainer>
            <TabButton
              active={currentPage === "Tab1"}
              onClick={() => setCurrentPage("Tab1")}
            >
              프로필
            </TabButton>
            <TabButton
              active={currentPage === "Tab2"}
              onClick={() => setCurrentPage("Tab2")}
            >
              설정
            </TabButton>
          </TabContainer>
          {currentPage === "Tab1" && <Tab1 />}
          {currentPage === "Tab2" && <Tab2 />}
        </StyledContainer>
      </Main>
    </>
  );
};

export default ProfilePage;
