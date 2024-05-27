import React, { useState, SyntheticEvent } from "react";
import styled from "styled-components";
import supabase from "../../apis/supabaseClient";
import { signIn, signUp } from "@/apis/auth";
import { getUserName } from "@/apis/userinfo";
import { useRouter } from "next/router";
import TextArea from "../layout/TextArea";
import { slate, orange } from "@radix-ui/colors";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FormContainer = styled.div`
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  .input-group {
    margin: 0.5rem;
    padding-left: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  .terms {
    font-size: 0.75rem;
    font-weight: 300;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }
`;

const ButtonSignUp = styled.button`
  margin: 0rem 1rem 2rem 1rem;
  padding: 0.75rem;
  background-color: ${slate.slate1};
  color: ${slate.slate12};
  border: none;
  border-radius: 13px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  font-size: 18px;
  font-weight: 600;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const Message = styled.div`
  color: ${slate.slate12};
  background-color: ${orange.orange3};
  border: 2px solid ${orange.orange5};
  padding: 10px;
  border-radius: 8px;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
`;

const SessionStatus = styled.div`
  color: green;
  background-color: #ccffcc;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
`;

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 추가: 비밀번호 확인 상태 추가
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState<string | null>();

  // 추가: 비밀번호 확인 함수
  const isPasswordConfirmed = () => {
    return password === confirmPassword;
  };

  const handleSignUp = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isPasswordConfirmed()) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signUpResult = await signUp(email, password);
    if (signUpResult) {
      setMessage("회원 가입이 완료되었습니다!");
      setUserName(email);
      router.reload();
    } else {
      setMessage(`회원 가입에 실패했습니다`);
    }
  };

  return (
    <LoginContainer>
      {message && <Message onClick={() => setMessage("")}>{message}</Message>}
      <FormContainer>
        <form>
          <div className="input-group">
            <TextArea
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
          </div>
          <div className="input-group">
            <TextArea
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <div className="input-group">
            <TextArea
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 변경: confirmPassword 상태 업데이트
              placeholder="비밀번호 확인"
            />
          </div>
          <div
            className="terms"
            onClick={() =>
              window.open(
                "https://inblog.ai/dalflix/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4-%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8-20739"
              )
            }
          >
            계속하여 서비스 이용 약관 및 개인정보 취급방침에 동의합니다.
          </div>
          <ButtonSignUp onClick={handleSignUp}>회원가입</ButtonSignUp>
        </form>
      </FormContainer>
      {userName && <SessionStatus>{userName}님 환영합니다!</SessionStatus>}
    </LoginContainer>
  );
};

export default SignUp;
