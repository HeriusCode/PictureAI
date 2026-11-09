import React, { useState } from 'react';
import { Cpu, Calendar, ZoomIn, ImageOff } from 'lucide-react';
import { formatRelativeTime, parseImageFilename } from '../../utils/formatDate';

export function ImageCard({ image, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { title, workerId, memberId } = parseImageFilename(image.image_name);
  const displayWorkerId = image.worker_id || workerId || 'N/A';
  const displayMemberId = image.member_id || memberId || 'N/A';

  return (
    <div
      onClick={() => onClick(image)}
      className="group bg-white rounded-xl border border-surface-200 overflow-hidden shadow-xs hover:shadow-md hover:border-brand-300 transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Image Thumbnail Container */}
      <div className="relative aspect-square w-full bg-surface-100 overflow-hidden">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 animate-pulse" />
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-400 bg-surface-100 p-3 text-center">
            <ImageOff className="w-8 h-8 mb-1 text-surface-300" />
            <span className="text-xs">Không tải được ảnh</span>
          </div>
        ) : (
          <img
            src={image.image_url}
            alt={image.image_name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover overlay with zoom hint */}
        <div className="absolute inset-0 bg-surface-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 backdrop-blur-xs text-surface-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <ZoomIn className="w-3.5 h-3.5 text-brand-600" />
            Xem chi tiết
          </span>
        </div>

        {/* Worker badge on top corner */}
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-surface-700 text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs border border-surface-200">
            <Cpu className="w-3 h-3 text-brand-600" />
            W-{displayWorkerId}
          </span>
        </div>

        {/* Member badge on top right */}
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-surface-900/70 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-xs">
            M-{displayMemberId}
          </span>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-3 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 
            className="text-xs font-semibold text-surface-900 truncate capitalize tracking-tight"
            title={title}
          >
            {title}
          </h3>
          <p 
            className="text-[11px] font-mono text-surface-400 truncate mt-0.5" 
            title={image.image_name}
          >
            {image.image_name}
          </p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-surface-100 flex items-center justify-between text-[11px] text-surface-500">
          <span className="flex items-center gap-1" title={image.created_at}>
            <Calendar className="w-3 h-3 text-surface-400" />
            {formatRelativeTime(image.created_at)}
          </span>
          <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">
            Watercolor
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
