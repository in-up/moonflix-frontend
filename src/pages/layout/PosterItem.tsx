import React from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { formatTitle } from "../../apis/formatTitle";

interface PosterProps {
  id: number;
  movieTitle?: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  hovering?: boolean;
}

const PosterContainer = styled.div<{ hovering?: boolean }>`
  position: relative;
  display: inline-block;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  display: flex;

  &:hover .title {
    opacity: 1;
  }

  transition: border-color 0.3s ease;

  border: 3px solid #ffffff00;
  &:hover {
    border-color: ${({ hovering }) => (hovering ? "#fff" : "#none")};
  }
`;

const PosterImage = styled(Image)<{ hovering?: boolean }>`

  border-radius: 0;
      padding: 0px;
      border: 1px solid #ffffff00;
      box-shadow: 0 0 0;
      &:hover {
        border-color: #00000000;
      }

  ${(props) =>
    props.hovering &&
    css`
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
      padding: 0.25rem;
    `}
`;

const TitleOverlay = styled.div<{ hovering?: boolean }>`
  position: absolute;
  display: ${({ hovering}) => (hovering ? "flex" : "none")};
  align-items: flex-end;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  font-size: 1.3rem;
  font-weight: 600;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Poster: React.FC<PosterProps> = ({
  id,
  movieTitle,
  path,
  alt,
  width,
  height,
  hovering,
}) => {
  const router = useRouter();

  const handleClick = (movieId: number, movieTitle: string) => {
    console.log(movieId);
    router.push("/movie/" + movieId);
  };

  const formattedTitle = movieTitle ? formatTitle(movieTitle) : "";

  return (
    <PosterContainer
      hovering={hovering}
      onClick={() => handleClick(id, movieTitle || "")}
    >
      <PosterImage
        src={path}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
        priority={true}
        hovering={hovering}
      />
      <TitleOverlay hovering={hovering} className="title">{formattedTitle}</TitleOverlay>
    </PosterContainer>
  );
};

export default Poster;
