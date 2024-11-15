// ------------------------ src/pages/Posts.tsx ------------------------ //

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api'; // API 호출 함수 import

interface Post {
  id: number;
  title: string;
  content: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    // 게시글 데이터를 가져오는 비동기 함수
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(); // API 호출로 모든 게시글 가져오기
        console.log('Fetched posts:', data); // 데이터 확인을 위해 콘솔에 출력
        if (data.length === 0) {
          console.warn('No posts found on the server.');
        }
        const updatedPosts = [...posts, ...data];
        setPosts(updatedPosts); // 상태에 게시글 데이터 설정
        localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬스토리지에 게시글 저장
      } catch (error) {
        console.error('Error while fetching posts:', error); // 오류 발생 시 콘솔에 출력
      }
    };

    fetchPosts(); // 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 게시글 삭제 함수
  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬스토리지에 업데이트된 게시글 저장
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link> {/* 각 게시글로 이동할 수 있는 링크 */}
              <button onClick={() => handleDeletePost(post.id)}>Delete</button> {/* 게시글 삭제 버튼 */}
            </li>
          ))
        ) : (
          <div>No posts available. Please create a new post or check your network connection.</div> // 게시글이 없을 경우 메시지
        )}
      </ul>
    </div>
  );
};

export default Posts;
