import styled from "styled-components";

export default function StyledComponents() {
  return (
    <Wrapper>
      <h1>StyledComponents</h1>
      <h1 className="title">className="title"</h1>
      <StyledButton>StyledButton</StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background-color: gray;
  .title {
    font-size: 40px;
    color: skyblue;
  }
`;

const StyledButton = styled.button`
  padding: 8px;
  color: white;
`;
