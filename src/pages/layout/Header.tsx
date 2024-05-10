import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { ProfileMenu } from "./ProfileMenu";
import { slate, grayDark } from "@radix-ui/colors";
import RiIcon from "./RiIcon";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: calc(100% - 5rem); /* 수정된 부분 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  background-color: ${grayDark};
  z-index: 1000; /* 위에 떠있게 함 */
  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
    width: calc(100% - 2rem);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 1rem;
    padding: 0.5rem;
    background-color: transparent;
    color: ${slate.slate10};
    font-weight: bold;
    font-size: 1.25rem;
    border: none;
    cursor: pointer;
    transition: text-shadow, color 0.3s ease;

    &:hover {
      color: ${slate.slate1};
      text-shadow: 0px 4px 15px rgba(255, 255, 255, 0.7); 
    }
  }

  button.active {
    color: ${slate.slate1};
    text-shadow: 0px 4px 15px rgba(255, 255, 255, 0.3); 
  }

  @media screen and (max-width: 768px) {
    button {
      display: none;
    }
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Container>
      <Logo />
      <RightSection>
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => {
            setCurrentPage("tab1");
            setActiveTab("tab1");
          }}
        >
          홈
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => {
            setCurrentPage("tab2");
            setActiveTab("tab2");
          }}
        >
          장르별 추천
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => {
            setCurrentPage("tab3");
            setActiveTab("tab3");
          }}
        >
          내 보관함
        </button>
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
