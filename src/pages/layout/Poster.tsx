import React from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { useRouter } from 'next/router';

interface NavigationButtonProps {
  destination: string;
  label: string;
}

interface PosterProps {
  id: number;
  path: string;
  alt: string;
  width: number;
  height: number;
}

const borderAnimation = keyframes`
  from {
    border-color: #ffffff00;
  }
  to {
    border-color: #fff;
  }
`;

const PosterImage = styled(Image)`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
  border: 3px solid #ffffff00;
  padding: 0.25rem;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #fff;

  }
`;

const Poster: React.FC<PosterProps> = ({ id, path, alt, width, height }) => {
  const router = useRouter();

  const handleClick = (movieId: number) => {
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
      onClick={() => handleClick(id)}
    />
  );
};

export default Poster;
