import { useRouter } from "next/router"; // useRouter import 추가
import React, { useEffect, useState } from "react";
import requests from "../../apis/requests";
import Banner from "./Banner";
import Row from "../layout/Row";
import { isAuthenticated } from "@/apis/auth";
import { getUserId } from "@/apis/userinfo";
import axios from "axios";

const Page1: React.FC = () => {
  const router = useRouter(); // useRouter 추가

  const { pathname, query } = router; // useRouter로 변경
  const { asPath } = router; // 추가된 부분

  const searchParams = new URLSearchParams(asPath.split("?")[1]); // URLSearchParams에서 쿼리 파라미터 가져오기

  const [personalizeUrl, setPersonalizeUrl] = useState<string>("/all");
  const [myRating, setMyRating] = useState<number[]>([]);
  const [login, setLogin] = useState(false); // 로그인 확인
  const [requestResult, setRequestResult] = useState<boolean | null>(null);
  const userBaseUrl = "/user-based/";

  useEffect(() => {
    const sendUserBasedRequest = async () => {
      try {
        await axios.get("/api/user-based/" + getUserId());
        // 요청이 성공하면 true 설정
        setRequestResult(true);
      } catch (error) {
        // 요청이 실패하면 false 설정
        setRequestResult(false);
      }
    };
    sendUserBasedRequest();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      setLogin(isAuthenticated());
    };
    checkAuth();
  }, []);

  const addRating = (rating: number) => {
    const updatedRatings = [...myRating, rating];
    setMyRating(updatedRatings);
    const userBasedParams = updatedRatings.join("&params=");
    const url = `/api/user-based/?params=${userBasedParams}`;
    setPersonalizeUrl(url);
  };

  useEffect(() => {
    if (myRating.length > 0) {
      const userBasedParams = myRating.join("&params=");
      const url = `/api/user-based/?params=${userBasedParams}`;
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  }, [myRating, personalizeUrl]);

  return (
    <div className="app">
      <Banner />
      <Row
        title="TOP 콘텐츠"
        id="DP"
        fetchUrl={requests.fetchTopMovies}
        addRating={addRating}
      />
      {login && requestResult && (
        <Row
          title="취향저격! 추천 콘텐츠"
          id="UB"
          fetchUrl={userBaseUrl + getUserId()}
          addRating={addRating}
          key={personalizeUrl}
        />
      )}
      {/* <Row
        title="애니메이션"
        id="AN"
        fetchUrl={requests.fetchAnimationMovies}
        addRating={addRating}
      /> */}
      {/*
      <Row
        title="코미디"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        addRating={addRating}
      />
      <Row
        title="공포"
        id="HM"
        fetchUrl={requests.fetchHorrorMovies}
        addRating={addRating}
      />
      <Row
        title="로맨스/멜로"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
        addRating={addRating}
      /> */}
    </div>
  );
};

export default Page1;
