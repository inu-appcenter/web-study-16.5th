import axios from 'axios';

// 공통 인터셉터 함수
const applyInterceptors = (apiInstance) => {
  // Request Interceptor
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('토큰 만료됨, 로그인 페이지로 이동');
          window.location.href = '/login'; // 로그인 페이지로 리디렉션
        } else {
          // 다른 HTTP 오류 처리
          console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else {
        // 네트워크 에러 처리
        console.error('Network error occurred');
      }
      return Promise.reject(error);
    }
  );
};

// 공지사항 관련 API 인스턴스
const noticesApi = axios.create({
  baseURL: 'https://portal.inuappcenter.kr'
});

// 날씨 관련 API 인스턴스
const weatherApi = axios.create({
  baseURL: 'https://portal.inuappcenter.kr'
});

// 공통 인터셉터 적용
applyInterceptors(noticesApi);
applyInterceptors(weatherApi);

export { noticesApi, weatherApi };
