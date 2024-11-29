import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './post.css';

// axios 인스턴스 생성 및 인터셉터 설정
const api = axios.create({
    baseURL: 'https://portal.inuappcenter.kr/api',
    headers: {
        'Accept': '*/*',
    },
});

// Axios 설정 - Request Interceptor 추가
api.interceptors.request.use(
    (config) => {
        const loginData = localStorage.getItem('loginData');
        if (loginData) {
            const accessToken = JSON.parse(loginData).data.accessToken;
            if (accessToken) {
                config.headers['Auth'] = `${accessToken}`; // 헤더에 토큰 추가
            }
        }
        return config;
    },
    (error) => {
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
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);

                setPost(response.data.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleLikeChange = async (e) => {
        const updatedPost = { ...post };
        const newLikeStatus = e.target.checked ? 1 : 0;
        updatedPost.like = newLikeStatus;
        setPost(updatedPost);

        try {
            const response = await api.put(`/posts/${id}/like`, {});

            const editpost = post;
            editpost.isLiked = !editpost.isLiked;
            setPost(editpost);

            console.log('Like status updated successfully:', response.data);
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!post) {
        return <div className="loading">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="posts-page">
            <h1>게시글</h1>
            <div className="post-item">
                <h2>{post.title}</h2>
                <p><strong>카테고리:</strong> {post.category}</p>
                <p><strong>작성자:</strong> {post.writer}</p>
                <p><strong>내용:</strong> {post.content}</p>
                <p><strong>좋아요:</strong>
                    <input
                        type="checkbox"
                        checked={post.isLiked === true}
                        onChange={handleLikeChange}
                    />
                </p>
                <p><strong>스크랩:</strong> {post.scrap}</p>
                <p><strong>조회수:</strong> {post.view}</p>
                <p><strong>댓글 수:</strong> {post.replyCount}</p>
                <p><strong>작성일:</strong> {post.createDate}</p>
                <p><strong>수정일:</strong> {post.modifiedDate}</p>

                {post.bestReplies.length > 0 && (
                    <div>
                        <h3>베스트 댓글</h3>
                        {post.bestReplies.map(reply => (
                            <div key={reply.id} className="reply-item">
                                <p><strong>작성자:</strong> {reply.writer}</p>
                                <p><strong>내용:</strong> {reply.content}</p>
                                <p><strong>좋아요:</strong> {reply.like}</p>
                                <p><strong>작성일:</strong> {reply.createDate}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <h3>댓글들</h3>
                    <div>
                        {post.replies.map(reply => (
                            <div key={reply.id} className="reply-item">
                                <p><strong>작성자:</strong> {reply.writer}</p>
                                <p><strong>내용:</strong> {reply.content}</p>
                                <p><strong>좋아요:</strong> {reply.like}</p>
                                <p><strong>작성일:</strong> {reply.createDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
