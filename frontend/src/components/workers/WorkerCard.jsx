import React from 'react';
import { Cpu, HardDrive, Image as ImageIcon, Clock, User } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatDate';

export function WorkerCard({ worker }) {
  const {
    worker_id,
    member_id,
    machine_name,
    status = 'offline',
    total_images = 0,
    current_task = 'Idle',
    last_heartbeat
  } = worker;

  // Status mapping
  const statusStyles = {
    online: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Online (Sẵn sàng)',
      cardBorder: 'hover:border-emerald-300'
    },
    busy: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500 animate-pulse',
      label: 'Busy (Đang sinh ảnh)',
      cardBorder: 'hover:border-blue-300'
    },
    offline: {
      badge: 'bg-surface-100 text-surface-600 border-surface-200',
      dot: 'bg-surface-400',
      label: 'Offline (Mất kết nối)',
      cardBorder: 'hover:border-surface-300'
    }
  };

  const style = statusStyles[status.toLowerCase()] || statusStyles.offline;

  return (
    <div className={`bg-white rounded-2xl border border-surface-200 p-5 shadow-xs transition-all duration-200 ${style.cardBorder} flex flex-col justify-between`}>
      {/* Top Header: Worker ID & Status Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-surface-900 flex items-center gap-1.5">
              <span>Worker {worker_id}</span>
            </h3>
            <span className="text-[11px] text-surface-500 flex items-center gap-1">
              <User className="w-3 h-3" /> Thành viên #{member_id}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.badge}`}>
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
          <span>{style.label}</span>
        </div>
      </div>

      {/* Main Stats Details */}
      <div className="py-4 space-y-3 text-xs">
        {/* Machine Name */}
        <div className="flex items-center justify-between">
          <span className="text-surface-500 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-surface-400" /> Máy trạm / GPU:
          </span>
          <span className="font-mono font-medium text-surface-800 truncate max-w-[170px]" title={machine_name}>
            {machine_name || 'Generic Worker Node'}
          </span>
        </div>

        {/* Total Images Generated */}
        <div className="flex items-center justify-between">
          <span className="text-surface-500 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-surface-400" /> Tổng số ảnh đã tạo:
          </span>
          <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
            {total_images} ảnh
          </span>
        </div>

        {/* Current Task */}
        <div className="pt-2 border-t border-surface-100">
          <span className="text-surface-500 block mb-1">Tác vụ hiện tại:</span>
          <p className="font-mono text-[11px] bg-surface-50 p-2 rounded-lg border border-surface-200/70 text-surface-700 truncate" title={current_task}>
            {current_task}
          </p>
        </div>
      </div>

      {/* Footer: Last Heartbeat */}
      <div className="pt-3 border-t border-surface-100 flex items-center justify-between text-[11px] text-surface-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> Heartbeat:
        </span>
        <span className="font-medium text-surface-600">
          {formatRelativeTime(last_heartbeat)}
        </span>
      </div>
    </div>
  );
}

export default WorkerCard;
