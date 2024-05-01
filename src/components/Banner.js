import React, { useEffect, useState } from "react";
import Image from "next/image"; // Next.js에서 이미지를 다루는 데 사용되는 Image 컴포넌트
import { PlayIcon } from '@radix-ui/react-icons'
import requests from "../API/requests";
import styles from "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${requests.fetchDQsPick}`);
      // const res = await fetch(`/api${requests.fetchDQsPick}`);
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.result.length);
      setMovie(data.result[randomIndex]);
    }
    fetchData();
  }, []);

  return (
    <header
      className={styles.banner}
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${movie?.poster_path}) center/cover no-repeat`,
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.banner__buttons}>
          <button className={`${styles.banner__button} ${styles.play}`}>
            <PlayIcon />
            Play
          </button>
        </div>
        <h1 className={styles.banner__description}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={styles.banner__fadeBottom} />
    </header>
  );
};

export default Banner;
