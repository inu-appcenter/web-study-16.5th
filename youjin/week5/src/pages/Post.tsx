import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PostType {
  id: number;
  title: string;
  content: string;
}

interface PostProps {
  posts: PostType[]; // posts를 props로 받음
}

const PostPage: React.FC<PostProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = posts.find((post) => post.id === Number(id));
      setPost(foundPost || null);
    }
  }, [id, posts]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
