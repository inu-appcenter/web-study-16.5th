import styled from "styled-components";

export default function Box() {
  return (
    <div>
      <StyledBox />
    </div>
  );
}

const StyledBox = styled.div`
  width: 60px;
  height: 60px;
  // padding: 10px;
  // padding: 8px 16px;
  padding: 4px 8px 12px 16px;
  background-color: skyblue;
  border-width: 8px;
  border-color: red;
  margin: 18px;
`;
