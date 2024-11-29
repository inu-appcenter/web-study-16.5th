import React from 'react';
import styled from 'styled-components';

import SideBar from './components/SideBar'
import RightComponent from './components/RightComponent'


// Wrapper 컴포넌트: 세로로 가득 차고, 가로로 1:5 비율로 flex 설정
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;  // 세로 가득 차게 설정
  color: #B4B4B4;
  overflow:hidden;
`;

// 왼쪽 컴포넌트: 검정색 배경
const LeftComponent = styled.div`
  background-color: #2B2B2B;
  flex: 1;  // 가로 1
  height:100%;

  @media (max-width: 768px) {  // 가로폭이 768px 이하일 때
    display: none;  // SideBar를 숨김
  }
`;

// 오른쪽 컴포넌트: 회색 배경
const RightComponentDesign = styled.div`
  background-color: #212121;
  flex: 5;  // 가로 5
  height:100%;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <LeftComponent>
        <SideBar/>
      </LeftComponent>
      <RightComponentDesign>
        <RightComponent/>
      </RightComponentDesign>
    </Wrapper>
  );
};

export default App;
