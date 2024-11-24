import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // 공통 스타일

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Remember Me: 저장된 이메일과 비밀번호를 불러오기
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('authToken', email); // 이메일을 저장하여 사용자 아이디 표시
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }
      toast.success('로그인 성공!', { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/'), 2000); // 로그인 성공 시 /로 이동
    } else {
      toast.error('이메일 또는 비밀번호가 잘못되었습니다.', { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button type="submit" className="auth-button">
          로그인
        </button>
      </form>
      <p>
      계정이 없으신가요?{' '}
        <span
          className="auth-link"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </span>
      </p>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
