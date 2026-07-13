import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ConnectionErrorCardProps {
  title?: string;
  description?: string;
  error?: Error | string | null;
  onRetry?: () => void;
  retryText?: string;
}

export default function ConnectionErrorCard({
  title = "Remote Module Connection Failed",
  description = "The application encountered an issue while loading this micro frontend component. This usually happens when the remote server is offline or experiencing network latency.",
  error,
  onRetry,
  retryText = "Retry Connection",
}: ConnectionErrorCardProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-slate-950 rounded-2xl border border-red-500/20 shadow-2xl relative overflow-hidden font-sans w-full">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 border border-red-500/20 animate-pulse">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-xl font-extrabold text-white tracking-tight">
        {title}
      </h2>

      <p className="text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
        {description}
      </p>

      {errorMessage && (
        <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl max-w-lg text-left overflow-x-auto w-full">
          <p className="text-xs font-mono text-red-400 break-all whitespace-pre-wrap">
            {errorMessage}
          </p>
        </div>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          {retryText}
        </button>
      )}
    </div>
  );
}
