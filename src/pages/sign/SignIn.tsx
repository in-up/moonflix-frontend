import React, { useState, SyntheticEvent } from "react";
import styled from "styled-components";
import supabase from "../../apis/supabaseClient";
import { signIn, signUp } from "@/apis/auth";
import { getUserName } from "@/apis/auth";
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
`;

const ButtonLogin = styled.button`
  margin: 2rem 1rem;
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

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState<string | null>();

  const handleSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();

    const signInResult = await signIn(email, password);
    if (signInResult) {
      const name = await getUserName();
      console.log("이름: " + name);
      if (name === null || name === undefined) {
        router.push("/sign/first");
      } else {
        router.push("/");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setMessage(error?.message ? error.message + "!" : "다시 시도해주세요.");
    }
  };

  return (
    <LoginContainer>
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
          <ButtonLogin onClick={handleSignIn}>로그인</ButtonLogin>
        </form>
      </FormContainer>
      {message && <Message onClick={() => setMessage("")}>{message}</Message>}
    </LoginContainer>
  );
};

export default SignIn;
