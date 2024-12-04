import { useState, useEffect } from "react";

export function usePagination(
  initialPage = 1,
  minPage = 1,
  initialMaxPage = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [maxPage, setMaxPage] = useState(initialMaxPage);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < maxPage ? prev + 1 : maxPage));

  const previousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, minPage));

  const resetPage = () => setCurrentPage(initialPage);

  // Ensure currentPage does not exceed maxPage when maxPage changes
  useEffect(() => {
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [maxPage, currentPage]);

  return {
    currentPage,
    nextPage,
    previousPage,
    resetPage,
    maxPage,
    setMaxPage,
  };
}
