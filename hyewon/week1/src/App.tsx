import styled from "styled-components";

const NameH1 = styled.h1`
  margin-left: 10px;
  color: black;
`;
const AgeH2 = styled.h2`
  margin-left: 10px;
  color: blue;
`;
const StudentH3 = styled.h3`
  margin-left: 10px;
  margin-bottom: 50px;
  color: red;
`;

// 1. Props의 타입을 정의하는 interface
interface GreetingProps {
  name: string | number; // string 또는 number 타입을 받을 수 있음
  age?: number; // 선택적 number 타입 prop (값이 없을 수도 있음)
  isStudent: boolean; // 필수 boolean 타입 prop
}

// 2. 함수형 컴포넌트 정의
export function Greeting({ name, age, isStudent }: GreetingProps) {
  return (
    <div>
      <NameH1>
        Hello, {typeof name === "string" ? name : `User #${name}`}!
      </NameH1>
      {/* age가 존재할 때만 Age 정보를 렌더링 */}
      {age && <AgeH2>Age: {age}</AgeH2>}
      {/* age가 없는 경우 해당 JSX가 렌더링되지 않음 */}
      <StudentH3>Status: {isStudent ? "Student" : "Not a student"}</StudentH3>
    </div>
);  
}

// 3. 컴포넌트 사용
function App() {
  return (
    <div>
      <Greeting name="John" age={25} isStudent={true} />
      <Greeting name={101} isStudent={false} />
    </div>
  );
}

export default App;
