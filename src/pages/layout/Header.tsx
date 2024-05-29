import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "./Logo";
import { ProfileMenu } from "./ProfileMenu";
import { slate, blackA } from "@radix-ui/colors";
import RiIcon from "./RiIcon";

interface ContainerProps {
  scroll: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  width: calc(100% - 5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2.5rem;
  background-color: ${(props) =>
    props.scroll ? blackA.blackA11 : "rgba(0, 0, 0, 0)"};
  transition: background-color 0.3s ease;
  z-index: 1000;

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
    color: ${slate.slate8};
    font-weight: bold;
    font-size: 1.2rem;
    font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", sans-serif;
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

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1"); // 초기값은 "tab1"로 설정
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 현재 경로를 가져와서 해당 경로에 따라 activeTab 상태를 설정
  useEffect(() => {
    const path = router.asPath;
    if (path === "/") {
      setActiveTab("tab1");
    } else if (path === "/genre") {
      setActiveTab("tab2");
    } else if (path === "/library") {
      setActiveTab("tab3");
    }
  }, [router.asPath]);

  const handleSearchButtonClick = () => {
    router.push("/search");
  };

  const handleProfileButtonClick = () => {
    router.push("/profile");
  };

  const handleHomeButtonClick = () => {
    router.push("/");
  };

  const handleGenreButtonClick = () => {
    router.push("/genre");
  };

  const handleLibraryButtonClick = () => {
    router.push("/library");
  };

  return (
    <Container scroll={scroll}>
      <Logo />
      <RightSection>
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleHomeButtonClick}
        >
          홈
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleGenreButtonClick}
        >
          장르별 추천
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={handleLibraryButtonClick}
        >
          내 보관함
        </button>
      </RightSection>
      <DropdownContainer>
        <RiIcon className="ri-search-line" onClick={handleSearchButtonClick} />
        <RiIcon className="ri-inbox-line" onClick={handleProfileButtonClick} />
        <ProfileMenu open={menuOpen} setOpen={setMenuOpen} />
      </DropdownContainer>
    </Container>
  );
};

export default Header;
