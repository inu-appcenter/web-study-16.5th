import { useQuery } from '@tanstack/react-query';

export default function DelayedData() {
  const { data, isLoading, isFetching, isStale } = useQuery({
    queryKey: ['delay'],
    queryFn: async () =>
      (await fetch('https://api.heropy.dev/v0/delay?t=1000')).json(),
    staleTime: 1000 * 10, // 10초 동안 신선함
  });

  if (isLoading) {
    return <div>데이터를 가져오는 중...</div>;
  }

  return (
    <>
      <div>
        데이터가 {isStale ? '상했어요..' : '신선해요!'}
        {isFetching && ' (새로고침 중...)'}
      </div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
