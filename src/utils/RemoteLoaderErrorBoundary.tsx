import React, { useState, useEffect } from "react";

interface RemoteBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode | ((errorUrl: string) => React.ReactNode);
  /**
   * Menggunakan URL remote atau port sebagai keyword unik.
   * Contoh: 'localhost:3344' atau 'http://microfrontend.com'
   */
  remoteUrl: string;
}

export default function RemoteModuleBoundary({
  children,
  fallback,
  remoteUrl,
}: RemoteBoundaryProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleScriptError = (event: ErrorEvent) => {
      const target = event.target as HTMLElement;

      // Deteksi kegagalan injeksi tag <script> oleh Webpack/Module Federation
      if (target && target.tagName === "SCRIPT") {
        const scriptSrc = (target as HTMLScriptElement).src || "";

        // Cek apakah skrip yang gagal cocok dengan URL remote yang dijaga komponen ini
        if (scriptSrc.includes(remoteUrl)) {
          console.error(
            `[RemoteBoundary] Gagal memuat modul spesifik dari: ${scriptSrc}`,
          );
          setFailedUrl(scriptSrc);
        }
      }
    };

    // Gunakan useCapture (true) karena error resource tidak melakukan bubbling
    window.addEventListener("error", handleScriptError, true);

    return () => {
      window.removeEventListener("error", handleScriptError, true);
    };
  }, [remoteUrl]);

  if (failedUrl) {
    if (typeof fallback === "function") {
      return <>{fallback(failedUrl)}</>;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
