import React from 'react';
import styled from 'styled-components';

// 최상단 메뉴 컴포넌트
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 10px 20px;
`;

// 메뉴 항목 스타일
const MenuItem = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ItemContainer = styled.div`
    &:hover{
        background-color: #212121;
    }
`

const ListItem: React.FC = () => {
  return (
    <div>
        <ItemContainer>
            TS 프로젝트 만들기
        </ItemContainer>
    </div>
  );
};

export default ListItem;
