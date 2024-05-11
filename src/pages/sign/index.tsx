import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import supabase from '../../apis/supabaseClient';
import { useRouter } from 'next/router';

const PageContainer = styled.div`
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
  background: url('/images/background_login.png') no-repeat center center fixed; 
  background-size: cover;
`;

// 로고 스타일
const Logo = styled.img`
  display: block;
  width: 250px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-top: 50px;
`;

// 로그인 컨테이너 스타일
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const InputLabel = styled.label`
  background-color: #f0e68c;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 10px;
  width: 50%;
  margin-right: 1%; /* 간격 유지 */
  box-shadow: 0px 2px 5px 0px black;
`;

const InputTitle = styled.h3`
  font-weight: 500;
  text-align: left;
  padding: 0;
  margin-left: 5px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: 'Inter', sans-serif;
`;

const InputField = styled.input`
  width: 55%;
`;

const ButtonLogin = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  background-color: #395a7a;
  color: #f1f3f5;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px black;
  transition: transform 0.3s ease-in-out;
`;

const ButtonSignUp = styled.button`
  width: 30%;
  padding: 3px;
  margin-top: 20px;
  background-color: #8097a6;
  color: #f1f3f5;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px black;
  transition: transform 0.3s ease-in-out;
`;

const Message = styled.div`
  color: #ffffff;
  background-color: #333333;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
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

const Sign = () => {
  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState<string | undefined>('');

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Login error', error);
      setMessage('로그인에 실패했습니다.');
    } else {
      console.log('User logged in', data);
      setMessage('로그인이 완료되었습니다!');
      setUserEmail(data?.user?.email); // 로그인한 사용자의 이메일 저장
    }
  };

  const handleSignup = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Signup error', error);
      if (error.message.includes("rate limit")) {
        setMessage('회원 가입 시도가 너무 자주 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setMessage(`회원 가입에 실패했습니다: ${error.message}`);
      }
    } else {
      console.log('User signed up', data);
      setMessage('회원 가입이 완료되었습니다!');
      setUserEmail(data?.user?.email); // 회원 가입 후 자동 로그인 처리
    }
  };
  
  // Sign 페이지로 이동하는 함수
  const goToSignPage = () => {
    router.push('/Sign');
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Logo src="/images/moon_logo.png" alt="Logo" />
        <form>
          <div className="input-group">
            <InputLabel><InputTitle>ID</InputTitle></InputLabel>
            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <InputLabel><InputTitle>Password</InputTitle></InputLabel>
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <ButtonLogin onClick={handleLogin}>Login</ButtonLogin>
          <ButtonSignUp onClick={handleSignup}>Sign Up</ButtonSignUp>
        </form>
        {message && <Message onClick={() => setMessage('')}>{message}</Message>}
        {userEmail && <SessionStatus>{userEmail}님 환영합니다!</SessionStatus>}
        <button onClick={goToSignPage}>Go to Sign page</button> {/* 페이지 이동 버튼 */}
      </LoginContainer>
    </PageContainer>
  );
};

export default Sign;