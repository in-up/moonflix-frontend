// components/Comment.tsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '@/apis/supabaseClient';

interface CommentProps {
  id: string;
}

interface Comment {
  id: number;
  user_id: string;
  movie_id: number;
  comment: string;
  rating: number;
  created_at: string;
}

const CommentFormContainer = styled.form`
  margin-top: 20px;
  border: 1px solid #78798c;
  border-radius: 8px;
  padding: 15px;
  background: #37384e;
  position: relative;
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

const CommentsContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #78798c;
  border-radius: 8px;
  padding: 15px;
  background: #37384e;
`;

const UserCommentContainer = styled.div`
  background-color: #78798c;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const Comment: React.FC<CommentProps> = ({ id }) => {
  const fullMoon = '🌕';
  const halfMoon = '🌗';
  const newMoon = '🌑';

  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data: commentsData, error: commentsError } = await supabase
          .from('useritem')
          .select('*')
          .eq('movie_id', parseInt(id, 10));

        if (commentsError) {
          throw new Error(`Failed to fetch comments: ${commentsError.message}`);
        }

        if (commentsData && commentsData.length > 0) {
          setComments(commentsData);
        } else {
          console.log('No comments data received or empty array');
        }
      } catch (error) {
        console.error('Error in fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleRatingClick = (index: number) => {
    const newRating = rating === (index * 2 + 1) ? (index + 1) * 2 : (index * 2 + 1);
    setRating(newRating);
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
      console.error('User is not logged in.');
      alert('로그인 후 이용해주세요.');
      return;
    }

    const commentData = {
      user_id: session.user.id,
      movie_id: parseInt(id, 10),
      comment,
      rating,
    };

    try {
      const { data: insertData, error: insertError } = await supabase
        .from('useritem')
        .insert([commentData]);

      if (insertError) {
        throw new Error(`Failed to insert comment: ${insertError.message}`);
      }

      const { data: freshComments, error: fetchError } = await supabase
        .from('useritem')
        .select('*')
        .eq('movie_id', parseInt(id, 10));

      if (fetchError) {
        throw new Error(`Failed to fetch updated comments: ${fetchError.message}`);
      }

      setComments(freshComments || []);
      setComment('');
      setRating(0);
      alert('댓글이 등록되었습니다.');
    } catch (error) {
      console.error('Failed to submit:', error instanceof Error ? error.message : error);
      alert(`댓글 등록에 실패했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    }
  };
  
    const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user) {
        setUser({ id: session.user.id, email: session.user.email });
    } else {
        setUser(null);
    }
    };

    checkUserSession();

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

  return (
    <>
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
          comments.map(comment => (
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
          <p>No comments available</p>
        )}
      </CommentsContainer>
    </>
  );
};

export default Comment;
