import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { noticesApi } from './Api';

function Notices() {
  const { id } = useParams();  // URL에서 `id` 가져오기
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);  // 공지사항 디테일을 저장할 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      noticesApi.get(`/api/notices/top`)
        .then((response) => {
          if (response?.data) {
            setPost(response.data.data);
          } else {
            setError('잘못된 응답 형식입니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);  // 에러 로그 추가
          setError('게시글을 불러오는 중 오류가 발생했습니다.');
        });
    setLoading(false)
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>공지사항</h2>
      <ul>
        {post.map((item) => (
          <li key={item.id}>
            <Link to={`/notices/${item.id}`}>{item.title}</Link>
            
            {item.url && (
              <p>
                <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">관련 링크</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notices;
