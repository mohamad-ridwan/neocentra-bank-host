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
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
            '@reduxjs/toolkit': { singleton: true },
            'react-redux': { singleton: true },
            '@tanstack/react-query': { singleton: true },
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
        }
      ];
    }
    return config;
  },
};
