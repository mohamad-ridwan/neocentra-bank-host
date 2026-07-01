import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useRemoteCSS } from "@/hooks/useRemoteCSS";

const MfeProviders = dynamic(() => import("@/components/MfeProviders"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const SHARED_MFE_URL =
    process.env.NEXT_PUBLIC_SHARED_URL || "http://localhost:3342";

  const { loaded, error } = useRemoteCSS(
    SHARED_MFE_URL,
    "shared_remote",
    "./Button",
  );

  useEffect(() => {
    // Sync the host router instance to the shared module scope
    import("shared_remote/globalNavigaton")
      .then(({ registerHostRouter }) => {
        registerHostRouter((url, as, options) => router.push(url, as, options));
      })
      .catch((err) => {
        console.error("Failed to load registerHostRouter:", err);
      });
  }, [router]);

  const showContent = loaded || error;

  return (
    <MfeProviders>
      {showContent ? (
        <Component {...pageProps} />
      ) : (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-sans">
          Loading resources...
        </div>
      )}
    </MfeProviders>
  );
}


