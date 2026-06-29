import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface LayoutErrorFallbackProps {
  error?: Error | string | null;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export default function LayoutErrorFallback({
  error,
  onRetry,
  children,
}: LayoutErrorFallbackProps) {
  return (
    <div className="min-h-screen flex bg-error-bg text-slate-100 font-sans relative overflow-hidden">
      {/* Background glow effects - consistent with ConnectionErrorCard */}
      <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-error-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-error-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Fallback - Warning Layout */}
      <aside className="fixed top-0 bottom-0 left-0 w-64 z-20 flex flex-col border-r bg-error-bg border-error-border shadow-2xl items-center justify-center p-6 text-center">
        {/* Warning Icon Box */}
        <div className="w-14 h-14 rounded-2xl bg-error-accent/10 flex items-center justify-center text-error-text mb-4 border border-error-border animate-pulse">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-sm font-extrabold text-white tracking-tight uppercase">
          Sidebar Offline
        </h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Gagal memuat modul navigasi dari MFE Layout.
        </p>
      </aside>

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0 ml-64 z-10">
        {/* Navbar Fallback - Warning Layout */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-error-bg border-error-border sticky top-0 backdrop-blur-xl z-20 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-error-accent animate-ping" />
            <p className="text-xs font-semibold text-slate-300">
              Sistem Tata Letak (Layout MFE) gagal dimuat di sisi klien.
            </p>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-1.5 bg-error-accent hover:bg-error-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-error-accent/20 flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Muat Ulang Halaman
            </button>
          )}
        </header>

        {/* Content Body where children render */}
        <main className="flex-1 p-8 overflow-y-auto relative bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
