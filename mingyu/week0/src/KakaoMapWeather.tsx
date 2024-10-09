import React, { useState, useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface WeatherData {
  name: string; // 도시 이름
  weather: {
    description: string;
  }[];
  main: {
    temp: number; // 온도
    feels_like: number; // 체감 온도
    humidity: number; // 습도
  };
  wind: {
    speed: number; // 풍속
  };
}

export default function KakaoMapWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [centerLat, setCenterLat] = useState(33.450701); // 지도 중심의 위도
  const [centerLon, setCenterLon] = useState(126.570667); // 지도 중심의 경도

  // 날씨 정보를 가져오는 함수
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setWeatherData(result);
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Kakao 지도 초기화 및 이벤트 처리
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(centerLat, centerLon),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    // 지도 이동 시 중심 좌표를 받아와 날씨를 다시 가져오는 로직
    window.kakao.maps.event.addListener(map, "center_changed", function () {
      const latLng = map.getCenter(); // 지도 중심 좌표
      const lat = latLng.getLat();
      const lon = latLng.getLng();
      setCenterLat(lat); // 중심 좌표의 위도
      setCenterLon(lon); // 중심 좌표의 경도
      fetchWeather(lat, lon); // 새로운 좌표에 대한 날씨 정보 요청
    });

    // 첫 로드 시 날씨 정보 가져오기
    fetchWeather(centerLat, centerLon);
  }, [centerLat, centerLon]);

  return (
    <Container>
      <h1>Kakao Map with Weather</h1>
      <MapContainer id="map"></MapContainer>

      {/* 날씨 정보가 성공적으로 로드된 경우 */}
      {weatherData && (
        <WeatherInfo>
          {/* 로딩 중일 때 */}
          {loading && <div>Loading...</div>}
          {/* 에러 발생 시 */}
          {error && <div>Error: {error}</div>}
          {!loading && !error && (
            <>
              <h2>Weather in {weatherData.name}</h2>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </>
          )}
        </WeatherInfo>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const WeatherInfo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  z-index: 1;
  background-color: white;
  border-radius: 8px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;
