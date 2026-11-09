import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  RotateCw, 
  X,
  ExternalLink
} from 'lucide-react';

export function GenerationStatus({
  task,
  onRetry,
  onClose,
  onViewImage
}) {
  if (!task) return null;

  const { status, prompt, task_id, error, images = [], assigned_worker } = task;

  // Status configuration mapping
  const statusConfig = {
    pending: {
      label: 'Đang chờ điều phối',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Clock,
      iconColor: 'text-amber-600',
      description: 'Yêu cầu đang nằm trong hàng đợi tác vụ của Backend, chờ AI Worker sẵn sàng tiếp nhận.',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-200'
    },
    processing: {
      label: 'Đang xử lý sinh ảnh AI',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Loader2,
      iconColor: 'text-brand-600',
      description: 'AI Worker đang thực thi mô hình khuếch tán (Watercolor Diffusion Pipeline).',
      bgColor: 'bg-blue-50/50',
      borderColor: 'border-blue-200'
    },
    completed: {
      label: 'Đã hoàn tất',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      description: 'Hình ảnh màu nước đã được tạo thành công và lưu vào kho lưu trữ phân tán.',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-200'
    },
    failed: {
      label: 'Thất bại',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: XCircle,
      iconColor: 'text-rose-600',
      description: error || 'AI Worker gặp sự cố trong quá trình khởi tạo mô hình hoặc GPU quá tải.',
      bgColor: 'bg-rose-50/50',
      borderColor: 'border-rose-200'
    }
  };

  const currentConfig = statusConfig[status] || statusConfig.pending;
  const StatusIcon = currentConfig.icon;

  const generatedImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className={`w-full max-w-3xl mx-auto my-6 p-5 sm:p-6 rounded-2xl border ${currentConfig.borderColor} ${currentConfig.bgColor} shadow-sm backdrop-blur-xs animate-fade-in relative transition-all`}>
      
      {/* Dismiss button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-white/80 transition-colors focus:outline-none"
          title="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-surface-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-surface-900 flex items-center gap-2">
              <span>Tiến trình phân tán AI Image Generation</span>
            </h3>
            <p className="text-xs text-surface-500 font-mono">
              Task ID: {task_id || 'Generating...'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentConfig.badgeClass}`}>
            <StatusIcon className={`w-3.5 h-3.5 ${status === 'processing' ? 'animate-spin' : ''}`} />
            {currentConfig.label}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="py-4 space-y-3">
        {/* Prompt detail */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-surface-500">Từ khóa yêu cầu:</span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-surface-200 font-medium text-surface-800 shadow-xs">
            "{prompt}"
          </span>
          {assigned_worker && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-surface-200 font-mono text-surface-700">
              <Cpu className="w-3 h-3 text-brand-600" /> Worker: {assigned_worker}
            </span>
          )}
        </div>

        {/* Status description */}
        <p className="text-xs text-surface-600 leading-relaxed">
          {currentConfig.description}
        </p>

        {/* Visual Progress Steps */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {/* Step 1: Queued */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            status === 'pending'
              ? 'bg-white border-brand-400 shadow-xs ring-1 ring-brand-400'
              : status === 'processing' || status === 'completed'
              ? 'bg-surface-100/70 border-surface-200 text-surface-700'
              : 'bg-surface-50 border-surface-200 text-surface-400'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Bước 1</div>
            <div className="text-xs font-semibold mt-0.5">Xếp hàng tác vụ</div>
          </div>

          {/* Step 2: Processing */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            status === 'processing'
              ? 'bg-white border-brand-400 shadow-xs ring-1 ring-brand-400'
              : status === 'completed'
              ? 'bg-surface-100/70 border-surface-200 text-surface-700'
              : 'bg-surface-50 border-surface-200 text-surface-400'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Bước 2</div>
            <div className="text-xs font-semibold mt-0.5 flex items-center justify-center gap-1">
              {status === 'processing' && <Loader2 className="w-3 h-3 animate-spin text-brand-600" />}
              AI Worker sinh ảnh
            </div>
          </div>

          {/* Step 3: Finished */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            status === 'completed'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
              : status === 'failed'
              ? 'bg-rose-50 border-rose-300 text-rose-700'
              : 'bg-surface-50 border-surface-200 text-surface-400'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Bước 3</div>
            <div className="text-xs font-semibold mt-0.5">
              {status === 'failed' ? 'Lỗi thực thi' : 'Đưa vào kho lưu trữ'}
            </div>
          </div>
        </div>

        {/* If Completed: Thumbnail preview & view action */}
        {status === 'completed' && generatedImage && (
          <div className="mt-4 p-3.5 bg-white rounded-xl border border-emerald-200 shadow-xs flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <img
                src={generatedImage.image_url}
                alt={generatedImage.image_name}
                className="w-14 h-14 object-cover rounded-lg border border-surface-200 shadow-xs"
              />
              <div>
                <p className="text-xs font-bold text-surface-900">
                  {generatedImage.image_name}
                </p>
                <p className="text-[11px] text-surface-500 font-mono">
                  Worker: {generatedImage.worker_id} • Member #{generatedImage.member_id}
                </p>
              </div>
            </div>

            {onViewImage && (
              <button
                onClick={() => onViewImage(generatedImage)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Xem ảnh vừa tạo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* If Failed: Error alert & retry action */}
        {status === 'failed' && (
          <div className="mt-3 flex items-center justify-between gap-3 pt-2">
            <span className="text-xs text-rose-700 font-medium">
              Vui lòng thử lại với cụm Worker khác hoặc kiểm tra kết nối mạng.
            </span>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Thử lại tác vụ
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerationStatus;
