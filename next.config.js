const NextFederationPlugin = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:3341 http://localhost:3342 http://localhost:3343 http://localhost:3344 http://localhost:3345; connect-src 'self' http://localhost:3341 http://localhost:3342  http://localhost:3344 http://localhost:3343 http://localhost:3345 http://localhost:8080; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:3344 http://localhost:3342 http://localhost:3343 http://localhost:3345; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-ancestors 'none'; object-src 'none';",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            shared_remote:
              "shared_remote@http://localhost:3342/_next/static/chunks/remoteEntry.js",
            auth_remote:
              "auth_remote@http://localhost:3343/_next/static/chunks/remoteEntry.js",
            dashboard_remote:
              "dashboard_remote@http://localhost:3344/_next/static/chunks/remoteEntry.js",
            layout_remote:
              "layout_remote@http://localhost:3345/_next/static/chunks/remoteEntry.js",
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            "react-dom": { singleton: true, requiredVersion: false },
            "@reduxjs/toolkit": { singleton: true },
            "react-redux": { singleton: true },
            "@tanstack/react-query": { singleton: true },
            "@radix-ui/react-tooltip": { singleton: true },
            "@radix-ui/react-slot": { singleton: true },
          },
        }),
      );
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        "shared_remote/Skeleton": path.resolve(
          __dirname,
          "../neocentra-bank-shared/src/components/ui/skeleton.tsx",
        ),
        "shared_remote/useRemoteCSS": path.resolve(
          __dirname,
          "../neocentra-bank-shared/src/hooks/useRemoteCSS.ts",
        ),
      };
      config.externals = [
        ...(config.externals || []),
        {
          "shared_remote/store": "commonjs shared_remote/store",
          "shared_remote/Button": "commonjs shared_remote/Button",
          "shared_remote/Input": "commonjs shared_remote/Input",
          "shared_remote/apiHelper": "commonjs shared_remote/apiHelper",
          "shared_remote/globalNavigaton":
            "commonjs shared_remote/globalNavigaton",
          "shared_remote/AuthWrapper": "commonjs shared_remote/AuthWrapper",
          "shared_remote/Tooltip": "commonjs shared_remote/Tooltip",
          "auth_remote/Login": "commonjs auth_remote/Login",
          "auth_remote/VerifyOtp": "commonjs auth_remote/VerifyOtp",
          "auth_remote/Logout": "commonjs auth_remote/Logout",
          "dashboard_remote/Dashboard": "commonjs dashboard_remote/Dashboard",
          "layout_remote/Layout": "commonjs layout_remote/Layout",
          "layout_remote/Header": "commonjs layout_remote/Header",
          "layout_remote/Sidebar": "commonjs layout_remote/Sidebar",
        },
      ];
    }
    return config;
  },
};
