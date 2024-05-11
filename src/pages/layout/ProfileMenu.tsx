import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link"; // Next.js의 Link 컴포넌트 추가

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

  /* 링크 스타일 */
  a {
    color: inherit; /* 부모 요소에서 상속한 색상 사용 */
    text-decoration: none; /* 밑줄 제거 */
  }
`;

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 2rem;
  background-image: url('/profile.png');
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.08);
  }
  @media screen and (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

interface ProfileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ open, setOpen }) => {
  const handleSign = () => {
    setOpen(false);
  };

  return (
    <div>
      <ProfileImageContainer onClick={() => setOpen(!open)} />
      <MenuContainer open={open}>
        {/* Link를 MenuItem 안에 넣어서 클릭 시 이동할 주소를 지정할 수 있습니다. */}
        <MenuItem onClick={handleSign}>
          <Link href="/Sign">
            아무개 님
          </Link>
        </MenuItem>
        <MenuItem onClick={handleSign}>
          <Link href="/Sign">
            로그인
          </Link>
        </MenuItem>
      </MenuContainer>
    </div>
  );
};
