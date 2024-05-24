import React from "react";
import Image from "next/image";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from 'next/router';

interface PosterProps {
  id: number;
  movieTitle: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  isNoUse?: boolean;
}

const borderAnimation = keyframes`
  from {
    border-color: #ffffff00;
  }
  to {
    border-color: #fff;
  }
`;

const PosterImage = styled(Image).attrs<{ isNoUse?: boolean }>((props) => ({
  isNoUse: props.isNoUse
}))<{ isNoUse?: boolean }>`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
  border: 3px solid #ffffff00;
  padding: 0.25rem;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #fff;
  }

  //isUseNone 파라미터가 true일 경우 적용되는 스타일
  ${(props) =>
    props.isNoUse &&
    css`
      border-radius: 0; // 예시로 다른 스타일 적용
      padding: 0px;
      border: 1px solid #ffffff00;
      box-shadow: 0 0 0;
      &:hover {
        border-color: #00000000;
      }
    `}
`;

const Poster: React.FC<PosterProps> = ({ id, movieTitle, path, alt, width, height, isNoUse = false }) => {
  const router = useRouter();

  const handleClick = (movieId: number, movieTitle: string) => {
    console.log(movieId);
    router.push('/movie/' + movieId);
  };

  return (
    <PosterImage
      src={path}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "cover" }}
      priority={true}
      onClick={() => handleClick(id, movieTitle)}
      isNoUse={isNoUse}
    />
  );
};

export default Poster;
