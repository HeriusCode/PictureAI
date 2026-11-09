import React from 'react';
import { Image as ImageIcon, Cpu, Activity, TrendingUp, BarChart2, Layers } from 'lucide-react';

export function WorkerStats({ stats, loading = false, error = null }) {
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`stat-skel-${i}`} className="bg-white p-5 rounded-2xl border border-surface-200 h-28" />
          ))}
        </div>
        <div className="bg-white p-6 rounded-2xl border border-surface-200 h-72" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-xs text-rose-700">
        Không thể tải dữ liệu thống kê từ hệ thống ({error}).
      </div>
    );
  }

  const {
    total_images = 0,
    total_workers = 0,
    active_workers = 0,
    workers = []
  } = stats || {};

  // Find max images for scaling bar chart heights
  const maxImages = Math.max(...workers.map(w => w.total_images || 0), 1);

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Total Images */}
        <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Tổng số hình ảnh
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
              {total_images.toLocaleString()}
            </h3>
            <span className="text-[11px] text-brand-600 font-medium inline-flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Kho lưu trữ trung tâm
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Total Workers */}
        <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Tổng số AI Worker
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
              {total_workers}
            </h3>
            <span className="text-[11px] text-surface-500 font-medium inline-flex items-center gap-1 mt-1">
              <Layers className="w-3 h-3" /> Cụm máy trạm phân tán
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Active Workers */}
        <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Worker đang hoạt động
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
              {active_workers}
            </h3>
            <span className="text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng nhận tác vụ
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Biểu đồ cột: Thống kê số lượng ảnh theo Worker */}
      <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-surface-100">
          <div>
            <h3 className="text-base font-bold text-surface-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-brand-600" />
              <span>Biểu đồ sản lượng ảnh theo AI Worker</span>
            </h3>
            <p className="text-xs text-surface-500 mt-0.5">
              Số lượng ảnh watercolor do từng Worker độc lập kết xuất và đồng bộ
            </p>
          </div>
          <span className="text-xs font-medium text-surface-400 bg-surface-50 px-2.5 py-1 rounded-lg border border-surface-200 self-start sm:self-auto">
            Dữ liệu Backend thời gian thực
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-end min-h-[220px]">
            {workers.map((w) => {
              const count = w.total_images || 0;
              const heightPercent = Math.max(Math.round((count / maxImages) * 100), 12);
              const percentOfTotal = total_images > 0 ? ((count / total_images) * 100).toFixed(1) : 0;

              return (
                <div key={w.worker_id} className="flex flex-col items-center group h-full justify-end">
                  {/* Hover tooltip value */}
                  <div className="text-xs font-bold text-brand-600 mb-2 transition-transform group-hover:-translate-y-1">
                    {count} ảnh
                    <span className="block text-[10px] text-surface-400 font-normal">
                      ({percentOfTotal}%)
                    </span>
                  </div>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[56px] bg-surface-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-36">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-xl transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-300 shadow-xs"
                    />
                  </div>

                  {/* Worker Label below */}
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-surface-800 font-mono">
                      W-{w.worker_id}
                    </p>
                    {w.member_id && (
                      <span className="text-[10px] text-surface-400 block">
                        Mem #{w.member_id}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-6 pt-4 border-t border-surface-100 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-surface-400 uppercase tracking-wider text-[10px] border-b border-surface-100">
                <th className="pb-2 font-semibold">Worker ID</th>
                <th className="pb-2 font-semibold">Thành viên</th>
                <th className="pb-2 font-semibold">Máy trạm</th>
                <th className="pb-2 font-semibold text-right">Số ảnh đã tạo</th>
                <th className="pb-2 font-semibold text-right">Tỷ trọng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 text-surface-700">
              {workers.map((w) => {
                const count = w.total_images || 0;
                const percentOfTotal = total_images > 0 ? ((count / total_images) * 100).toFixed(1) : 0;
                return (
                  <tr key={w.worker_id} className="hover:bg-surface-50 transition-colors">
                    <td className="py-2.5 font-bold font-mono text-surface-900">Worker {w.worker_id}</td>
                    <td className="py-2.5 text-surface-600">Thành viên #{w.member_id || w.worker_id.split('.')[0]}</td>
                    <td className="py-2.5 font-mono text-surface-500">{w.machine_name || 'Worker Node'}</td>
                    <td className="py-2.5 text-right font-bold text-brand-600">{count}</td>
                    <td className="py-2.5 text-right text-surface-500">{percentOfTotal}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorkerStats;
