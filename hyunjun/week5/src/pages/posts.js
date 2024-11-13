import React, { useState, useEffect } from 'react';
import './posts.css';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts data from an API or database (mocked here)
        const fetchPosts = async () => {
            // Simulated data fetching
            const data = [
                { id: 1, title: 'First Post', content: 'This is the first post.' },
                { id: 2, title: 'Second Post', content: 'This is the second post.' },
                { id: 3, title: 'Third Post', content: 'This is the third post.' }
            ];
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="posts-page">
            <h1>Posts</h1>
            <ul className="posts-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;