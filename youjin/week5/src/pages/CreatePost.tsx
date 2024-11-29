// ------------------------ src/pages/CreatePost.tsx ------------------------ //

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

interface CreatePostProps {
  addPost: (newPost: { id: number; title: string; content: string }) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    try {
      const newPost = { id: Date.now(), title, content }; // 로컬 환경에서는 직접 새 게시글 생성
      console.log('Post created successfully:', newPost); // 게시글 생성 결과 확인
      addPost(newPost);
      
      // 로컬스토리지에 저장 (중복 저장 방지)
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const isPostExists = existingPosts.some((post: { id: number }) => post.id === newPost.id);
      if (!isPostExists) {
        const updatedPosts = [...existingPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
      }
      
      // 페이지 이동
      navigate('/posts'); // 게시글 작성 후 게시글 목록 페이지로 이동
    } catch (error) {
      console.error('Error while creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
