import React, { useState } from 'react';
import supabase from '../lib/supabaseClient';
import '../components/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태
  const [userEmail, setUserEmail] = useState(''); // 로그인한 사용자의 이메일을 저장

  const handleLogin = async (e) => {
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
      setUserEmail(data.user.email); // 로그인한 사용자의 이메일 저장
    }
  };

  const handleSignup = async (e) => {
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
    }
  };
  
  

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/images/moon_logo.png" alt="Logo" className="logo" />
        <form>
          <div className="input-group">
            <label className="input-label"><h3>ID</h3></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label className="input-label"><h3>Password</h3></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="button-Login" onClick={handleLogin}>Login</button>
          <button className="button-SignUp" onClick={handleSignup}>Sign Up</button>
        </form>
        {message && <div className="message" onClick={() => setMessage('')}>{message}</div>}
        {userEmail && <div className="session-status">{userEmail}님 환영합니다!</div>}
      </div>
    </div>
  );
};

export default Login;