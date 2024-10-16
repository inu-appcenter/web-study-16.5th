import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import KakaoMap from "./KakaoMap";
import News from "./News";
import Weather from "./Weather";
import KakaoMapWeather from "./KakaoMapWeather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kakaomap" element={<KakaoMap />} />
          <Route path="/news" element={<News />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/kakaomapweather" element={<KakaoMapWeather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
