import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* ----------------------header부분----------------------------- */}
  
      <div className="header">
        <ul className="header-left">
          <li><a href="#">Google 정보</a></li>
          <li><a href="#">스토어</a></li>
        </ul>

        <ul className="header-right">
          <li><a href="#">Gmail</a></li>
          <li><a href="#">이미지</a></li>
          <li>
            <a href="#">
            <button className="btn1" title="Google 앱">
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
            </a>
          </li>
          <li>
            <a href="#">
              <button className="btn2" title="Google 계정">YJ</button>
            </a>
          </li>
        </ul>
      </div>

      {/* ----------------------main부분----------------------------- */}
      <div className="main">
        <h1>
          <span>GGU</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
        </h1>

        <form role="search">
          <i className="bi bi-search"></i>
          <input className="search-bar" type="search" title="검색" />
          <i className="bi bi-keyboard-fill"></i>
          <img src="/googleMike.png" alt="음성" className="mike" />
        </form>

        <div className="buttons">
          <button className="google-btn"><a href="#">Google 검색</a></button>
          <button className="google-btn"><a href="#">I'm Feeling Lucky</a></button>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default App;
