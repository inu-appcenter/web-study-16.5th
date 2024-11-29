import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>My Web Site</h1>
      <h2>Welcome to My Web Site!</h2>
      <p>공지사항과 날씨를 확인해보세요.</p>
      <nav>
        <ul>
          <li><Link to="/notices">공지사항</Link></li>
          <li><Link to="/weather">날씨</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
