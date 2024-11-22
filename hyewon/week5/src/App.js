import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Notices from './notices';
import Weather from './weather';

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* 공통 헤더 컴포넌트 */}
      <Routes>
        <Route path="notices" element={<Notices />} />  {}
        <Route path="weather" element={<Weather />} />  {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
