import React from 'react';
import { Layers, ShieldCheck, Terminal } from 'lucide-react';
import { IS_MOCK_MODE } from '../../services/api';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: System info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-surface-900 tracking-tight">
                AI Image Repository
              </span>
            </div>
            <p className="text-sm text-surface-600 leading-relaxed max-w-md">
              Hệ thống lưu trữ, tìm kiếm và phân phối tác vụ sinh hình ảnh AI tự động trên cụm máy trạm AI Worker phân tán. 
              Phong cách ảnh minh họa màu nước (Watercolor Encyclopedia Edition).
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-surface-500">
              <span className="inline-flex items-center gap-1 font-medium text-brand-600">
                <Terminal className="w-3.5 h-3.5" /> Module 4: Frontend & Search Engineer
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Distributed Architecture
              </span>
            </div>
          </div>

          {/* Col 2: Quy ước đặt tên file */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-surface-400 mb-3">
              Quy ước định danh ảnh
            </h4>
            <div className="bg-surface-50 p-3 rounded-lg border border-surface-200 text-xs font-mono space-y-1.5 text-surface-700">
              <p className="text-brand-600 font-semibold">[prompt] [member].[worker].jpg</p>
              <div className="text-[11px] text-surface-500 space-y-0.5">
                <div>• <span className="text-surface-800 font-medium">prompt</span>: Tên mô tả ảnh</div>
                <div>• <span className="text-surface-800 font-medium">member</span>: Member ID</div>
                <div>• <span className="text-surface-800 font-medium">worker</span>: Worker ID nội bộ</div>
              </div>
              <p className="text-[11px] text-surface-400 pt-1 border-t border-surface-200">
                Ví dụ: <code className="text-brand-700 font-bold">black dog 2.1.jpg</code>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Status & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-surface-400 mb-3">
              Thông số môi trường
            </h4>
            <ul className="text-xs space-y-2 text-surface-600">
              <li className="flex justify-between py-1 border-b border-surface-100">
                <span>Trạng thái kết nối:</span>
                <span className="font-semibold text-emerald-600">Sẵn sàng</span>
              </li>
              <li className="flex justify-between py-1 border-b border-surface-100">
                <span>Chế độ Mock:</span>
                <span className={`font-semibold ${IS_MOCK_MODE ? 'text-amber-600' : 'text-surface-700'}`}>
                  {IS_MOCK_MODE ? 'Bật (VITE_USE_MOCK)' : 'Tắt (Live FastAPI)'}
                </span>
              </li>
              <li className="flex justify-between py-1">
                <span>Giới hạn trang:</span>
                <span className="font-semibold text-surface-800">50 ảnh / trang</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-surface-200 flex flex-col sm:flex-row items-center justify-between text-xs text-surface-500 gap-2">
          <p>© {currentYear} AI Image Repository. Đồ án nhóm Distributed AI Systems.</p>
          <div className="flex items-center gap-1 text-surface-500">
            <span>Phát triển giao diện với React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
