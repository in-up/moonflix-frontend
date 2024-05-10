import React, { useEffect, useState } from "react";
import requests from "../../../apis/requests";
import styled from "styled-components";
import { slate } from "@radix-ui/colors";

interface Movie {
  title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string;
  overview?: string;
}

const BannerWrapper = styled.header<{ imageUrl: string }>`
  color: white;
  object-fit: contain;
  height: 28rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.imageUrl}) center/cover no-repeat;
  border-radius: 20px;
  margin: 1rem;
`;

const BannerContents = styled.div`
  margin-left: 5rem;
  padding-top: 10rem;
  height: 10rem;
  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const BannerDescription = styled.p`
  width: 80%;
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  max-width: 700px;
  height: 80px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: auto;
  }
`;

const BannerFadeBottom = styled.div`
  height: 8rem;
  border-radius: 20px;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.21),
    #111
  );
`;

const BannerButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background-color: ${slate.slate1};
  color: black;
  transition: transform 0.3s ease;
  i {
    padding: 0rem 0.5rem;
    transition: transform 0.3s ease; /* 아이콘에 트랜지션 적용 */
    transform: translateX(-3px);
  }

  &:hover {
    transform: scale(1.08);

    i {
      transform: translateX(3px); /* 호버링 시 아이콘을 오른쪽으로 이동 */
    }
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie>({});

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api${requests.fetchDQsPick}`);
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.result.length);
      setMovie(data.result[randomIndex]);
    }
    fetchData();
  }, []);

  return (
    <BannerWrapper imageUrl={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}>
      <BannerContents>
        <BannerTitle>{movie?.title || movie?.name || movie?.original_name}</BannerTitle>
        <div className="banner__buttons">
          <BannerButton>
                < i className="ri-arrow-right-line"></i>
                &nbsp;자세히 보기
          </BannerButton>
        </div>
        <BannerDescription>
          {truncate(movie?.overview || "", 150)}
        </BannerDescription>
      </BannerContents>
      <BannerFadeBottom />
    </BannerWrapper>
  );
};

export default Banner;
