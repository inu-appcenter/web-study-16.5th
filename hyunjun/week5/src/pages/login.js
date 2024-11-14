import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';


function Login({setUsername}) {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', userid);
    console.log('Password:', password);

    const url = 'https://portal.inuappcenter.kr/api/members/login';

    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      "studentId": userid,
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
      if(data.data.accessToken){    //서버로부터 성공 응답으로 액세스토큰을 받은 경우에만 로그인 성공 처리
      localStorage.setItem('loginData', JSON.stringify(data));
        localStorage.setItem('username', userid);
        setUsername(userid);
        alert('로그인 성공');
        navigate(`/`);
      }else{
        alert('[서버 메시지]'+data.msg);
      }
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
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
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
