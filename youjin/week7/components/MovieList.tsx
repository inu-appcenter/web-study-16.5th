import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

// ...

export default function MovieList() {
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('')
  const observerEl = useRef<HTMLDivElement | null>(null)

  const {
    data,
    // isLoading,
    isFetching,
    // isFetched,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage
  } = useInfiniteQuery<Page>({
    // ...
  })

  useEffect(() => {
    const currentObserverEl = observerEl.current
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    if (currentObserverEl) {
      io.observe(currentObserverEl)
    }
    return () => {
      if (currentObserverEl) {
        io.disconnect()
      }
    }
  }, [hasNextPage, fetchNextPage])

  // ...

  return (
    <>
      {/* ... */}
      {isFetching ? <div>로딩 중..</div> : null}
      <div
        ref={observerEl}
        style={{ height: '20px' }}
      />
    </>
  )
}