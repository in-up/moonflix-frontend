import React from "react";
import styled from "styled-components";
import { slate, whiteA } from "@radix-ui/colors";

const RiIcon = styled.i`
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  color: ${slate.slate1};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${whiteA.whiteA4};
    transform: scale(1.08);
  }
`;

export default RiIcon;
