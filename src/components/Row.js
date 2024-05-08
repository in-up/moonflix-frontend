import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import styles from "./Row.css"; // CSS 모듈로 변경
import Poster from "./Poster"; // 파일 확장자 수정
import CustomSwiper from "./CustomSwiper";

SwiperCore.use([Navigation]); // Navigation 모듈 사용

const Row = ({ title, fetchUrl, id, addRating }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api${fetchUrl}`);
      const data = await res.json();
      setMovies(data.result);
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalVisibility(true);
    setMovieSelection(movie);
  };

  return (
    <section className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.slider}>
        <Swiper
          spaceBetween={30}
          slidesPerView={5}
          autoplay={true}
          loop={true}
          navigation={true} // Navigation 활성화
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx} className={styles.row__poster} onClick={() => handleClick(movie)}>
              <Poster
                path={`${base_url}${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* {modalVisibility && (
        <MovieModal
          {...movieSelected}
          setModalVisibility={setModalVisibility}
          addRating={addRating}
        />
      )} */}
    </section>
  );
};

export default Row;
