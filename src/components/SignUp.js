import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // 공통 스타일

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.email === email)) {
      setError('Email is already registered.');
      return;
    }

    const apiKey = '62d0f52db114343391086b1cca730cef'; // 실제 TMDB API 키를 여기에 입력
    const newUser = { email, password: apiKey }; // API 키를 비밀번호로 저장
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    navigate('/my-movie-web/signin'); // 회원가입 성공 시 /my-movie-web/signin으로 이동
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <a href="/my-movie-web/signin">Log in</a> {/* 로그인 버튼 클릭 시 /my-movie-web/signin으로 이동 */}
      </p>
    </div>
  );
}

export default SignUp;
