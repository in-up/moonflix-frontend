import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../layout/Header";
import { getUserId } from "@/apis/auth";
import supabase from "@/apis/supabaseClient";
import { isAuthenticated } from "../../apis/auth";
import List from "../layout/List";

const Main = styled.main`
  color: white;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const StyledContainer = styled.div`
  margin: 3rem;
  max-width: 56rem;
`;

const LibraryPage: React.FC = () => {
  const router = useRouter();
  const [userMovieIds, setUserMovieIds] = useState<number[]>([]);
  const [matchingMovies, setMatchingMovies] = useState<any[]>([]);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const user = await isAuthenticated();
      if (!user) {
        alert("로그인이 필요합니다.");
        router.push("/sign");
      }
    };
    checkAndRedirect();
  }, [router]);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const userId = getUserId();
        const { data, error } = await supabase
          .from("useritem")
          .select("movie_id")
          .eq("user_id", userId);

        if (error) {
          throw error;
        }

        const ids = data.map((item: any) => item.movie_id);

        setUserMovieIds(ids);

        const { data: moviesData, error: moviesError } = await supabase
          .from("movie")
          .select("*")
          .in("tmdbId", ids);

        if (moviesError) {
          throw moviesError;
        }

        setMatchingMovies(moviesData || []);
        console.log(moviesData);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchUserItems();
  }, []);

  return (
    <Main>
      <Header />
      <StyledContainer>
        <h1>내 보관함</h1>
        <p>감상평을 남긴 영화들을 확인해보세요.</p>
        {matchingMovies.map((movie: any) => (
          <List
            key={movie.tmdbId}
            id={movie.tmdbId}
            title={movie.title}
            poster_path={movie.poster_path}
            rating={movie.rating_avg}
            rating_count={movie.rating_count}
          />
        ))}
      </StyledContainer>
    </Main>
  );
};

export default LibraryPage;
