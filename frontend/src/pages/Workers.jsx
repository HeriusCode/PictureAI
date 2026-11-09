import React, { useState, useEffect, useCallback } from 'react';
import { Cpu, ShieldCheck, Zap, HardDrive } from 'lucide-react';
import WorkerList from '../components/workers/WorkerList';
import { fetchWorkers } from '../services/api';

export function Workers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWorkers();
      setWorkers(data || []);
    } catch (err) {
      console.error('Failed to load workers:', err);
      setError(err.message || 'Không thể lấy danh sách Worker');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkers();
    // Heartbeat polling every 10 seconds for worker status
    const interval = setInterval(loadWorkers, 10000);
    return () => clearInterval(interval);
  }, [loadWorkers]);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1 space-y-8">
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shadow-2xs">
              <Cpu className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">
              AI Worker Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Quản lý và giám sát cụm máy trạm tính toán phân tán (Distributed Local AI Workers)
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex items-center gap-4 text-xs text-surface-600">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-surface-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Local Model Execution</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-surface-200 shadow-2xs">
            <Zap className="w-4 h-4 text-brand-600" />
            <span className="font-medium">Auto Load Balancing</span>
          </div>
        </div>
      </div>

      {/* Cluster Overview Banner */}
      <div className="bg-gradient-to-r from-surface-900 via-surface-800 to-brand-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
            Distributed Computing Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            Mạng lưới tính toán phân tán chạy trên phần cứng nội bộ của các thành viên
          </h2>
          <p className="text-xs sm:text-sm text-surface-300 leading-relaxed">
            Mỗi Worker đại diện cho một tiến trình xử lý AI (Stable Diffusion / Watercolor checkpoint) chạy trực tiếp trên GPU của máy tính thành viên nhóm. Frontend nhận kết quả thông qua Backend API trung tâm.
          </p>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none">
          <HardDrive className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Worker List Component */}
      <WorkerList
        workers={workers}
        loading={loading}
        error={error}
        onRefresh={loadWorkers}
      />
    </div>
  );
}

export default Workers;
