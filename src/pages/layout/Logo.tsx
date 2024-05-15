import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const LogoContainer = styled.div`
  width: 120px;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  transform: scale(1.1);

  &:hover {
    transform: scale(1.2);
  }
`;

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <Image src="/logo.png" alt="Logo" width={100} height={50} layout="intrinsic" />
      </LogoContainer>
    </Link>
  );
};

export default Logo;
