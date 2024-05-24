import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const FooterContainer = styled.div`
    padding: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: calc(0.4);

    div {
        margin: 0.75rem
    }
`;

const Logo: React.FC = () => {
  return (
    <FooterContainer>
        <div>
            <Image src="/footer3.png" alt="Logo" width={75} height={50} layout="intrinsic" />
        </div>
        <div>
            <Image src="/footer1.png" alt="Logo" width={75} height={50} layout="intrinsic" />
        </div>
    </FooterContainer>
  );
};

export default Logo;
