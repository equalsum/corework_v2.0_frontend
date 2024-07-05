const path = require('path');

module.exports = function override(config, env) {
  // 경로 별칭 설정
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@font': path.resolve(__dirname, 'src/fonts'),
    '@images': path.resolve(__dirname, 'public/assets/images'),
    '@layout': path.resolve(__dirname, 'src/pages/publishing/comp/layout'),
  };

  return config;
};
