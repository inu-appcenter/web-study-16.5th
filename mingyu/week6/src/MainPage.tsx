import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>MainPage</h1>
      <button
        onClick={() => {
          navigate("/basiccss");
        }}
      >
        BasicCSS
      </button>
      <button
        onClick={() => {
          navigate("/styledcomponents");
        }}
      >
        StyledComponents
      </button>
      <button
        onClick={() => {
          navigate("/box");
        }}
      >
        Box
      </button>
      <button
        onClick={() => {
          navigate("/flex");
        }}
      >
        Flex
      </button>
      <button
        onClick={() => {
          navigate("/tailwindcss");
        }}
      >
        TailwindCSS
      </button>
    </div>
  );
}
