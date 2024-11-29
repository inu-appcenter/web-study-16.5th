import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import DelayedData from './DelayedData';
import DelayedData2 from './DelayedData2';

// React Query의 클라이언트를 생성
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Example</h1>
        <DelayedData />
        <h2>QueryKey Examply</h2>
        <p>와우</p>
        <DelayedData2 wait={2000}/>
        <DelayedData2 wait={5000}/>
      </div>
    </QueryClientProvider>
  );
}
