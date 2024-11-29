import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import BasicCSS from "./BasicCSS";
import StyledComponents from "./StyledComponents";
import Box from "./Box";
import Flex from "./Flex";
import TailwindCSS from "./TailwindCSS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/basiccss" element={<BasicCSS />} />
        <Route path="/styledcomponents" element={<StyledComponents />} />
        <Route path="/box" element={<Box />} />
        <Route path="/flex" element={<Flex />} />
        <Route path="/tailwindcss" element={<TailwindCSS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
