import React from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

interface PosterProps {
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

const Poster: React.FC<PosterProps> = ({ path, alt, width, height }) => {
  return (
    <PosterImage
      src={path}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "cover" }}
      priority={true}
    />
  );
};

export default Poster;
