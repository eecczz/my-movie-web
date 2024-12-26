import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 중복 요청 방지 상태
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL; // 카카오 로그인 페이지로 리다이렉트
  };

  const validateTokenAndFetchUserInfo = async (accessToken) => {
    try {
      // 토큰 유효성 검증
      const tokenValidationResponse = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!tokenValidationResponse.ok) {
        const errorData = await tokenValidationResponse.json();
        console.error('토큰 유효성 검증 실패:', errorData);
        toast.error('토큰이 유효하지 않습니다. 다시 로그인하세요.', { position: 'top-center' });
        handleLogout();
        return;
      }

      console.log('토큰 유효성 검증 성공');

      // 사용자 정보 조회
      const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error('유저 정보 요청 실패:', errorData);
        toast.error('유저 정보 요청 실패.', { position: 'top-center' });
        return;
      }

      const userData = await userResponse.json();
      console.log('카카오 유저 정보:', userData);

      // 사용자 정보 검증
      const nickname = userData?.kakao_account?.profile?.nickname;
      const userId = userData?.id;

      if (!nickname || !userId) {
        console.error('유효하지 않은 사용자 데이터:', userData);
        toast.error('유효하지 않은 사용자 데이터입니다.', { position: 'top-center' });
        return;
      }

      // 로그인 상태 저장
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('userInfo', JSON.stringify(userData));

      // 성공 메시지 출력
      toast.success(`환영합니다, ${nickname}님!`, { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('로그인 및 회원 정보 검증 중 오류:', error);
      toast.error('로그인 및 회원 정보 검증 중 오류가 발생했습니다.', { position: 'top-center' });
    }
  };

  const handleKakaoRedirect = async (code) => {
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    if (isProcessing) return; // 중복 요청 방지
    setIsProcessing(true);

    try {
      const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: K_REST_API_KEY,
          redirect_uri: K_REDIRECT_URI,
          code: code,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('카카오 토큰 요청 실패:', errorData);
        toast.error('카카오 토큰 요청 실패.', { position: 'top-center' });
        return;
      }

      const tokenData = await tokenResponse.json();
      console.log('토큰 데이터:', tokenData);

      if (tokenData.access_token) {
        await validateTokenAndFetchUserInfo(tokenData.access_token); // 검증 및 사용자 정보 가져오기
      }
    } catch (error) {
      console.error('카카오 로그인 처리 오류:', error);
      toast.error('카카오 로그인 처리 오류.', { position: 'top-center' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    toast.info('로그아웃 되었습니다.', { position: 'top-center', autoClose: 2000 });
    navigate('/signin');
  };

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const code = urlParams.searchParams.get('code');

    console.log('인가 코드:', code); // 디버깅 로그

    if (code) {
      handleKakaoRedirect(code);
      // 인가 코드 사용 후 URL에서 제거
      window.history.replaceState({}, document.title, '/my-movie-web/signin');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('authToken', email);
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }
      toast.success('로그인 성공!', { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/'), 2000);
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
        <button type="submit" className="auth-button">로그인</button>
      </form>
      <button onClick={handleKakaoLogin} className="auth-button">카카오로 로그인</button>
      <p>
        계정이 없으신가요?{' '}
        <span
          className="auth-link"
          onClick={() => {
            navigate('/signup');
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
