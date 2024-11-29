import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosInstance";

export default function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/members/login", {
        studentId: studentId,
        password: password,
      });
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
