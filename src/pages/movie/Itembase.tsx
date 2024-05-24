import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Poster from "../layout/Poster";
import styled from "styled-components";
import { slate } from "@radix-ui/colors";

interface Movie {
  tmdbId: number;
  title: string;
  poster_path: string;
}

interface RowProps {
  title: string;
  fetchUrl: string;
  id: string;
  addRating: (rating: number) => void;
}

const RowWrapper = styled.section`
  color: white;
  margin: 2rem 0;
`;

const RowTitle = styled.h2`
  font-size: 1.75rem;
  padding-left: 3rem;
  color: white;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  .swiper-button-prev,
  .swiper-button-next {
    padding: 15px 5px;
    border-radius: 20px;
    color: ${slate.slate1} !important;
    opacity: 0.7;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 1.5rem !important;
    font-weight: 600 !important;
  }
`;

const RowPosters = styled.div`
  display: flex;
  padding: 20px 0;
`;

const RowPoster = styled.div`
  flex-shrink: 0;
  width: 200px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;
  text-align: center;

  &:hover {
    transform: scale(1.08);
  }

  @media screen and (min-width: 1200px) {
    max-height: 360px;
  }

  @media screen and (max-width: 768px) {
    max-height: 280px;
  }

  .poster-title {
    margin: 1rem 0.75rem;
    font-size: 1rem;
    color: ${slate.slate1};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 30vw;
  }
`;

const Itembase: React.FC<RowProps> = ({ title, fetchUrl, id, addRating }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [imgWidth, setImgWidth] = useState(200); // Default width
  const [imgHeight, setImgHeight] = useState(300); // Default height

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api${fetchUrl}`);
        const data = await res.json();
        setMovies(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") { // Check if window object is available
        const newImgWidth = window.innerWidth * 0.6 <= 768 ? 120 : 150;
        const newImgHeight = window.innerWidth * 0.6 <= 768 ? 180 : 200;
        
        setImgWidth(newImgWidth);
        setImgHeight(newImgHeight);

        const slideWidth = newImgWidth;
        const spaceBetween = 30;
        const screenWidth = window.innerWidth;
        const slidesPerView = Math.floor(screenWidth * 0.6 / (slideWidth + spaceBetween));
        setSlidesPerView(slidesPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (movie: Movie) => {
    // Handle click logic here
  };
  
  return (
    <RowWrapper>
      <RowTitle>{title}</RowTitle>
      <Slider>
        <Swiper
          style={{ padding: "1rem 2rem" }}
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={slidesPerView}
          autoplay={false}
          loop={false}
          navigation={true}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx}>
              <RowPoster className="row__poster" onClick={() => handleClick(movie)}>
                <Poster
                  id={movie.tmdbId}
                  movieTitle={movie.title}
                  path={`${base_url}${movie.poster_path}`}
                  alt={movie.title}
                  width={imgWidth}
                  height={imgHeight}
                  isNoUse={false}
                />
                <div className="poster-title">{movie.title}</div>
              </RowPoster>
            </SwiperSlide>
          ))}
        </Swiper>
      </Slider>
    </RowWrapper>
  );
};

export default Itembase;
