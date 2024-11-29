import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://portal.inuappcenter.kr",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Auth"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 현재 경로가 /login이 아닐 때만 처리
      if (window.location.pathname !== "/login") {
        alert("토큰 만료");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
