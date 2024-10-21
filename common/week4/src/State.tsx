import { useState } from "react";

// 숫자
export function Counter() {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useState<number>(0); // 타입 지정 가능!

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h3>숫자 (Counter)</h3>
      {/* 함수 참조를 전달 */}
      <button onClick={handleClick}>You pressed me {count} times</button>{" "}
      {/* 인라인 함수 */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// 문자열
export function MyInput() {
  const [text, setText] = useState<string>("hello");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <div>
      <h3>문자열 (MyInput)</h3>
      <input value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
      <button onClick={() => setText("hello")}>Reset</button>
    </div>
  );
}

// boolean
export function MyCheckbox() {
  const [liked, setLiked] = useState<boolean>(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLiked(e.target.checked);
  }

  return (
    <div>
      <h3>boolean (MyCheckbox)</h3>
      <label>
        <input type="checkbox" checked={liked} onChange={handleChange} />I liked
        this
      </label>
      <p>You {liked ? "liked" : "did not like"} this.</p>
    </div>
  );
}

// 한 컴포넌트에 두 개 이상의 state 변수 선언
export function Form() {
  const [name, setName] = useState("Taylor");
  const [age, setAge] = useState(42);

  return (
    <div>
      <h3>한 컴포넌트에 두 개 이상의 state 변수 선언 (Form)</h3>
      {/*리액트는 input 요소에 onChange 이벤트 핸들러가 있을 때, 그 이벤트가 HTMLInputElement에서 발생하는 이벤트라는 것을 알기 때문에 e.target이 HTMLInputElement라는 타입을 자동으로 추론합니다. */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setAge(age + 1)}>Increment age</button>
      <p>
        Hello, {name}. You are {age}.
      </p>
    </div>
  );
}

// 객체 배열로 타입 지정하여 state 변수 선언
interface Member {
  name: string;
  age: number;
}

export function MemberList() {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState<Member>({ name: "", age: 0 });

  const addMember = () => {
    if (newMember.name && newMember.age > 0) {
      setMemberList([...memberList, newMember]); // 기존 멤버 리스트에 새로운 멤버 추가
      setNewMember({ name: "", age: 0 }); // 입력 필드 초기화
    }
  };

  return (
    <div>
      <h3>객체 배열로 타입 지정하여 state 변수 선언 (MemberList)</h3>
      {/* 멤버 추가 입력 폼 */}
      <input
        type="text"
        placeholder="Name"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newMember.age || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, age: parseInt(e.target.value) || 0 })
        }
      />
      <button onClick={addMember}>Add Member</button>

      {/* 멤버 목록 출력 */}
      <ul>
        {memberList.map((member, index) => (
          <li key={index}>
            {member.name} - {member.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
