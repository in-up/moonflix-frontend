import { useEffect, useState } from "react";
import Image from "next/image"; // Next.js에서 이미지를 다루는 데 사용되는 Image 컴포넌트
import styles from "./Nav.css"; // 스타일 파일을 불러올 때에는 모듈화된 방식으로 사용합니다.

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.nav} ${show && styles.nav__black}`}>
      <Image
        alt="moviemoon logo"
        src="/logo.png"
        width={100}
        height={50}
        className={styles.nav__logo}
      />
      <Image
        alt="User logged"
        src="/vercel.svg"
        width={50}
        height={50}
        className={styles.nav__avatar}
      />
    </nav>
  );
};

export default Nav;
