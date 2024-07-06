import RootRoutes from './routes';
import { ConfigProvider, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './scss/ui.scss';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    // 다크 모드 상태에 따라 body에 클래스 추가/제거
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#0388A6',
          colorLink: isDarkMode ? '#4BB5FF' : 'blue',
          colorSuccess: isDarkMode ? '#52C41A' : 'skyblue',
          colorWarning: isDarkMode ? '#FAAD14' : 'darkred',
          colorWarningBg: isDarkMode ? '#2B2111' : '#FFF2F0',
          colorError: '#FF4D4F',
          colorBgLayout: isDarkMode ? '#141414' : '#EBF9FF',
          tooltipArrowBg: '#0388A6',
        },
      }}
    >
      <div className={`wrap ${isDarkMode ? 'dark-mode' : ''}`}>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </button>
        <div className="content-area">
          <RootRoutes />
        </div>
      </div>
    </ConfigProvider>
  );
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.REACT_APP_EGOV_CONTEXT_URL', process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
