import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // 공통 스타일

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreeTerms) {
      setError('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.email === email)) {
      setError('이미 등록된 이메일입니다.');
      return;
    }

    const apiKey = '62d0f52db114343391086b1cca730cef'; // 실제 TMDB API 키를 여기에 입력
    const newUser = { email, password: apiKey }; // API 키를 비밀번호로 저장
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    toast.success('회원가입이 완료되었습니다!');
    setTimeout(() => navigate('/my-movie-web/signin'), 3000); // 3초 후 로그인 페이지로 이동
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="terms-container">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            id="terms"
            required
          />
          <label htmlFor="terms">약관에 동의합니다.</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="signup-button">회원가입</button>
      </form>
      <p>
        이미 계정이 있으신가요?{' '}
        <a href="/my-movie-web/signin">로그인</a>
      </p>
    </div>
  );
}

export default SignUp;
