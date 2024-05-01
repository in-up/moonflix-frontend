"use client"
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import requests from "../API/requests";
import "./App.css";
import Banner from "./Banner";
import Nav from "./Nav";
import Row from "./Row";

const App = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [personalizeUrl, setPersonalizeUrl] = useState("/all");
  const [myRating, setMyRating] = useState([]);

  const addRating = (rating) => {
    const updatedRatings = [...myRating, rating];
    setMyRating(updatedRatings);
    const userBasedParams = updatedRatings.join("&params=");
    const url = `/user-based/?params=${userBasedParams}`;
    setPersonalizeUrl(url);
  };

  useEffect(() => {
    if (myRating.length > 0) {
      const userBasedParams = myRating.join("&params=");
      const url = `/user-based/?params=${userBasedParams}`;
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  }, [myRating, personalizeUrl]);

  // const [personalizeUrl, setPersonalizeUrl] = useState("/api/all");
  // const [myRating, setMyRating] = useState([]);

  // const addRating = (rating) => {
  //   const updatedRatings = [...myRating, rating];
  //   setMyRating(updatedRatings);
  //   const userBasedParams = updatedRatings.join("&params=");
  //   const url = `/api/user-based/?params=${userBasedParams}`;
  //   setPersonalizeUrl(url);
  // };

  // useEffect(() => {
  //   if (myRating.length > 0) {
  //     const userBasedParams = myRating.join("&params=");
  //     const url = `/api/user-based/?params=${userBasedParams}`;
  //     setPersonalizeUrl(url);
  //   }
  //   console.log(personalizeUrl);
  // }, [myRating, personalizeUrl]);

  return (
    <div className="app">
      {/* NAV */}
      <Nav />
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
      <Row
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
      />
    </div>
  );
};

export default App;
