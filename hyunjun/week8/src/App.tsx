import React, { useState, useEffect, useRef } from "react";

interface Item {
  id: number;
  title: string;
}

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // 데이터 목록
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 추가 데이터 여부
  const observerRef = useRef<HTMLDivElement | null>(null); // 관찰 요소 참조

  // 데이터 가져오는 함수
  const fetchData = async (page: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data: Item[] = await response.json();

      if (data.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없을 경우
      } else {
        setItems((prev) => [...prev, ...data]); // 기존 데이터에 추가
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    if (isLoading || !hasMore) return; // 로딩 중이거나 데이터가 없으면 실행 X

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      },
      { threshold: 1.0 } // 100% 보여질 때 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // 관찰 시작
    }

    return () => observer.disconnect(); // 언마운트 시 해제
  }, [isLoading, hasMore]);

  // 페이지 변화에 따른 데이터 가져오기
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {item.title}
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more data available</p>}
      <div
        ref={observerRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default InfiniteScroll;
