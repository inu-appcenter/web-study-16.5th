import React from 'react';
import styled from 'styled-components';

import { ReactComponent as GPTIcon } from '../assets/GPTIcon.svg';

const ChatAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

// 내가 보낸 메시지 박스 스타일
const MyMessage = styled.button`
  background: #2F2F2F;
  border: none;
  border-radius: 15px;
  color: #ECECEC;
  display: flex;
  max-width: 50%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 50px;
  align-self: flex-end; /* 오른쪽 정렬 */
  text-align: left;
  font-size: medium;
  margin-top: 30px;
`;

// 지피티 답변 박스 스타일
const GPTMessageBox = styled.button`
  border: none;
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  background-color: #212121;
  width: 100%;
`;

// 지피티 답변 박스 왼쪽
const GPTMessageBoxLeft = styled.button`
  border: none;
  width: fit-content;
  background-color: #212121;
  color: white;
  display: block;
  padding: 10px 20px;
`;

// 지피티 답변 박스 오른쪽
const GPTMessageBoxRight = styled.button`
  flex-grow: 1;
  border: none;
  background-color: #212121;
  color: white;
  text-align: left;
  padding-top: 10px;
  font-size: medium;
  color: #ECECEC;
`;

// 목록을 포함하는 스크롤 가능한 영역
const ListContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  width: 100%;
`;

const SideBar: React.FC = () => {
// 목록 아이템 데이터 (예시)
const items = [
    '이 함수가 어떤 원리로 동작하는지 궁금합니다.',
    '중력 값 g는 어떤 단위로 설정해야 하나요?',
    '이 코드가 특정 물리 법칙을 기반으로 작성된 건가요?',
    '수평 속도와 수직 속도가 어떻게 계산되는지 알고 싶어요.',
    'ty 값이 시간과 관련이 있는 것 같은데, 정확한 의미는 무엇인가요?',
    '이 코드를 최적화하려면 어떤 점을 고려해야 하나요?',
  ];
  
  const gptitems = [
    '이 함수는 OpenGL의 좌표 이동을 담당하며, tx와 ty는 시간에 따른 변화량을 나타냅니다.',
    '중력 값 g는 일반적으로 초당 미터(m/s^2) 단위로 사용됩니다.',
    '이 코드는 등가속도 운동 방정식을 기반으로 작성된 것으로 보입니다.',
    '수평 속도는 h * tx로, 수직 속도는 v * ty - (g / 2.0) * ty^2로 계산됩니다.',
    'ty는 시간의 경과를 나타내는 매개변수로 보이며, 물체의 움직임을 시뮬레이션합니다.',
    '최적화를 위해 불필요한 계산을 제거하거나 상수 값을 미리 계산하는 방법을 고려할 수 있습니다.',
  ];
  

  // 두 배열을 번갈아가며 결합하여 메시지 생성
  const combinedItems = [];
  let i = 0, j = 0;
  while (i < items.length || j < gptitems.length) {
    if (i < items.length) {
      combinedItems.push({ type: 'my', text: items[i] });
      i++;
    }
    if (j < gptitems.length) {
      combinedItems.push({ type: 'gpt', text: gptitems[j] });
      j++;
    }
  }

  return (
    <ChatAreaWrapper>
      {/* 스크롤 가능한 목록 */}
      <ListContainer>
        {combinedItems.map((item, index) => (
          item.type === 'my' ? (
            <MyMessage key={index}>{item.text}</MyMessage>
          ) : (
            <GPTMessageBox key={index}>
              <GPTMessageBoxLeft>
                <GPTIcon />
              </GPTMessageBoxLeft>
              <GPTMessageBoxRight>{item.text}</GPTMessageBoxRight>
            </GPTMessageBox>
          )
        ))}
      </ListContainer>
    </ChatAreaWrapper>
  );
};

export default SideBar;
