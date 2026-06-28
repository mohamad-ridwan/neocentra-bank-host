import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const MfeProviders = dynamic(() => import("@/components/MfeProviders"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

  return (
    <MfeProviders>
      <Component {...pageProps} />
    </MfeProviders>
  );
}

