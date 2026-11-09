import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Cpu, 
  BarChart3, 
  Activity, 
  Menu, 
  X, 
  Layers,
  Database
} from 'lucide-react';
import { checkSystemHealth, IS_MOCK_MODE } from '../../services/api';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState({ status: 'operational', mode: IS_MOCK_MODE ? 'mock' : 'live' });

  useEffect(() => {
    checkSystemHealth().then(setSystemHealth).catch(() => {
      setSystemHealth({ status: 'degraded', mode: IS_MOCK_MODE ? 'mock' : 'live' });
    });
  }, []);

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: Sparkles },
    { name: 'Image Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'AI Workers', path: '/workers', icon: Cpu },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
  ];

  const isHealthy = systemHealth.status === 'operational';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-surface-200 shadow-xs transition-all">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-surface-900 group-hover:text-brand-600 transition-colors">
                  AI Image Repository
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-surface-500 hidden sm:block">
                Distributed AI Image Generation System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Status Indicators */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Mock / Live Mode Tag */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
              IS_MOCK_MODE 
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{IS_MOCK_MODE ? 'Mock Data Mode' : 'Live API Mode'}</span>
            </div>

            {/* System Status Pill */}
            <div 
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isHealthy 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-700' 
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
              title={isHealthy ? "Tất cả các dịch vụ đang hoạt động bình thường" : "Hệ thống đang gặp sự cố kết nối"}
            >
              <span className="relative flex h-2 w-2">
                {isHealthy && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isHealthy ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              </span>
              <Activity className="w-3.5 h-3.5" />
              <span>{isHealthy ? 'System: Operational' : 'System: Offline / Degraded'}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-surface-700 hover:bg-surface-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-brand-600" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
          
          <div className="pt-3 border-t border-surface-100 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-surface-500 px-3">
              <span>Môi trường:</span>
              <span className="font-semibold text-surface-700">
                {IS_MOCK_MODE ? 'Mock Mode' : 'Live API'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-surface-500 px-3">
              <span>Trạng thái:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                {isHealthy ? 'Operational' : 'Issue detected'}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
