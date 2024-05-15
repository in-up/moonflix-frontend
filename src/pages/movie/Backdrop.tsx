import React, { useEffect, useState } from "react";
import requests from "../../apis/tmdb_requests";
import styled from "styled-components";
import { slate } from "@radix-ui/colors";

interface BackdropProps {
  path:string;
}

const BackdropWrapper = styled.header<{ imageUrl: string }>`
  color: white;
  object-fit: contain;
  height: 28rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.imageUrl}) center/cover no-repeat;
  border-radius: 20px;
  margin: 1rem;
`;


const Backdrop: React.FC<BackdropProps> = ({ path }) => {
  
  return (
    <BackdropWrapper imageUrl={`https://image.tmdb.org/t/p/original/${path}`}>
    </BackdropWrapper>
  );
};

export default Backdrop;