import React, { useEffect, useState } from "react";
import requests from "../../apis/tmdbRequests";
import styled from "styled-components";
import { slate } from "@radix-ui/colors";

interface BackdropProps {
  path: string;
  title: string;
  year: number;
}

const BackdropWrapper = styled.header<{ imageUrl: string }>`
  display: flex;
  flex-direction: column-reverse;
  color: white;
  object-fit: contain;
  height: 18rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.imageUrl}) center/cover no-repeat;
  border-radius: 20px;
  margin: 0 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const TitleText = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 2rem 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    margin: 0 0 2rem 2rem;
  }
`;

const YearText = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0 0 2.5rem 1rem;
  @media screen and (max-width: 768px) {
    margin: 0 2rem 2rem 0;
  }
`;

const Backdrop: React.FC<BackdropProps> = ({ path, title, year }) => {
  return (
    <BackdropWrapper imageUrl={`https://image.tmdb.org/t/p/original/${path}`}>
      <StyledContainer>
        <TitleText>{title}</TitleText>
        <YearText>({year})</YearText>
      </StyledContainer>
    </BackdropWrapper>
  );
};

export default Backdrop;
