import React, { useState } from 'react';
import { 
  AlertCircle, 
  RefreshCw, 
  Inbox, 
  Sparkles, 
  ArrowUpDown
} from 'lucide-react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

export function ImageGallery({
  images = [],
  loading = false,
  error = null,
  onRetry,
  sort = 'newest',
  onSortChange,
  emptyTitle = 'Chưa có hình ảnh nào',
  emptyDescription = 'Kho lưu trữ hiện tại chưa có ảnh phù hợp hoặc chưa có Worker tải lên.',
  onTriggerGenerate,
  searchQuery = ''
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div 
              key={`skel-${idx}`} 
              className="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-xs animate-pulse flex flex-col"
            >
              <div className="aspect-square bg-surface-200" />
              <div className="p-3 space-y-2">
                <div className="h-3.5 bg-surface-200 rounded w-3/4" />
                <div className="h-2.5 bg-surface-100 rounded w-1/2" />
                <div className="pt-2 border-t border-surface-100 flex justify-between">
                  <div className="h-2 bg-surface-100 rounded w-1/3" />
                  <div className="h-2 bg-surface-100 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-xl mx-auto my-10 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-rose-900 mb-1">
          Không thể tải dữ liệu ảnh
        </h3>
        <p className="text-xs text-rose-700 mb-4 max-w-sm mx-auto">
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Thử tải lại
          </button>
        )}
      </div>
    );
  }

  // Empty State (kho rỗng hoặc tìm kiếm không có kết quả)
  if (!images || images.length === 0) {
    return (
      <div className="bg-white border border-surface-200 rounded-2xl p-10 text-center max-w-lg mx-auto my-8 shadow-xs animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
          <Inbox className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-surface-900 mb-1">
          {searchQuery ? `Không tìm thấy ảnh cho "${searchQuery}"` : emptyTitle}
        </h3>
        <p className="text-xs text-surface-500 mb-6 max-w-md mx-auto leading-relaxed">
          {searchQuery 
            ? 'Hệ thống chưa có hình ảnh phù hợp với từ khóa này. Bạn có thể yêu cầu phân phối tác vụ tới các AI Worker để tự động sinh ảnh mới.'
            : emptyDescription}
        </p>

        {searchQuery && onTriggerGenerate && (
          <button
            onClick={() => onTriggerGenerate(searchQuery)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium text-xs rounded-xl shadow-md shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            Tự động sinh ảnh AI: "{searchQuery}"
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Gallery Header Controls: count & sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200/80">
        <div className="text-xs text-surface-500">
          Tìm thấy <span className="font-semibold text-surface-900">{images.length}</span> hình ảnh
        </div>

        {onSortChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-400 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Sắp xếp:
            </span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs bg-white border border-surface-200 text-surface-700 rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-brand-500"
            >
              <option value="newest">Mới nhất trước (Newest)</option>
              <option value="oldest">Cũ nhất trước (Oldest)</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid Gallery */}
      {/* Mobile: 2 cột | Tablet: 3-4 cột | Desktop: 5-6 cột */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.image_id || image.image_name}
            image={image}
            onClick={setSelectedImage}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default ImageGallery;
