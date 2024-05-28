import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "@/apis/supabaseClient";
import { slateDarkA } from "@radix-ui/colors";
import TextArea from "../layout/TextArea";

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
  margin: 1rem;
  border-radius: 20px;
  padding: 15px;
  background: ${slateDarkA.slateA2};
  position: relative;

  .form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .input {
    width: 85%;
  }
`;

const SubmitButton = styled.button`
  font-family: "Pretendard", Pretendard;
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  background-color: ${slateDarkA.slateA12};
  color: black;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${slateDarkA.slateA11};
  }
`;

const CommentsContainer = styled.div`
  margin: 1rem;
  border-radius: 20px;
  padding: 15px;
  background: ${slateDarkA.slateA3};

  .no-comments {
    margin-left: 1rem;
  }
`;

const UserCommentContainer = styled.div`
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid ${slateDarkA.slateA6};
`;

const CommentUser = styled.strong`
  display: block;
  color: ${slateDarkA.slateA12};
  margin-bottom: 5px;
`;

const CommentContent = styled.p`
  white-space: pre-wrap;
  color: ${slateDarkA.slateA12};
  padding-top: 0.5rem;

  .text {
    padding: 0.25rem 0;
  }
`;

const RatingStars = styled.div`
  display: flex;
  margin: 0.25rem 0.5rem;
  cursor: pointer;
`;

const RatingImage = styled.img`
  width: 24px; /* 적절한 크기로 조정 */
  height: 24px; /* 적절한 크기로 조정 */
`;

const Comment: React.FC<CommentProps> = ({ id }) => {
  const fullMoonSrc = "/rating/m5.png";
  const halfMoonSrc = "/rating/m3.png";
  const newMoonSrc = "/rating/m1.png";

  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data: commentsData, error: commentsError } = await supabase
          .from("useritem")
          .select("*")
          .eq("movie_id", parseInt(id, 10));

        if (commentsError) {
          throw new Error(`Failed to fetch comments: ${commentsError.message}`);
        }

        if (commentsData) {
          setComments(commentsData);
        } else {
          console.log("No comments data received or empty array");
        }
      } catch (error) {
        console.error("Error in fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser({ id: session.user.id, email: session.user.email });
      } else {
        setUser(null);
      }
    };

    checkUserSession();
  }, []);

  const handleRatingClick = (index: number) => {
    const newRating =
      rating === index * 2 + 1 ? (index + 1) * 2 : index * 2 + 1;
    setRating(newRating);
  };

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      console.error("User is not logged in.");
      alert("로그인 후 이용해주세요.");
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
        .from("useritem")
        .insert([commentData]);

      if (insertError) {
        throw new Error(`Failed to insert comment: ${insertError.message}`);
      }

      const { data: freshComments, error: fetchError } = await supabase
        .from("useritem")
        .select("*")
        .eq("movie_id", parseInt(id, 10));

      if (fetchError) {
        throw new Error(
          `Failed to fetch updated comments: ${fetchError.message}`
        );
      }

      setComments(freshComments || []);
      setComment("");
      setRating(0);
      alert("댓글이 등록되었습니다.");
    } catch (error) {
      console.error(
        "Failed to submit:",
        error instanceof Error ? error.message : error
      );
      alert(
        `댓글 등록에 실패했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  const displayRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= (i + 1) * 2) {
        stars.push(<RatingImage key={i} src={fullMoonSrc} alt="Full Moon" />);
      } else if (rating === i * 2 + 1) {
        stars.push(<RatingImage key={i} src={halfMoonSrc} alt="Half Moon" />);
      } else {
        stars.push(<RatingImage key={i} src={newMoonSrc} alt="New Moon" />);
      }
    }
    return stars;
  };

  return (
    <>
      <CommentFormContainer onSubmit={handleCommentSubmit}>
        <RatingStars>
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} onClick={() => handleRatingClick(index)}>
              {index * 2 < rating ? (
                index * 2 + 1 === rating ? (
                  <RatingImage src={halfMoonSrc} alt="Half Moon" />
                ) : (
                  <RatingImage src={fullMoonSrc} alt="Full Moon" />
                )
              ) : (
                <RatingImage src={newMoonSrc} alt="New Moon" />
              )}
            </span>
          ))}
          <p></p>
        </RatingStars>
        <div className="form">
          <div className="input">
            <TextArea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                user ? `감상평을 남겨주세요.` : "로그인이 필요합니다."
              }
            />
          </div>
          <SubmitButton type="submit">등록</SubmitButton>
        </div>
      </CommentFormContainer>
      <CommentsContainer>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <UserCommentContainer key={comment.id}>
              <CommentUser>{comment.user_id}</CommentUser>
              <CommentContent>
                {displayRating(comment.rating)}
                <br />
                <p className="text">{comment.comment}</p>
              </CommentContent>
            </UserCommentContainer>
          ))
        ) : (
          <p className="no-comments">
            감상평이 없습니다. 첫 감상평을 남겨주세요 😃
          </p>
        )}
      </CommentsContainer>
    </>
  );
};

export default Comment;
