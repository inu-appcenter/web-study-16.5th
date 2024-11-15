// ------------------------ src/api/index.ts ------------------------ //

import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface ApiResponse<T> {
  data: T;
  msg: string;
}

interface LoginResponse {
  token: string;
}

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://portal.inuappcenter.kr/api", // 실제 API 서버 주소로 교체하세요
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor 추가 - 모든 요청에 로컬스토리지의 토큰을 헤더에 공통적으로 추가
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor 추가 - 공통된 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

// 로그인 API 호출 함수 (POST)
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// 모든 게시글 가져오기 (GET)
export const getAllPosts = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/posts");
    return response.data;
  } catch (error) {
    console.error("Error while fetching posts:", error);
    throw error;
  }
};

// 특정 게시글 가져오기 (GET)
export const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching post:", error);
    throw error;
  }
};

// 게시글 좋아요 여부 변경 (PUT)
export const toggleLikePost = async (postId: number): Promise<void> => {
  try {
    const response = await api.put(`/posts/${postId}/like`);
    console.log("Post like toggled:", response.data);
  } catch (error) {
    console.error("Error while toggling like:", error);
    throw error;
  }
};

// 새 게시글 생성하기 (POST)
export const createPost = async (
  title: string,
  content: string
): Promise<Post> => {
  try {
    const response = await api.post<Post>("/posts", { title, content });
    return response.data;
  } catch (error) {
    console.error("Error while creating post:", error);
    throw error;
  }
};
