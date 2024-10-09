import styled from "styled-components";

// 1. Props의 타입을 정의하는 interface
interface GreetingProps {
  name: string | number; // string 또는 number 타입을 받을 수 있음
  age?: number; // 선택적 number 타입 prop (값이 없을 수도 있음)
  isStudent: boolean; // 필수 boolean 타입 prop
}

// 2. 함수형 컴포넌트 정의
export function Greeting({ name, age, isStudent }: GreetingProps) {
  return (
    <StyledDiv>
      <StyledH1>
        Hello, {typeof name === "string" ? name : `User #${name}`}!
      </StyledH1>
      {/* age가 존재할 때만 Age 정보를 렌더링 */}
      {age && <p>Age: {age}</p>}
      {/* age가 없는 경우 해당 JSX가 렌더링되지 않음 */}
      <p>Status: {isStudent ? "Student" : "Not a student"}</p>
    </StyledDiv>
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

const StyledDiv = styled.div`
  margin-left: 20px;

  p {
    color: blue;
  }
`;

const StyledH1 = styled.h1`
  color: red;
`;
