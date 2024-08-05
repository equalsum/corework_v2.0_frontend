import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

import './css/component.css';
import './css/layout.css';
import './css/page.css';
import './scss/ui.scss';

import {
  ApartmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import MyCheckinPage from './pages/mycheckin/MyCheckinPage';
import TeamListPage from './pages/team/TeamListPage';
import UserListPage from './pages/user/UserListPage';
import { getSessionItem, setSessionItem } from 'utils/storage';

// 퍼블리싱 파일 라우터 셋팅
import Guide from 'pages/guide/Guide';
import Orgchart01 from 'pages/publishing/pages/orgchart/Orgchart01';
import Orgchart02 from 'pages/publishing/pages/orgchart/Orgchart02';
import Orgchart03 from 'pages/publishing/pages/orgchart/Orgchart03';
import Orgchart04 from 'pages/publishing/pages/orgchart/Orgchart04';
import Orgchart05 from 'pages/publishing/pages/orgchart/Orgchart05';
import Orgchart06 from 'pages/publishing/pages/orgchart/Orgchart06';
import Orgchart07 from 'pages/publishing/pages/orgchart/Orgchart07';
import Orgchart08 from 'pages/publishing/pages/orgchart/Orgchart08';
import Orgchart09 from 'pages/publishing/pages/orgchart/Orgchart09';
import Orgchart10 from 'pages/publishing/pages/orgchart/Orgchart10';
import Menage01 from 'pages/publishing/pages/menage/Menage01';
import Menage02 from 'pages/publishing/pages/menage/Menage02';
import GoogleSsoRedirectHandler from "./components/login/GoogleSsoRedirectHandler";
// import Menage03 from 'pages/publishing/pages/menage/Menage03';

const { Header, Sider, Content } = Layout;

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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/mycheckin');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setSessionItem('loginUser', { id: '' });
      setSessionItem('jToken', null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (getSessionItem('jToken') == null) {
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
        <button onClick={toggleDarkMode} className="theme-toggle">
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </button>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/Orgchart01" element={<Orgchart01 />} />
          <Route path="/Orgchart02" element={<Orgchart02 />} />
          <Route path="/Orgchart03" element={<Orgchart03 />} />
          <Route path="/Orgchart04" element={<Orgchart04 />} />
          <Route path="/Orgchart05" element={<Orgchart05 />} />
          <Route path="/Orgchart06" element={<Orgchart06 />} />
          <Route path="/Orgchart07" element={<Orgchart07 />} />
          <Route path="/Orgchart08" element={<Orgchart08 />} />
          <Route path="/Orgchart09" element={<Orgchart09 />} />
          <Route path="/Orgchart10" element={<Orgchart10 />} />
          <Route path="/Menage01" element={<Menage01 />} />
          <Route path="/Menage02" element={<Menage02 />} />
          {/* <Route path="/Menage03" element={<Menage03 />} /> */}
          {/* <Route path="/Menage04" element={<Menage04 />} /> */}
          <Route path="/permission-google-sso" element={<GoogleSsoRedirectHandler />} />
        </Routes>
      </ConfigProvider>
    );
  }

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
          {/* <RootRoutes /> */}
          <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/mycheckin']}
                selectedKeys={[window.location.pathname]}
                onClick={({ key }) => navigate(key)}
                items={[
                  {
                    key: '/mycheckin',
                    icon: <HomeOutlined />,
                    label: '마이체크인',
                  },
                  {
                    key: '/userlist',
                    icon: <TeamOutlined />,
                    label: '사용자 리스트',
                  },
                  {
                    key: '/teamlist',
                    icon: <ApartmentOutlined />,
                    label: '팀 리스트',
                  },
                  {
                    key: '/guide',
                    label: '가이드 페이지',
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Routes>
                  <Route path="/mycheckin" element={<MyCheckinPage />} />
                  <Route path="/userlist" element={<UserListPage />} />
                  <Route path="/teamlist" element={<TeamListPage />} />
                  <Route path="/" element={<Navigate to="/mycheckin" replace />} />
                  <Route path="/guide/*" element={<Guide />} /> {/* Guide 라우트 추가 */}
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  );
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.REACT_APP_EGOV_CONTEXT_URL', process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
