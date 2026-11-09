import React, { useEffect } from 'react';
import { 
  X, 
  Cpu, 
  User, 
  Calendar, 
  Download, 
  ExternalLink, 
  Layers, 
  Tag,
  Check
} from 'lucide-react';
import { formatDate, parseImageFilename } from '../../utils/formatDate';

export function ImageModal({ image, onClose }) {
  const [copied, setCopied] = React.useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  const { title, workerId, memberId } = parseImageFilename(image.image_name);
  const displayWorkerId = image.worker_id || workerId || 'N/A';
  const displayMemberId = image.member_id || memberId || 'N/A';

  const copyFilename = () => {
    navigator.clipboard.writeText(image.image_name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-surface-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-surface-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-surface-600 hover:text-surface-900 shadow-sm transition-all focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Area */}
        <div className="md:w-3/5 bg-surface-950 flex items-center justify-center p-4 relative group min-h-[300px]">
          <img
            src={image.image_url}
            alt={image.image_name}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Image Metadata Panel */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-surface-50">
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-800 mb-2">
                <Tag className="w-3.5 h-3.5" />
                Watercolor Encyclopedia Art
              </div>
              <h2 className="text-xl font-bold text-surface-900 capitalize tracking-tight">
                {title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-mono text-surface-500 break-all bg-white px-2 py-1 rounded border border-surface-200">
                  {image.image_name}
                </p>
                <button
                  onClick={copyFilename}
                  className="text-xs px-2 py-1 rounded bg-surface-200 hover:bg-surface-300 text-surface-700 flex items-center gap-1 shrink-0 transition-colors"
                  title="Sao chép tên file"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : 'Copy'}
                </button>
              </div>
            </div>

            {/* AI Generation Details */}
            <div className="bg-white rounded-xl p-4 border border-surface-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-surface-400">
                Thông tin xuất bản AI
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-50 border border-surface-100">
                  <div className="flex items-center gap-1.5 text-surface-500 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-brand-600" />
                    <span>AI Worker ID</span>
                  </div>
                  <span className="font-bold text-surface-900 text-sm font-mono">
                    {displayWorkerId}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-50 border border-surface-100">
                  <div className="flex items-center gap-1.5 text-surface-500 mb-1">
                    <User className="w-3.5 h-3.5 text-brand-600" />
                    <span>Member ID</span>
                  </div>
                  <span className="font-bold text-surface-900 text-sm">
                    Thành viên #{displayMemberId}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-100 flex items-center justify-between text-xs text-surface-600">
                <span className="flex items-center gap-1.5 text-surface-500">
                  <Calendar className="w-3.5 h-3.5" /> Thời gian tạo:
                </span>
                <span className="font-medium text-surface-800">
                  {formatDate(image.created_at)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-surface-600">
                <span className="flex items-center gap-1.5 text-surface-500">
                  <Layers className="w-3.5 h-3.5" /> Model Kiến trúc:
                </span>
                <span className="font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                  Local AI Diffusion (Distributed)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-5 border-t border-surface-200 flex items-center gap-3">
            <a
              href={image.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Mở ảnh gốc
            </a>

            <a
              href={image.image_url}
              download={image.image_name}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-white border border-surface-300 hover:bg-surface-100 text-surface-700 font-medium text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Tải xuống
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
