import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "pages/RootPage";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import PostPage from "pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
