'use client';

import { type ReactNode, useCallback, useEffect, useRef } from 'react';

type InfiniteScrollerProps = {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => unknown;
  children: ReactNode;
};

const InfiniteScroller = ({ isFetching, hasNextPage, fetchNextPage, children }: InfiniteScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchMoreOnBottomReached = useCallback(
    (containerRef?: HTMLDivElement | null) => {
      if (containerRef) {
        const { scrollHeight, scrollTop, clientHeight } = containerRef;
        // once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500
          && !isFetching
          && hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, hasNextPage],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(containerRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <div ref={containerRef} className="overflow-auto max-h-[500px]" onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}>
      {children}
    </div>

  );
};

export { InfiniteScroller };
