import styled from "styled-components";

export default function Flex() {
  return (
    <div>
      <Flex1>
        <h2>h2</h2>
        <span>span</span>
        <button>버튼</button>
      </Flex1>
    </div>
  );
}

const Flex1 = styled.div`
  height: 200px;
  background-color: gray;
  display: flex;
  // flex-direction: row; // 디폴트
  flex-direction: column;
  align-items: center;
  // align-items: end;
  // justify-content: space-between;
  justify-content: center;
`;
