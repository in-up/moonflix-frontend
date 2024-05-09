import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Poster from "./Poster";
import styled from "styled-components";


interface Movie {
  id: number;
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
`;

const RowTitle = styled.h2`
  font-size: 1.75rem;
  padding-left: 3rem;
  color: white;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
`;

const RowPosters = styled.div`
  display: flex;
  padding: 20px 0;
`;

const RowPoster = styled.div`
  flex-shrink: 0;
  width: 200px;
  max-height: 300px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;

  &:hover {
    transform: scale(1.08);
  }

  @media screen and (min-width: 1200px) {
    max-height: 360px;
  }

  @media screen and (max-width: 768px) {
    max-height: 280px;
  }
`;

const Row: React.FC<RowProps> = ({ title, fetchUrl, id, addRating }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState<Movie[]>([]);

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

  const handleClick = (movie: Movie) => {
  };

  return (
    <RowWrapper>
      <RowTitle>{title}</RowTitle>
      <Slider>
        <Swiper
          style={{ padding: "2rem" }}
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={8}
          autoplay={true}
          loop={true}
          navigation={true}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx}>
              <RowPoster className="row__poster" onClick={() => handleClick(movie)}>
                <Poster
                  path={`${base_url}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
              </RowPoster>
            </SwiperSlide>
          ))}
        </Swiper>
      </Slider>
    </RowWrapper>
  );
};

export default Row;
