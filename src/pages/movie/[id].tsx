// pages/movieinfo/[id].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../../apis/tmdb_requests';
import Head from 'next/head';
import styled from 'styled-components';
import Header from "../layout/Header";
import Backdrop from './Backdrop';
import Credits from './Credits';
import Rating from '../layout/Rating';
import supabase from '@/apis/supabaseClient'; // Supabase 클라이언트 정의

interface MovieInfo {
  id: number;
  title: string;
  overview: string;
  year: number;
  backdrop_path: string;
  vote_average: number;
}

interface Comment {
  id: number;
  user_id: string; // 유저 식별 정보
  movie_id: number; // 영화 ID
  comment: string; // 댓글 내용
  rating: number; // 별점 평가
  created_at: string; // 생성 시간
}

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  margin-top: 6rem;
  color: white;
  display: flex;
`;


const LeftContainer = styled.div`
  width: 20%;
  height: 100%;
  filter: blur(10px); /* 블러 처리 */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  background-color: rgb();
  filter: blur(10px); /* 블러 처리 */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// 중앙 & 메인
const MiddleContainer = styled.div`
  width: 60%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 0;
  }
`;

const MovieTitle = styled.h1`
  font-size: 3.75rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  margin-bottom: 0.4rem;
`;

// 년도처럼 제목보다 작게 들어가는 녀석들
const Overview = styled.p`
  font-size: 1.3rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  padding-bottom: 2rem;
`;
// 줄거리 및 글씨가 많이 들어가는 부분
const Detail = styled.p`
  font-size: 0.8rem;
  padding-right: 3rem;
  padding-left: 3rem;
  color: white;
  padding-top: 0.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 1rem 0;
`;

const RatingBox = styled.div`
  padding-left: 3rem;
  display: flex;
`;

const RatingWord = styled.div`
  margin-right: 0.7rem;
`;

const CommentFormContainer = styled.form`
  margin-top: 20px;
  border: 1px solid #78798c;
  border-radius: 8px;
  padding: 15px;
  background: #37384e;
  position: relative;  /* 우측 상단 환영합니다 메시지를 위해 relative 위치 추가 */
`;

const CommentTextArea = styled.textarea`
  width: 97%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #78798c;
  border-radius: 8px;
  background: #78798c;
  color: #D0D0D0;
  resize: none;
  &::placeholder {
    color: #D0D0D0;
  }
  &:hover {
    cursor: text;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #78798c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #6a6b7c;
  }
`;

// 유저의 댓글 목록을 감싸는 컨테이너
const CommentsContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #78798c;
  border-radius: 8px;
  padding: 15px;
  background: #37384e;
`;

// 유저의 댓글 각각을 감싸는 컨테이너
const UserCommentContainer = styled.div`
  background-color: #78798c;  // 라이트 그레이 배경
  border-radius: 8px;  // 둥근 모서리
  margin-bottom: 10px;  // 각 댓글 사이의 마진
  padding: 10px;  // 내부 패딩
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  // 그림자 효과
`;

const Comment = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CommentUser = styled.strong`
  display: block;
  color: #333;
  margin-bottom: 5px;
`;

const CommentContent = styled.p`
  white-space: pre-wrap;
  color: #333;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
  color: #333;
  margin-top: 5px;
`;

const RatingStars = styled.div`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`;

const LoginStatusMessage = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  color: #D0D0D0;
  font-size: 0.9rem;
`;

