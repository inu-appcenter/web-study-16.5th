// ------------------------ src/components/Layout.tsx ------------------------ //

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/create-post">Create Post</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* 자식 컴포넌트를 렌더링할 부분 */}
      </main>
    </div>
  );
};

export default Layout;
