import { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '@/apis/supabaseClient';

const FavoriteButton = styled.button`
  padding: 10px 15px;
  height: 50px;
  background-color: #78798c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 180px;
  &:hover {
    background-color: #6a6b7c;
  }
`;

interface FavoriteMovieProps {
  tmdbId: number; // 영화 ID
}

const FavoriteMovie: React.FC<FavoriteMovieProps> = ({ tmdbId }) => {
  const handleAddFavorite = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const { error } = await supabase
      .from('userdata')
      .upsert({
        user_id: session.user.id,
        movie_id: tmdbId,
        status: 'favorite'
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Failed to update favorite movie:', error.message);
      alert('인생영화 등록에 실패했습니다.');
    } else {
      alert('인생영화로 등록되었습니다.');
    }
  };

  return <FavoriteButton onClick={handleAddFavorite}>인생영화로 등록!</FavoriteButton>;
};

export default FavoriteMovie;