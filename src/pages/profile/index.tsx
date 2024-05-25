import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../apis/auth';
import Head from 'next/head';
import Header from '../layout/Header';
import styled from 'styled-components';
import * as UserInfo from '../../apis/userinfo';

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  margin-top: 6rem;
  color: white;
  display: flex;
  justify-content: center;
`;

// 중앙 & 메인
const StyledContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 5%;
  border-radius: 5%;
  background-color: rgb(44, 55, 66, 40%);
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 0;
  }
`;

const ProfileImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: 3rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  background-image: url('/profile.png');
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

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProfileDetails = styled.div`
  text-align: left;
  width: 70%;
`;

const NameTitle = styled.h1`
  font-size: 3.75rem;
  color: white;
  margin: 0;
  margin-left: 0.5rem;
`;
const SmallTitle = styled.h2`
  font-size: 2.25rem;
  color: white;
  margin: 0;
  margin-left: 3rem;
`;

const TinyText = styled.p`
  margin-top: 0;
  margin-left: 0.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
`;
const BDivider = styled.div`
  width: 100%;
  height: 3px;
  background-color: #ccc;
  margin: 1rem 0;
`;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const pageTitle = '영화달 MOONFLIX - 영화정보';
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  const [name, setName] = useState<string | null>('');
  const [status, setStatus] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const user = await isAuthenticated();
      if (!user) {
        alert('로그인이 필요합니다.');
        router.push('/');
      } else {
        setLoading(false);
      }
    };
    checkAndRedirect();
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tempName = UserInfo.getUserName();
      const tempStatus = UserInfo.getStatus();
      setName(tempName);
      setStatus(tempStatus);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header setCurrentPage={setCurrentPage} />
      <Main>
        <StyledContainer>
          <ProfileInfo>
            <ProfileImageContainer />
            <ProfileDetails>
              <NameTitle>{name}</NameTitle>
              <Divider />
              <TinyText>{status}</TinyText>
            </ProfileDetails>
          </ProfileInfo>
          <BDivider />
          <SmallTitle>인생 영화</SmallTitle>
          {/* <BestPicks>
            <h3>나의 베스트 원픽</h3>
            베스트 원픽 섹션
          </BestPicks> */}
        </StyledContainer>
      </Main>
    </>
  );
};

export default ProfilePage;
