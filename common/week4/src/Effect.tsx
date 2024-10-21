import { useState, useEffect, useLayoutEffect } from "react";

// 1. 의존성 배열이 없어서 랜더링 시에 useEffect를 호출하는 컴포넌트
export function NoDependencyEffect() {
  useEffect(() => {
    console.log("NoDependencyEffect: 렌더링마다 실행됩니다.");
  });

  return (
    <div>
      <h3>1. 의존성 배열이 없어서 랜더링 시에 useEffect를 호출하는 컴포넌트</h3>
      <div>NoDependencyEffect Component</div>
    </div>
  );
}

// 2. 빈 의존성 배열이 있어서, 마운트 시에만 useEffect를 호출하는 컴포넌트
export function MountOnlyEffect() {
  useEffect(() => {
    console.log("MountOnlyEffect: 마운트 시에만 실행됩니다.");
  }, []);

  return (
    <div>
      <h3>
        2. 빈 의존성 배열이 있어서, 마운트 시에만 useEffect를 호출하는 컴포넌트
      </h3>
      <div>MountOnlyEffect Component</div>
    </div>
  );
}

// 3. 의존성 배열에 상태가 있어서, 해당 상태가 변경되었을 때만 useEffect를 호출하는 컴포넌트
export function SpecificStateEffect() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("hello");

  useEffect(() => {
    console.log("SpecificStateEffect: count가 변경될 때 실행됩니다.");
  }, [count]);

  return (
    <div>
      <h3>3. 상태가 변경되었을 때 useEffect를 호출하는 컴포넌트</h3>
      <button onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

// 4. 의존성 배열에 props가 있어서, 해당 props가 변경되었을 때만 useEffect를 호출하는 컴포넌트
export function SpecificPropsEffect({ value }: { value: string }) {
  useEffect(() => {
    console.log("SpecificPropsEffect: props value가 변경될 때 실행됩니다.");
  }, [value]);

  return (
    <div>
      <h3>4. props가 변경되었을 때 useEffect를 호출하는 컴포넌트</h3>
      <div>Props value: {value}</div>
    </div>
  );
}

// 5. 정리 함수 return을 포함하여, 사용되는 걸 보여주는 useEffect가 있는 컴포넌트
export function CleanupEffect() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("CleanupEffect: 컴포넌트가 마운트됨.");

    return () => {
      console.log("CleanupEffect: 컴포넌트가 언마운트됨.");
    };
  }, [isVisible]);

  return (
    <div>
      <h3>5. 정리 함수 return을 포함하는 useEffect가 있는 컴포넌트</h3>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <div>컴포넌트가 보이고 있습니다.</div>}
    </div>
  );
}

// 6. useLayoutEffect를 useEffect와 비교하여 보여줄 수 있는 컴포넌트
export function LayoutEffectComparison() {
  useLayoutEffect(() => {
    console.log("useLayoutEffect: 렌더링 후, 화면 그리기 전에 실행");
  });

  useEffect(() => {
    console.log("useEffect: 렌더링 후, 화면이 그려진 후 실행");
  });

  return (
    <div>
      <h3>6. useLayoutEffect를 useEffect와 비교하는 컴포넌트</h3>
      <div>LayoutEffectComparison Component</div>
    </div>
  );
}

// 7. key 변경으로 다시 마운트 되는 것을 보여주는 컴포넌트
export function KeyChangeEffect() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <h3>7. key 변경으로 다시 마운트 되는 것을 보여주는 컴포넌트</h3>
      <button onClick={() => setKey(key + 1)}>Change Key</button>
      <ChildComponent key={key} />
    </div>
  );
}

function ChildComponent() {
  useEffect(() => {
    console.log("ChildComponent: 마운트됨");

    return () => {
      console.log("ChildComponent: 언마운트됨");
    };
  }, []);

  return <div>Child Component with key</div>;
}

// 7-1. 리스트에서 key를 사용하여 렌더링하고 key 변경을 통해 리렌더링되는 예시
export function ListKeyExample() {
  const [items, setItems] = useState([
    { id: 1, value: "First Item" },
    { id: 2, value: "Second Item" },
    { id: 3, value: "Third Item" },
  ]);

  const updateItemKey = () => {
    // 임의의 순서 변경을 위해 아이템의 id를 새로 생성하여 key가 바뀌도록 설정
    const newItems = items.map((item) => ({
      id: item.id + Math.random(), // 새로운 랜덤 id 부여
      value: item.value,
    }));
    setItems(newItems);
  };

  return (
    <div>
      <h3>7-1. 리스트에서 key를 사용하여 리렌더링되는 예시</h3>
      <button onClick={updateItemKey}>Change List Keys</button>
      <ul>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item }: { item: { id: number; value: string } }) {
  useEffect(() => {
    console.log(`ListItem with id: ${item.id} 마운트됨`);

    return () => {
      console.log(`ListItem with id: ${item.id} 언마운트됨`);
    };
  }, [item.id]);

  return <li>{item.value}</li>;
}
