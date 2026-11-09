import React, { useState } from 'react';
import { Cpu, RefreshCw } from 'lucide-react';
import WorkerCard from './WorkerCard';

export function WorkerList({ workers = [], loading = false, error = null, onRefresh }) {
  const [filter, setFilter] = useState('all');

  const filteredWorkers = workers.filter((w) => {
    if (filter === 'all') return true;
    return w.status?.toLowerCase() === filter;
  });

  const onlineCount = workers.filter((w) => w.status === 'online').length;
  const busyCount = workers.filter((w) => w.status === 'busy').length;
  const offlineCount = workers.filter((w) => w.status === 'offline').length;

  return (
    <div className="space-y-6">
      {/* Top Controls: Filter Pills & Refresh Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-surface-200 shadow-xs">
        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            Tất cả ({workers.length})
          </button>

          <button
            onClick={() => setFilter('online')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'online'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Online ({onlineCount})
          </button>

          <button
            onClick={() => setFilter('busy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'busy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Busy ({busyCount})
          </button>

          <button
            onClick={() => setFilter('offline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'offline'
                ? 'bg-surface-600 text-white shadow-xs'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-surface-400" />
            Offline ({offlineCount})
          </button>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-surface-200 text-xs font-semibold text-surface-700 hover:bg-surface-50 active:bg-surface-100 transition-colors disabled:opacity-50 self-end sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-600' : ''}`} />
            <span>Làm mới danh sách</span>
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`w-skel-${i}`} className="bg-white rounded-2xl border border-surface-200 p-5 shadow-xs animate-pulse space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-24 h-4 bg-surface-200 rounded" />
                <div className="w-16 h-4 bg-surface-100 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-surface-100 rounded" />
                <div className="w-3/4 h-3 bg-surface-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-center">
          <Cpu className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-rose-900">Không thể kết nối danh sách Worker</h4>
          <p className="text-xs text-rose-700 mt-1">{error}</p>
        </div>
      )}

      {/* Worker Grid */}
      {!loading && !error && filteredWorkers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.worker_id} worker={worker} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredWorkers.length === 0 && (
        <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center text-surface-500">
          <Cpu className="w-10 h-10 text-surface-300 mx-auto mb-2" />
          <p className="text-sm font-medium">Không tìm thấy Worker nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
}

export default WorkerList;
