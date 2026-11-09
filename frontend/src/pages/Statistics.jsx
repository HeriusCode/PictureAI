import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import WorkerStats from '../components/statistics/WorkerStats';
import { fetchImageStats } from '../services/api';

export function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImageStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
      setError(err.message || 'Không thể tải thống kê từ Backend');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1 space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shadow-2xs">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">
              Hệ thống Thống kê & Hiệu năng
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Báo cáo tổng lượng ảnh, tỷ trọng phân phối theo Worker và tiến độ lưu trữ
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-surface-200 text-xs sm:text-sm font-semibold text-surface-700 hover:bg-surface-50 active:bg-surface-100 transition-colors shadow-xs disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-600' : ''}`} />
          <span>Cập nhật số liệu</span>
        </button>
      </div>

      {/* Main Stats and Bar Chart */}
      <WorkerStats
        stats={stats}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Statistics;
