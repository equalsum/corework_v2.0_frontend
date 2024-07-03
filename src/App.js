import RootRoutes from './routes';
import { ConfigProvider } from 'antd';
import React from 'react';

import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './scss/ui.scss';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0388A6',
          colorLink: 'blue',
          colorSuccess: 'skyblue',
          colorWarning: 'darkred',
          colorError: '#FF4D4F',
          colorBgLayout: '#EBF9FF',
        },
      }}
    >
      <div className="wrap">
        <RootRoutes />
      </div>
    </ConfigProvider>
  );
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.REACT_APP_EGOV_CONTEXT_URL', process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