const Movie: React.FC = () => {
  //header 정보
  const pageTitle = '영화달 MOONFLIX - 영화정보';
  const [currentPage, setCurrentPage] = useState("MovieInfo");
  //페이지 상단 네비게이터

  //api key
  const apikey = process.env.TMDB_API_KEY;

  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const tmdbId = typeof id === 'string' ? parseInt(id, 10) : -1;
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
   // 로그인한 사용자 정보를 관리하는 상태
   const [user, setUser] = useState<null | { id: string; email?: string }>(null);
  const fullMoon = '🌕';
  const halfMoon = '🌗';
  const newMoon = '🌑';

  useEffect(() => {
    const fetchMovieAndComments = async () => {
      try {
        const movieResponse = await axios.get(`${requests.fetchMovie}${id}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`);
        const movieData = movieResponse.data;
        setMovie({
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          year: new Date(movieData.release_date).getFullYear(),
          backdrop_path: movieData.backdrop_path,
          vote_average: movieData.vote_average,
        });
  
        // Supabase에서 현재 영화의 모든 댓글을 가져옴
        const { data: commentsData, error: commentsError } = await supabase
          .from('useritem')
          .select('*')
          .eq('movie_id', id);  //'id' 값 확인 필요
  
        if (commentsError) {
          throw new Error(`Failed to fetch comments: ${commentsError.message}`);
        }
  
        if (commentsData && commentsData.length > 0) {
          setComments(commentsData);
        } else {
          console.log('No comments data received or empty array');
        }
      } catch (error) {
        console.error('Error in fetching movie or comments:', error);
      }
    };
  
    if (id) {  // 'id'가 유효할 때만 데이터를 가져옵니다.
      fetchMovieAndComments();
    }

    // 로그인 세션 확인
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser({ id: session.user.id, email: session.user.email });
      } else {
        setUser(null);
      }
    };
  
    checkUserSession();

  }, [id]);  // 'id' 상태가 변할 때마다 실행
  

  const displayRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= (i + 1) * 2) {
        stars.push(fullMoon);
      } else if (rating === (i * 2) + 1) {
        stars.push(halfMoon);
      } else {
        stars.push(newMoon);
      }
    }
    return stars.join('');
  };

  const handleRatingClick = (index: number) => {
    const newRating = rating === (index * 2 + 1) ? (index + 1) * 2 : (index * 2 + 1);
    setRating(newRating);
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
      console.error('User is not logged in.');
      alert('로그인 후 이용해주세요.');
      return;
    }

    const commentData = {
      user_id: session.user.id,
      movie_id: parseInt(id as string, 10), // 'id'를 안전하게 숫자로 변환 
      comment,
      rating,
    };

    try {
        const { data: insertData, error: insertError } = await supabase
            .from('useritem')
            .insert([commentData]);
        console.log('Insert data:', insertData); // 삽입된 데이터 로깅

        // 삽입 후 최신 댓글 데이터 조회
        const { data: freshComments, error: fetchError } = await supabase
            .from('useritem')
            .select('*')
            .eq('movie_id', parseInt(id as string, 10));

        if (fetchError) {
            console.error('Error fetching updated comments:', fetchError.message);
            return;
        }

        if (freshComments) {
            setComments(freshComments); // 상태 업데이트
            setComment(''); // 입력 필드 초기화
            setRating(0); // 평점 초기화
            alert('댓글이 등록되었습니다.');
        }
    } catch (error) {
      console.error('Failed to submit:', error instanceof Error ? error.message : error);
      alert(`댓글 등록에 실패했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    }
};


  
return (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    <Header setCurrentPage={setCurrentPage} />
    <Main>
      <LeftContainer />
      <MiddleContainer>
        <Backdrop path={movie ? movie.backdrop_path : ''} />
        <div>
          <MovieTitle>{movie ? `${movie.title} (${movie.year})` : 'Loading...'}</MovieTitle>
          <RatingBox>
            <Rating rating={movie ? movie.vote_average : 0} size={70} />
          </RatingBox>
          <RatingBox>
            <RatingWord>평점 : {movie ? Math.round(movie.vote_average * 10) : 0}%</RatingWord>
          </RatingBox>
          <Divider />
          <Overview>{movie ? movie.overview : 'Loading...'}</Overview>
          <Divider />
          <Credits tmdbId={parseInt(id as string, 10)} />

          <CommentFormContainer onSubmit={handleCommentSubmit}>
            <LoginStatusMessage>
              {user ? `[${user.email ? user.email : 'Unknown'}]님 환영합니다. 평점을 남겨주세요!` : '로그인 후 이용해주세요'}
            </LoginStatusMessage>
            <RatingStars>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} onClick={() => handleRatingClick(index)}>
                  {index * 2 < rating ? (index * 2 + 1 === rating ? halfMoon : fullMoon) : newMoon}
                </span>
              ))}
            </RatingStars>
            <CommentTextArea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Leave a comment (Optional)"
              rows={3}
            />
            <SubmitButton type="submit">남기기</SubmitButton>
          </CommentFormContainer>
          <CommentsContainer>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <UserCommentContainer key={comment.id}>
                  <CommentUser>User: {comment.user_id}</CommentUser>
                  <CommentContent>
                    {displayRating(comment.rating)}
                    <br />
                    {comment.comment}
                  </CommentContent>
                </UserCommentContainer>
              ))
            ) : (
              <p>No comments available</p> // 메시지 표시
            )}
          </CommentsContainer>
        </div>
      </MiddleContainer>
      <RightContainer />
    </Main>
  </>
);
};

export default Movie;