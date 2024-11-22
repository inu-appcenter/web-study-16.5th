import React, { useEffect, useState } from 'react';
import { weatherApi } from './Api';

function Weather() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    weatherApi.get('/api/weathers')  // 엔드포인트 수정
      .then((response) => {
        console.log('API 응답:', response);  // 응답 확인
        if (response?.data) {
          setData(response.data);
        } else {
          setError('잘못된 응답 형식입니다.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);  // 에러 로그 추가
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>날씨</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h1>{item.sky}</h1>
            <p>기온: {item.temperature}°C</p>
            <p>미세먼지: {item.pm10Value} ({item.pm10Grade})</p>
            <p>초미세먼지: {item.pm25Value} ({item.pm25Grade})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;
