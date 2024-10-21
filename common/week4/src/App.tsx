import { useState } from "react";
import { Counter, MyInput, MyCheckbox, Form, MemberList } from "./State";
import {
  NoDependencyEffect,
  MountOnlyEffect,
  SpecificStateEffect,
  SpecificPropsEffect,
  CleanupEffect,
  LayoutEffectComparison,
  KeyChangeEffect,
  ListKeyExample,
} from "./Effect";
import { FocusInput, RefCounter } from "./Ref";
import "./App.css";

function App() {
  const [selectedStateComponent, setSelectedStateComponent] =
    useState<string>("");
  const [selectedEffectComponent, setSelectedEffectComponent] =
    useState<string>("");
  const [selectedRefComponent, setSelectedRefComponent] = useState<string>("");

  // useState 관련 컴포넌트 옵션 리스트
  const stateComponents = [
    { label: "Counter", value: "Counter" },
    { label: "MyInput", value: "MyInput" },
    { label: "MyCheckbox", value: "MyCheckbox" },
    { label: "Form", value: "Form" },
    { label: "MemberList", value: "MemberList" },
  ];

  // useEffect 관련 컴포넌트 옵션 리스트
  const effectComponents = [
    { label: "NoDependencyEffect", value: "NoDependencyEffect" },
    { label: "MountOnlyEffect", value: "MountOnlyEffect" },
    { label: "SpecificStateEffect", value: "SpecificStateEffect" },
    { label: "SpecificPropsEffect", value: "SpecificPropsEffect" },
    { label: "CleanupEffect", value: "CleanupEffect" },
    { label: "LayoutEffectComparison", value: "LayoutEffectComparison" },
    { label: "KeyChangeEffect", value: "KeyChangeEffect" },
    { label: "ListKeyExample", value: "ListKeyExample" },
  ];

  // useRef 관련 컴포넌트 옵션 리스트
  const refComponents = [
    { label: "FocusInput", value: "FocusInput" },
    { label: "RefCounter", value: "RefCounter" },
  ];

  // 선택한 useState 컴포넌트를 렌더링하는 함수
  const renderSelectedStateComponent = () => {
    switch (selectedStateComponent) {
      case "Counter":
        return <Counter />;
      case "MyInput":
        return <MyInput />;
      case "MyCheckbox":
        return <MyCheckbox />;
      case "Form":
        return <Form />;
      case "MemberList":
        return <MemberList />;
      default:
        return <p>Please select a useState component to display.</p>;
    }
  };

  // 선택한 useEffect 컴포넌트를 렌더링하는 함수
  const renderSelectedEffectComponent = () => {
    switch (selectedEffectComponent) {
      case "NoDependencyEffect":
        return <NoDependencyEffect />;
      case "MountOnlyEffect":
        return <MountOnlyEffect />;
      case "SpecificStateEffect":
        return <SpecificStateEffect />;
      case "SpecificPropsEffect":
        return <SpecificPropsEffect value="Test Value" />;
      case "CleanupEffect":
        return <CleanupEffect />;
      case "LayoutEffectComparison":
        return <LayoutEffectComparison />;
      case "KeyChangeEffect":
        return <KeyChangeEffect />;
      case "ListKeyExample":
        return <ListKeyExample />;
      default:
        return <p>Please select a useEffect component to display.</p>;
    }
  };

  // 선택한 useRef 컴포넌트를 렌더링하는 함수
  const renderSelectedRefComponent = () => {
    switch (selectedRefComponent) {
      case "FocusInput":
        return <FocusInput />;
      case "RefCounter":
        return <RefCounter />;
      default:
        return <p>Please select a useRef component to display.</p>;
    }
  };

  return (
    <div className="App">
      <h1>Hooks & Life Cycle Examples</h1>

      {/* useState */}
      <h2>useState Components</h2>
      <select
        onChange={(e) => setSelectedStateComponent(e.target.value)}
        value={selectedStateComponent}
      >
        <option value="">-- Select useState Component --</option>
        {stateComponents.map((comp) => (
          <option key={comp.value} value={comp.value}>
            {comp.label}
          </option>
        ))}
      </select>

      {/* 선택한 useState 컴포넌트 렌더링 */}
      <div className="component-display">{renderSelectedStateComponent()}</div>

      {/* useEffect */}
      <h2>useEffect Components</h2>
      <select
        onChange={(e) => setSelectedEffectComponent(e.target.value)}
        value={selectedEffectComponent}
      >
        <option value="">-- Select useEffect Component --</option>
        {effectComponents.map((comp) => (
          <option key={comp.value} value={comp.value}>
            {comp.label}
          </option>
        ))}
      </select>

      {/* 선택한 useEffect 컴포넌트 렌더링 */}
      <div className="component-display">{renderSelectedEffectComponent()}</div>

      {/* useRef */}
      <h2>useRef Components</h2>
      <select
        onChange={(e) => setSelectedRefComponent(e.target.value)}
        value={selectedRefComponent}
      >
        <option value="">-- Select useRef Component --</option>
        {refComponents.map((comp) => (
          <option key={comp.value} value={comp.value}>
            {comp.label}
          </option>
        ))}
      </select>

      {/* 선택한 useRef 컴포넌트 렌더링 */}
      <div className="component-display">{renderSelectedRefComponent()}</div>
    </div>
  );
}

export default App;
