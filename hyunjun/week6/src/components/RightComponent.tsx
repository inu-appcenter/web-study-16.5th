import React from 'react';
import styled from 'styled-components';

import { ReactComponent as FileButton } from '../assets/FileButton.svg';
import { ReactComponent as DownArrow } from '../assets/DownArrow.svg';
import { ReactComponent as UpArrow } from '../assets/UpArrow.svg';
import Chat from '../components/Chat'


// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding:20px;
  box-sizing: border-box;

`;

// 상단 바 레이아웃
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height:fit-content;
`;

// 상단 버튼 스타일
const Button = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight:bold;
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


// 프로필 사진 스타일
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;


const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 20%;
  margin-right: 20%;
  overflow-y: auto;

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

// 스크롤 영역
const ChatArea = styled.div`
  margin-bottom: 20px;  // 입력창과 간격을 주기 위해 margin-bottom 추가
  flex-grow: 1;


`;

// 채팅 입력 영역
const ChatInputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color:#2F2F2F;

  margin-left:20%;
  margin-right:20%;

  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top : 10px;
  padding-bottom:10px;

  color : #B4B4B4;

`;

const InputAreaButtonFrame = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  width:100%;
  
`

// 파일 첨부 버튼 스타일
const AttachButton = styled.button`
  background: none;
  border: none;
  color : #B4B4B4;

  cursor: pointer;
`;

// 메시지 입력 칸 스타일
const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin: 0 10px;
  background-color: transparent;  // 배경을 투명하게 설정
  width:100%;
  color : #ECECEC;
  margin-bottom:10px;
  border:none;
`;

// 전송 버튼 스타일
const SendButton = styled.button`
  background-color: #676767;
  border: none;
  width: 40px; /* 버튼의 너비 */
  height: 40px; /* 버튼의 높이 */
  border-radius: 50%; /* 원 모양을 만들기 위해 50%로 설정 */
  cursor: pointer;
  &:hover {
    /* 호버 효과를 추가하려면 여기에 스타일을 넣습니다. */
  }
`;





const App: React.FC = () => {
  return (
    <Layout>
      {/* 상단 바 */}
      <Header>
        <Button>
          ChatGPT<DownArrow/>
        </Button>
        <div>
          <ProfileImg src="https://lh3.googleusercontent.com/a/ACg8ocLwn3CoaLiZqGXJzOs_drEFo0oLV9oIox-w031BTeGn=s96-c" alt="profile" />
        </div>
      </Header>

      <ContentArea>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <ChatArea>
        <Chat/>
      </ChatArea>
      </ContentArea>


      {/* 채팅 입력창 */}
      <ChatInputArea>
      <MessageInput placeholder="메시지 ChatGPT" />
      <InputAreaButtonFrame>
        <AttachButton>
          <FileButton/>
        </AttachButton>
        <SendButton>
          <UpArrow/>
        </SendButton>
      </InputAreaButtonFrame>
      </ChatInputArea>

    </Layout>
  );
};

export default App;
