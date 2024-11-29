import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostPage from './pages/Post';
import CreatePost from './pages/CreatePost';

interface PostType {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const addPost = (newPost: PostType) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts" element={<Posts />} /> {/* Posts 컴포넌트로 props 전달 제거 */}
          <Route path="post/:id" element={<PostPage posts={posts} />} />
          <Route path="create-post" element={<CreatePost addPost={addPost} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
