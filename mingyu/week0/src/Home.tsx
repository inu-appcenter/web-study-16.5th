import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Button onClick={() => navigate("/kakaomap")}>Kakao Map</Button>
      <Button onClick={() => navigate("/news")}>News</Button>
      <Button onClick={() => navigate("/weather")}>Weather</Button>
      <Button onClick={() => navigate("/kakaomapweather")}>
        KaKao Map Weather
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  min-width: 200px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #336dff;
`;
