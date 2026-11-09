import { useState, useEffect, useCallback } from 'react';
import { fetchImages, searchImages } from '../services/api';

/**
 * Custom hook to manage gallery images, search query, pagination and sorting
 */
export function useImages({ initialLimit = 50 } = {}) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [sort, setSort] = useState('newest');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images based on current state (search vs pagination)
  const loadImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const result = await searchImages(searchQuery.trim());
        const searchResults = result.images || [];
        setImages(searchResults);
        setTotalImages(result.total || searchResults.length);
        setTotalPages(Math.ceil((result.total || searchResults.length) / limit) || 1);
        setHasSearched(true);
      } else {
        setIsSearching(false);
        setHasSearched(false);
        const data = await fetchImages({ page, limit, sort });
        setImages(data.images || []);
        setTotalPages(data.total_pages || 1);
        setTotalImages(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load images:', err);
      setError(err.message || 'Không thể tải danh sách hình ảnh từ máy chủ');
    } finally {
      setLoading(false);
    }
  }, [page, limit, sort, searchQuery]);

  // Execute on dependency change
  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Handle new search query (resets page to 1)
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1); // Rule 7: Reset page to 1 on new search
  }, []);

  // Clear search filter
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setPage(1);
    setHasSearched(false);
  }, []);

  // Change page
  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  }, [page, totalPages]);

  // Toggle sort order
  const handleSortChange = useCallback((newSort) => {
    setSort(newSort);
    setPage(1);
  }, []);

  return {
    images,
    page,
    limit,
    totalPages,
    totalImages,
    sort,
    searchQuery,
    isSearching,
    hasSearched,
    loading,
    error,
    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleSortChange,
    reload: loadImages
  };
}

export default useImages;
