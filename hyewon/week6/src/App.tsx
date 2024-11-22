import React, { useState } from 'react';
import './App.css';

// SVG 파일을 import
import { ReactComponent as SideBarIcon } from './sidebar-icon.svg';
import { ReactComponent as NewChatIcon } from './newchat-icon.svg';
import { ReactComponent as GPTlogoIcon } from './gptlogo-icon.svg';
import { ReactComponent as ListIcon } from './list-icon.svg';
import { ReactComponent as ArrowIcon } from './arrow-icon.svg';
import { ReactComponent as DotIcon } from './dot-icon.svg';
import { ReactComponent as ImageIcon } from './image-icon.svg';
import { ReactComponent as TextIcon } from './text-icon.svg';
import { ReactComponent as AdviceIcon } from './advice-icon.svg';
import { ReactComponent as WriteIcon } from './write-icon.svg';
import { ReactComponent as DataIcon } from './data-icon.svg';
import { ReactComponent as FileIcon } from './file-icon.svg';
import { ReactComponent as SendIcon } from './send-icon.svg';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white flex h-screen w-screen">
      {/* 사이드바 */}
      <div className={`bg-sidebar h-full ${isSidebarOpen ? 'w-[260px]' : 'w-0'} translate-all relative`}>
        {/* 사이드바 상단 */}
        <div className="flex flex-row items-center justify-between p-3">
          {/* SideBar 버튼*/}
          <button
            onClick={toggleSidebar}
            className="p-2 hoversidebar transition-all "
          >
            <SideBarIcon className="w-5 h-5" />
          </button>
          {/* New Chat 버튼*/}
          <button
            className={`p-2 hoversidebar translate-all  ${isSidebarOpen ? 'ml-12' : 'ml-0'}`}
          >
            <NewChatIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 사이드바 채팅 목록 */}
        <div className="flex flex-col ml-3 mr-3 text-sm textcolor">
          <ul className={`${isSidebarOpen ? 'block' : 'hidden'} duration-300`}>
            <li className="flex items-center p-2 hoversidebar">
              <GPTlogoIcon className="w-5 h-5" style={{ transform: 'translateX(-3.5px)' }} />
              <span className="ml-1">ChatGPT</span>
            </li>
            <li className="flex items-center p-2 hoversidebar">
              <ListIcon className="w-3 h-3" />
              <span className="ml-3">GPT 탐색</span>
            </li>
            <li className="flex mt-6 p-2 font-semibold">오늘</li>
            <li className="flex items-center p-2 mr-1 hoversidebar">web-study
              <DotIcon className="w-3.5 h-3.5 dot absolute right-6"/>
            </li>
            <li className="flex items-center p-2 hoversidebar">css
              <DotIcon className="w-3.5 h-3.5 dot absolute right-6"/>
            </li>
            <li className="flex mt-6 p-2 font-semibold">어제</li>
            <li className="flex items-center p-2 hoversidebar">local storage
              <DotIcon className="w-3.5 h-3.5 dot absolute right-6"/>
            </li>
          </ul>
        </div>
      </div>

      {/* 메인 화면 */}
      <div className="flex-1 flex-col h-full max-w-full">
        <div className={`h-full ${isSidebarOpen ? 'ml-0' : 'ml-20'} translate-all relative`}>
          {/* 메인 화면 상단 */}
          <div className="flex flex-row p-3 items-center">
            <div className="flex flex-row items-center gap-0 pt-1 pb-1 pl-2 pr-4 hovermain"> 
              <button className="flex flex-row gap-1.5"> 
                <div className="text-lg text-stone-600 font-semibold">
                  <h1>ChatGPT</h1>
                </div>
                <ArrowIcon className="mt-2 w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 메인 화면 중앙 */}
          <div className="flex items-center justify-center flex-col h-full">
            <div className="text-center text-black text-3xl font-medium leading-10">
              <h1>무엇을 도와드릴까요?</h1>
            </div>
            <div className="flex flex-row">
              <div className="flex items-center justify-between mt-4 px-1 textbox relative">
                <FileIcon className="w-5 h-5 m-2"/>
                 <h1 className="absolute left-10 text-md text-stone-500 font-light">메시지 ChatGPT</h1>
                <SendIcon className="w-6 h-6 m-2"/>
              </div>
            </div>
            <div className="flex flex-row gap-1.5 mt-4 text-xs textcolor font-light">
             <button className="flex items-center button hoverbutton">
              <ImageIcon className="mx-1"/>
              이미지 만들기
             </button>
             <button className="flex items-center button hoverbutton">
              <TextIcon className="mx-1"/>
              텍스트 요약
             </button>
             <button className="flex items-center button hoverbutton">
              <AdviceIcon className="ml-1 mr-1.5"/>
               조언 구하기
             </button>
             <button className="flex items-center button hoverbutton">
              <WriteIcon className="mx-1"/>
              쓰기 도움
             </button>
             <button className="flex items-center button hoverbutton">
              <DataIcon className="mx-1"/> 데이터 쓰기
             </button>
             <button className="flex items-center button hoverbutton">더 보기 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
