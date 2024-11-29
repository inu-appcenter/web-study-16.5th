import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "services/axiosInstance";

interface DetailPost {
  id: number;
  title: string;
  category: string;
  writer: string;
  content: string;
  like: number;
  isLiked: boolean;
  scrap: number;
  replyCount: number;
  createDate: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  writer: string;
  content: string;
  createDate: string;
}

export default function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<DetailPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${postId}`);
        setPost(response.data.data);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };

    fetchPost();
  }, [postId]);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = async () => {
    if (!post) return;

    try {
      await axiosInstance.put(`/api/posts/${postId}/like`);
      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              isLiked: !prevPost.isLiked,
              like: prevPost.isLiked ? prevPost.like - 1 : prevPost.like + 1,
            }
          : null
      );
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("자신의 게시글에는 추천을 할 수 없습니다.");
      } else {
        console.error("좋아요 요청 실패:", error);
        alert("좋아요 요청 실패");
      }
    }
  };

  if (!post) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>카테고리: {post.category}</p>
      <p>작성자: {post.writer}</p>
      <p>작성일: {new Date(post.createDate).toLocaleDateString()}</p>
      <p>{post.content}</p>
      <p>
        좋아요: {post.like} | 스크랩: {post.scrap} | 댓글: {post.replyCount}
      </p>

      <button onClick={handleLike}>{post.isLiked ? "♥" : "♡"}</button>

      <h2>댓글</h2>
      <ul>
        {post.replies.map((reply) => (
          <li key={reply.id}>
            <p>작성자: {reply.writer}</p>
            <p>{reply.content}</p>
            <p>작성일: {new Date(reply.createDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
