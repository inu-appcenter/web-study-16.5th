// src/pages/login.js
import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가하세요.
    console.log('Username:', username);
    console.log('Password:', password);

    const url = 'https://portal.inuappcenter.kr/api/members/login';

    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };
    
    const body = JSON.stringify({
      "studentId": username,
      "password": password
    });
    
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      localStorage.setItem('loginData', JSON.stringify(data));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    



  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">로그인</button>
      </form>
    </div>
  );
}

export default Login;
