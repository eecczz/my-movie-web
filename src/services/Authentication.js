// Authentication.js
const USERS_KEY = 'users';
const AUTH_USER_KEY = 'auth-user';
const TMDB_KEY_STORAGE = 'TMDB_API_KEY'; // 이름도 명확하게

const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export function tryLogin(email, password, success, fail) {
  const user = users.find(u => u.id === email && u.password === password);

  if (!user) {
    fail('Invalid credentials');
    return;
  }

  // 로그인 상태만 저장 (TMDB 키랑 분리)
  localStorage.setItem(AUTH_USER_KEY, user.id);
  success({ id: user.id });
}

export function tryRegister(email, password, success, fail) {
  const userExists = users.some(u => u.id === email);

  if (userExists) {
    fail('User already exists');
    return;
  }

  users.push({ id: email, password }); // 데모니까 단순 저장(실서비스면 절대 X)
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  success();
}

// TMDB 키는 로그인/비밀번호와 별도로 관리
export function setTmdbApiKey(apiKey) {
  localStorage.setItem(TMDB_KEY_STORAGE, (apiKey || '').trim());
}

export function getTmdbApiKey() {
  return localStorage.getItem(TMDB_KEY_STORAGE) || '';
}

export function logout() {
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getLoggedInUser() {
  return localStorage.getItem(AUTH_USER_KEY); // 없으면 null
}
