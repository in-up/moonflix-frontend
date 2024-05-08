import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { ProfileMenu } from "./ProfileMenu";
import { slate, grayDark } from "@radix-ui/colors";
import RiIcon from "./RiIcon";

// 스타일링
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  background-color: ${grayDark};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 1rem;
    padding: 0.5rem;
    background-color: transparent;
    color: ${slate.slate1};
    font-weight: bold;
    font-size: 1.25rem;
    border: none;
    cursor: pointer;
    transition: text-shadow 0.3s ease;

    &:hover {
      color: white;
      text-shadow: 0px 1px 15px white; /* 텍스트에 하얀색 그림자 추가 */
    }
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Header 컴포넌트
const Header: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Logo />
      <RightSection>
        <button onClick={() => setCurrentPage("tab1")}>홈</button>
        <button onClick={() => setCurrentPage("tab2")}>장르별 추천</button>
        <button onClick={() => setCurrentPage("tab3")}>내 보관함</button>
      </RightSection>
      <DropdownContainer>
          <RiIcon className="ri-search-line" onClick={() => setCurrentPage("home")} />
          <RiIcon className="ri-inbox-line" onClick={() => setCurrentPage("page1")} />
          <ProfileMenu open={menuOpen} setOpen={setMenuOpen} />
      </DropdownContainer>
    </Container>
  );
};

export default Header;
