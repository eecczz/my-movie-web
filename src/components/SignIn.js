import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // 공통 스타일

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('authToken', email); // 이메일을 저장하여 사용자 아이디 표시
      navigate('/'); // 로그인 성공 시 /로 이동
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{' '}
        <a href="/my-movie-web/signup">Sign up</a>
      </p>
    </div>
  );
}

export default SignIn;
