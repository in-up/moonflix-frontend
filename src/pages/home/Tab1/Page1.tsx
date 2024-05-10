import { useRouter } from "next/router"; // useRouter import 추가
import React, { useEffect, useState } from "react";
import requests from "../../../apis/requests";
import Banner from "./Banner";
import Row from "../../layout/Row";

const Page1: React.FC = () => {
  const router = useRouter(); // useRouter 추가

  const { pathname, query } = router; // useRouter로 변경
  const { asPath } = router; // 추가된 부분

  const searchParams = new URLSearchParams(asPath.split("?")[1]); // URLSearchParams에서 쿼리 파라미터 가져오기

  const [personalizeUrl, setPersonalizeUrl] = useState<string>("/all");
  const [myRating, setMyRating] = useState<number[]>([]);

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
      {/* NAV */}
      {/* BANNER */}
      <Banner />

      <Row
        title="당신을 위한 추천"
        id="RF"
        fetchUrl={personalizeUrl}
        addRating={addRating}
        key={personalizeUrl}
      />

      <Row
        title="영화달 베스트"
        id="DP"
        fetchUrl={requests.fetchDQsPick}
        addRating={addRating}
      />
      {/* <Row
        title="액션"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        addRating={addRating}
      />
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
