const path = require('path');

module.exports = function override(config, env) {
  // 웹팩 설정 수정
  config.resolve.alias = {
    ...config.resolve.alias,
    '@font': path.resolve(__dirname, 'src/fonts'),
    '@images': path.resolve(__dirname, 'public/assets/images'),
    '@layout': path.resolve(__dirname, 'src/pages/antDesign/comp/layout'),
  };

  // 필요한 다른 웹팩 설정 추가

  return config;
};
