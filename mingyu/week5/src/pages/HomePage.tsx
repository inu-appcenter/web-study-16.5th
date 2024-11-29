import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosInstance";

interface Post {
  id: number;
  title: string;
  category: string;
  writer: string;
  content: string;
  like: number;
  scrap: number;
  replyCount: number;
}

export default function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts?page=${page}`);
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>게시글 목록</h1>
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          이전 페이지
        </button>
        <span>페이지 {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>다음 페이지</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.writer}</p>
            <p>
              좋아요: {post.like} 스크랩: {post.scrap} 댓글: {post.replyCount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
