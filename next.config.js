const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            shared_remote: 'shared_remote@http://localhost:3342/_next/static/chunks/remoteEntry.js',
            auth_remote: 'auth_remote@http://localhost:3343/_next/static/chunks/remoteEntry.js',
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
            '@reduxjs/toolkit': { singleton: true },
            'react-redux': { singleton: true },
            '@tanstack/react-query': { singleton: true },
            '@radix-ui/react-tooltip': { singleton: true },
            '@radix-ui/react-slot': { singleton: true },
          },
        })
      );
    } else {
      config.externals = [
        ...(config.externals || []),
        {
          'shared_remote/store': 'commonjs shared_remote/store',
          'shared_remote/Button': 'commonjs shared_remote/Button',
          'shared_remote/Input': 'commonjs shared_remote/Input',
          'shared_remote/apiHelper': 'commonjs shared_remote/apiHelper',
          'shared_remote/AuthWrapper': 'commonjs shared_remote/AuthWrapper',
          'shared_remote/Tooltip': 'commonjs shared_remote/Tooltip',
          'auth_remote/Login': 'commonjs auth_remote/Login',
          'auth_remote/VerifyOtp': 'commonjs auth_remote/VerifyOtp',
          'auth_remote/Logout': 'commonjs auth_remote/Logout',
        }
      ];
    }
    return config;
  },
};
