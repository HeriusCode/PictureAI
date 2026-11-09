import React from 'react';
import { Sparkles, Layers, Cpu, ArrowRight, Palette, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import ImageGallery from '../components/gallery/ImageGallery';
import Pagination from '../components/gallery/Pagination';
import GenerationStatus from '../components/generation/GenerationStatus';
import { useImages } from '../hooks/useImages';
import { useGenerationTask } from '../hooks/useGenerationTask';

export function Home() {
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

  // Hook for AI generation task
  const {
    task,
    startGeneration,
    resetTask,
    retryTask
  } = useGenerationTask({
    onSuccess: () => {
      // Rule 8: Khi tác vụ tạo ảnh hoàn thành phải tự cập nhật kết quả
      reload();
    }
  });

  // Triggered when search has 0 results or user wants to create
  const handleTriggerGenerate = (promptText) => {
    startGeneration(promptText);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 3.2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-surface-50 py-16 sm:py-24 border-b border-surface-200">
        
        {/* Subtle decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white border border-brand-200 text-brand-700 shadow-xs mb-6">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Distributed AI Image Generation • Watercolor Encyclopedia</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-surface-900 tracking-tight leading-tight sm:leading-none mb-6">
            Discover and Generate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 bg-clip-text text-transparent">
              AI Images
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-surface-600 leading-relaxed mb-10">
            Kho lưu trữ hình ảnh bách khoa toàn thư phong cách màu nước. 
            Tìm kiếm tức thì hoặc tự động phân phối tác vụ sinh ảnh đến cụm AI Worker phân tán.
          </p>

          {/* Search Bar Component - Wide & prominent */}
          <SearchBar
            initialQuery={searchQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            loading={loading && isSearching}
            placeholder="Search images... e.g. black dog, red hat, blue car"
            showSuggestions={true}
          />

          {/* Capability Highlights Strip across wide screens */}
          <div className="mt-10 pt-6 border-t border-surface-200/60 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-surface-600">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/80 border border-surface-200/80 shadow-2xs">
              <Palette className="w-4 h-4 text-brand-600" />
              <span className="font-medium">Màu nước Bách khoa toàn thư</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/80 border border-surface-200/80 shadow-2xs">
              <Cpu className="w-4 h-4 text-brand-600" />
              <span className="font-medium">Cụm AI Worker GPU phân tán</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/80 border border-surface-200/80 shadow-2xs">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Tự động sinh ảnh khi chưa có</span>
            </div>
          </div>

          {/* Quick links to Worker Dashboard */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-surface-500">
            <Link 
              to="/workers" 
              className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800 hover:underline"
            >
              <Cpu className="w-4 h-4" /> Xem trạng thái cụm AI Worker <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-surface-300">•</span>
            <Link 
              to="/statistics" 
              className="font-semibold text-surface-600 hover:text-surface-900 hover:underline"
            >
              Thống kê sản lượng hình ảnh
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. AI IMAGE GENERATION STATUS AREA */}
      {task && (
        <section className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 pt-6">
          <GenerationStatus
            task={task}
            onRetry={retryTask}
            onClose={resetTask}
          />
        </section>
      )}

      {/* 3.3. IMAGE GALLERY SECTION */}
      <section className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-brand-600" />
              <span>{searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Kho hình ảnh AI mới nhất'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Hình ảnh mới nhất hiển thị trước • Quy ước định danh: [tên ảnh] [member].[worker].jpg
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <ImageGallery
          images={images}
          loading={loading}
          error={error}
          onRetry={reload}
          sort={sort}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          onTriggerGenerate={handleTriggerGenerate}
        />

        {/* Pagination (Tối đa 50 ảnh/trang) */}
        {!isSearching && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalImages}
            limit={limit}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
}

export default Home;
