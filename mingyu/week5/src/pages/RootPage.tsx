import { Link, Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <header>
        <h1>5주차 과제: axios, router, localStorage</h1>
        <Link to="/">메인 페이지</Link>
        <Link to="/login">로그인 페이지</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
