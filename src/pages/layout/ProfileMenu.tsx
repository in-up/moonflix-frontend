import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const MenuContainer = styled.div<{ open: boolean }>`
  position: absolute;
  top: 5rem;
  right: 2.5rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  display: ${(props) => (props.open ? "block" : "none")};
  animation: ${(props) => (props.open ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const MenuItem = styled.div`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 2rem;
  background-image: url('/profile.png'); /* 프로필 이미지 경로 */
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.08);
  }
`;

interface ProfileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void; // setOpen 함수를 추가
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ open, setOpen }) => {
  const handleLogout = () => {
    // 로그아웃 처리
    setOpen(false); // 메뉴를 닫습니다.
  };

  return (
    <div>
      <ProfileImageContainer onClick={() => setOpen(!open)} /> {/* 클릭하면 메뉴를 열거나 닫습니다. */}
      <MenuContainer open={open}>
        <MenuItem onClick={handleLogout}>아무개 님</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </MenuContainer>
    </div>
  );
};
