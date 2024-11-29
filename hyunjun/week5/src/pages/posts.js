import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import

import './posts.css';

// axios 인스턴스 생성 및 인터셉터 설정
const api = axios.create({
    baseURL: 'https://portal.inuappcenter.kr/api',
    headers: {
        'Accept': '*/*',
    },
});

// Axios 설정 - Request Interceptor 추가 (로컬 스토리지의 토큰 추가)
api.interceptors.request.use(
    config => {
        const loginData = localStorage.getItem('loginData');
        if (loginData) {
            const accessToken = JSON.parse(loginData).data.accessToken;
            config.headers['Auth'] = `${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Axios 설정 - Response Interceptor 추가
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어난 경우
            switch (error.response.status) {
                case 401:
                    alert('인증 오류: 로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
                    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                    break;
                case 403:
                    alert('권한 오류: 접근 권한이 없습니다.');
                    break;
                case 404:
                    alert('요청하신 자원을 찾을 수 없습니다.');
                    break;
                case 500:
                    alert('서버 오류: 잠시 후 다시 시도해 주세요.');
                    break;
                default:
                    alert(`오류 발생: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            // 요청이 전송되었지만 응답이 없는 경우
            alert('서버로부터 응답이 없습니다. 네트워크를 확인해 주세요.');
        } else {
            // 요청 설정 중에 발생한 오류
            alert(`요청 오류: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch posts data from the API
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts?page=1');
                setPosts(response.data.data.posts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleClickPost = (id) => {
        navigate(`/posts/${id}`);
    };

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
