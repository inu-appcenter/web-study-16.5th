import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './post.css';

const PostsPage = () => {
    const [post, setPost] = useState(null); // 단일 게시글 정보를 저장할 상태로 변경
    const { id } = useParams(); // URL에서 동적 파라미터를 가져옵니다.
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        // Fetch posts data from the API
        const fetchPost = async () => {
            try {
                const loginData = localStorage.getItem('loginData');
                const accessToken = JSON.parse(loginData).data.accessToken;
                console.log(accessToken);

                const response = await fetch(`https://portal.inuappcenter.kr/api/posts/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Auth': `${accessToken}`, // Authorization 헤더 사용
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setPost(result.data); // 가져온 데이터를 state에 설정
                console.log(result);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchPost();
    }, [id]); // id가 변경될 때마다 다시 실행

    const handleLikeChange = async (e) => {
        const updatedPost = { ...post };
        const newLikeStatus = e.target.checked ? 1 : 0;
        updatedPost.like = newLikeStatus;
        setPost(updatedPost); // 체크박스를 업데이트하여 UI에 반영

        try {
            const loginData = localStorage.getItem('loginData');
            const accessToken = JSON.parse(loginData).data.accessToken;
            console.log(accessToken);

            const response = await fetch(`https://portal.inuappcenter.kr/api/posts/${id}/like`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Auth': `${accessToken}`, // Authorization 헤더 사용
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            
            const editpost = post;
            editpost.isLiked = !editpost.isLiked;
            setPost(editpost);

            // 서버에서 응답을 받으면 (예: 응답 결과에 대한 처리 등) 추가적으로 할 작업이 있다면 여기서 처리
            console.log('Like status updated successfully');
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>; // 데이터를 가져오기 전에 로딩 표시
    }

    if (!post) {
        return <div className="loading">게시글을 찾을 수 없습니다.</div>; // 오류 상태 표시
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
                        checked={post.isLiked === true} // 좋아요가 true이면 체크박스가 체크됨
                        onChange={handleLikeChange} // 체크박스 상태 변화 시 handleLikeChange 호출
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
