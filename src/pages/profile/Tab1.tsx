import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import * as UserInfo from "../../apis/userinfo";
import { getUserName } from "@/apis/auth";
import { slateDarkA } from "@radix-ui/colors";

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
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 90vw;
    margin: 1rem;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileDetails = styled.div`
  text-align: left;
  margin: 2rem;
`;

const NameTitle = styled.h1`
  font-size: 2rem;
  color: white;
`;

const TinyText = styled.p`
  margin-top: 0;
`;

const ProfileImageContainer = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 100px;
  background-image: url("/profile.png");
  background-size: cover;
  @media screen and (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const Tab1 = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (typeof window !== "undefined") {
        try {
          const tempName = await getUserName();
          const tempStatus = await UserInfo.getStatus();
          setName(tempName);
          setStatus(tempStatus);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Main>
        <StyledContainer>
          <ProfileInfo>
            <ProfileImageContainer />
            <ProfileDetails>
              <NameTitle>{name}</NameTitle>
              <TinyText>{status}</TinyText>
            </ProfileDetails>
          </ProfileInfo>
        </StyledContainer>
      </Main>
    </>
  );
};

export default Tab1;
