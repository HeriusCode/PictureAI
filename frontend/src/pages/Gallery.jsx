import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import ImageGallery from '../components/gallery/ImageGallery';
import Pagination from '../components/gallery/Pagination';
import GenerationStatus from '../components/generation/GenerationStatus';
import { useImages } from '../hooks/useImages';
import { useGenerationTask } from '../hooks/useGenerationTask';

export function Gallery() {
  const {
    images,
    page,
    limit,
    totalPages,
    totalImages,
    sort,
    searchQuery,
    isSearching,
    loading,
    error,
    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleSortChange,
    reload
  } = useImages({ initialLimit: 50 });

  const {
    task,
    startGeneration,
    resetTask,
    retryTask
  } = useGenerationTask({
    onSuccess: () => {
      reload();
    }
  });

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shadow-2xs">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">
              Image Gallery
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Toàn bộ bộ sưu tập ảnh bách khoa toàn thư tạo bởi mạng lưới AI Worker
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-[480px] lg:w-[560px]">
          <SearchBar
            initialQuery={searchQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            loading={loading && isSearching}
            placeholder="Tìm theo tên tiếng Anh..."
            showSuggestions={false}
          />
        </div>
      </div>

      {/* Task status if running */}
      {task && (
        <div className="pt-6">
          <GenerationStatus
            task={task}
            onRetry={retryTask}
            onClose={resetTask}
          />
        </div>
      )}

      {/* Main Gallery */}
      <div className="pt-6">
        <ImageGallery
          images={images}
          loading={loading}
          error={error}
          onRetry={reload}
          sort={sort}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          onTriggerGenerate={(prompt) => startGeneration(prompt)}
        />

        {/* Pagination */}
        {!isSearching && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalImages}
            limit={limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Gallery;
