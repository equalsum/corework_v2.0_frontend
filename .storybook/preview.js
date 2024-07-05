import React from 'react';
import { ConfigProvider } from 'antd';
import '../src/scss/ui.scss'; // 프로젝트의 전역 스타일을 가져옵니다.

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      state: 'open',
    },
  },
};

export const decorators = [
  (Story) => (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0388A6',
          colorLink: 'blue',
          colorSuccess: 'skyblue',
          colorWarning: 'darkred',
          colorError: 'red',
          colorBgLayout: '#EBF9FF',
        },
      }}
    >
      <div className='wrap'>
        <Story />
      </div>
    </ConfigProvider>
  ),
];
