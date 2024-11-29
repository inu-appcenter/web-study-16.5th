import React from 'react';
import styled from 'styled-components';

import { ReactComponent as TabToggleIcon } from '../assets/tabToggleIcon.svg';
import { ReactComponent as NewChatIcon } from '../assets/newChatIcon.svg'


const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
`;

// 최상단 메뉴 컴포넌트
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;


// 메뉴 버튼 스타일
const MenuItem = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  color: #B4B4B4;
  cursor: pointer;

  /* flexbox로 중앙 정렬 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */

  &:hover {
    opacity: 0.8;
    background-color: #2F2F2F;
  }
`;

const ListContainer = styled.div`
  height: 100%; /* 메뉴 높이를 제외하고 나머지 공간을 차지 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  padding: 20px;

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 12px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 트랙 배경색 투명 */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 색상 */
    border-radius: 6px; /* 둥근 모서리 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 색상 */
  }

  /* Firefox 지원 */
  scrollbar-width: thin; /* 스크롤바 너비 */
  scrollbar-color: #888 transparent; /* 스크롤바와 투명 트랙 색상 */
`;

// 목록 아이템 스타일
const ListItem = styled.div`
  color:#ECECEC;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #212121;  // hover 시 배경색 변경
  }
`;

const SideBar: React.FC = () => {
  // 목록 아이템 데이터 (예시)
  const items = [
    '화면 레이아웃 수정',
    'ContentArea 크기 조정',
    'Flexbox 문제 해결',
    'Flex 요소 양끝 배치',
    'SVG 파일 변환',
    'Kubernetes 스케줄링 설명',
    '어셈블리 코드 분석',
    '어셈블리 C 변환',
    '어셈블리 C 변환',
    'IP 주소 변환',
    '폭탄 해제 코드 분석',
    '레지스터 반복 구조 설명',
    '폭탄 코드 분석',
    '어셈블리 코드 해석',
    '어셈블리 코드 분석',
    '기타 작업 내용1',
    '기타 작업 내용2',
    '기타 작업 내용3',
  ];

  return (
    <SideBarWrapper>
      {/* 최상단 메뉴 */}
      <Menu>
      
        <MenuItem>
         <TabToggleIcon/>
        </MenuItem>
        <MenuItem>
          <NewChatIcon/>
        </MenuItem>
      </Menu>

      {/* 스크롤 가능한 목록 */}
      <ListContainer>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </ListContainer>
    </SideBarWrapper>
  );
};

export default SideBar;
