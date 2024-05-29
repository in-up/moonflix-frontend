import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const FooterContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 1rem;
    opacity: calc(0.4);
    transition: opacity 0.3s ease;
    &:hover {
      opacity: calc(0.7);
      cursor: pointer;
    }
  }
`;

const Logo: React.FC = () => {
  return (
    <FooterContainer>
      <Link href="https://github.com/in-up/moonflix-frontend" passHref>
        <div>
          <Image
            src="/footer3.png"
            alt="Logo"
            width={75}
            height={50}
            layout="intrinsic"
          />
        </div>
      </Link>
      <a
        href="https://www.themoviedb.org/?language=ko"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <Image
            src="/footer1.png"
            alt="Logo"
            width={75}
            height={50}
            layout="intrinsic"
          />
        </div>
      </a>
    </FooterContainer>
  );
};

export default Logo;
