import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from './pages/login';
import Posts from './pages/posts';
import Post from './pages/post';

function Layout({ username }) {
  return (
    <div>
      <header>
        <h1>axios, router, localStorage 전부 써보기 !!</h1>
        {username && <p>{username}님 환영합니다!</p>}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/posts">게시글 목록 보기</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storageUserName = localStorage.getItem('loginData');  //사실 accessTokenExpiredTime을 체크해야 하지만.....
    if(storageUserName){
      setUsername(localStorage.getItem('username'));
    }

  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout username={username} />}> 
          <Route path="login" element={<Login setUsername = {setUsername} />} />
          <Route path="posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
