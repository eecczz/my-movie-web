// Authentication.js
const users = JSON.parse(localStorage.getItem('users')) || [];

export function tryLogin(email, password, success, fail) {
  const user = users.find(user => user.id === email && user.password === password);
  if (user) {
    localStorage.setItem('TMDb-Key', user.password); // TMDb API 키를 사용자 암호로 저장 (예제 목적)
    success(user);
  } else {
    fail('Invalid credentials');
  }
}

export function tryRegister(email, password, success, fail) {
  const userExists = users.some(existingUser => existingUser.id === email);
  if (!userExists) {
    users.push({ id: email, password });
    localStorage.setItem('users', JSON.stringify(users));
    success();
  } else {
    fail('User already exists');
  }
}
