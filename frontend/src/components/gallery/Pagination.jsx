import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, totalItems, limit = 50, onPageChange }) {
  if (totalPages <= 1) return null;

  // Calculate visible page range
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-surface-200 mt-6">
      {/* Items count summary */}
      <div className="text-xs text-surface-500">
        Hiển thị <span className="font-semibold text-surface-800">{startItem}-{endItem}</span> trên tổng số{' '}
        <span className="font-semibold text-surface-800">{totalItems}</span> hình ảnh (Tối đa {limit} ảnh/trang)
      </div>

      {/* Pagination controls */}
      <nav className="flex items-center gap-1.5" aria-label="Pagination Navigation">
        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-surface-300 text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Trang trước"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((item, index) => {
          if (item === '...') {
            return (
              <span key={`dots-${index}`} className="px-2 py-1 text-xs text-surface-400">
                •••
              </span>
            );
          }

          const isCurrent = item === currentPage;
          return (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`min-w-[36px] h-9 px-3 rounded-lg text-xs font-semibold transition-all ${
                isCurrent
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'border border-surface-200 text-surface-700 hover:bg-surface-100'
              }`}
            >
              {item}
            </button>
          );
        })}

        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-surface-300 text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Trang kế tiếp"
          aria-label="Trang kế tiếp"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
