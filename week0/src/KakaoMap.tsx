import styled from "styled-components";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById("mapContainer"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <Container>
      <Title>Kakao Map</Title>
      <MapContainer id="mapContainer" /> 
    </Container>
  );
};

// styled-components로 스타일 정의
const Container = styled.div`
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 20px 0; 
  text-align: center; 
  font-size: 40px
`;

const MapContainer = styled.div`
  flex: 1; 
  width: 100vw; 
`;

export default KakaoMap;
