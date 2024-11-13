import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Login from './pages/login'
import Posts from './pages/posts'

function Layout() {
  return (
    <div>
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">로그인</a></li>
            <li><a href="/posts">게시글 목록 보기</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* 자식 라우트가 여기 렌더링됩니다. */}
      </main>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
