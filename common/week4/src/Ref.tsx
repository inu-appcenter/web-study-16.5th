import { useRef } from "react";

// 1. useRef로 DOM 요소에 접근하는 예시
export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // input 요소에 포커스를 설정
    }
  };

  return (
    <div>
      <h3>useRef로 DOM 요소에 접근하는 예시 (FocusInput)</h3>
      <input ref={inputRef} type="text" placeholder="Focus me!" />
      <button onClick={handleFocus}>Set Focus</button>
    </div>
  );
}

// 2. useRef로 렌더링을 유발하지 않는 값 저장하는 예시
export function RefCounter() {
  const refCount = useRef(0); // 렌더링 수를 저장

  return (
    <div>
      <h3>useRef로 렌더링을 유발하지 않는 값 저장 (RefCounter)</h3>
      <p>refCount: {refCount.current}</p>
      <button onClick={() => (refCount.current += 1)}>Increment Count</button>
      <button onClick={() => alert(refCount.current)}>Alert Count</button>
    </div>
  );
}
