import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './posts.css';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();  // useNavigate 훅 사용

    useEffect(() => {
        // Fetch posts data from the API
        const fetchPosts = async () => {
            try {
                var loginData = localStorage.getItem('loginData');
                const accessToken = JSON.parse(loginData).data.accessToken;
                console.log(accessToken);

                const response = await fetch('https://portal.inuappcenter.kr/api/posts?page=1', {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `${accessToken}`
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                
                const result = await response.json();
                setPosts(result.data.posts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleClickPost = (id) => {
        // 해당 post의 id를 URL로 전달
        navigate(`/posts/${id}`);  // navigate 사용
    }

    return (
        <div className="posts-page">
            <h1>Posts</h1>
            <ul className="posts-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item" onClick={() => handleClickPost(post.id)}>
                        <h2>{post.title}</h2>
                        <p><strong>Category:</strong> {post.category}</p>
                        <p><strong>Writer:</strong> {post.writer}</p>
                        <p><strong>Content:</strong> {post.content}</p>
                        <p><strong>Created On:</strong> {post.createDate}</p>
                        <p><strong>Last Modified:</strong> {post.modifiedDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;
