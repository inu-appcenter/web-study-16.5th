import React, { useState, useEffect } from "react";

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

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState("37.5665"); // 기본 위도 (서울)
  const [lon, setLon] = useState("126.9780"); // 기본 경도 (서울)

  const fetchWeather = async (lat: string, lon: string) => {
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

  // 컴포넌트가 마운트될 때 기본 위치에 대한 날씨 정보를 가져옴
  useEffect(() => {
    fetchWeather(lat, lon);
  }, [lat, lon]);

  const handleSubmit = () => {
    fetchWeather(lat, lon); // 사용자가 입력한 위도와 경도로 날씨 정보 조회
  };

  return (
    <div>
      <h1>Weather</h1>

      {/* 위도와 경도 입력 폼 */}
      <div>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Enter longitude"
        />
        <button onClick={handleSubmit}>Get Weather</button>
      </div>

      {/* 로딩 중일 때 */}
      {loading && <div>Loading...</div>}

      {/* 에러 발생 시 */}
      {error && <div>Error: {error}</div>}

      {/* 날씨 정보가 성공적으로 로드된 경우 */}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
