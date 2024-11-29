import "./BasicCSS.css";

export default function BasicCSS() {
  return (
    <div>
      <h1>BasicCSS</h1>
      <button>버튼 1</button>
      <button className="button2">버튼 2</button>
      <button id="button3">버튼 3</button>
      <button className="button4">버튼 4</button>
      <div className="buttons-wrapper">
        <button className="button4">버튼 4 ?</button>
      </div>
      <button style={{ backgroundColor: "red" }}>버튼 5</button>
    </div>
  );
}
