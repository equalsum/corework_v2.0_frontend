import React, { useState } from 'react';
import {
  ApartmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MyCheckinPage from '../pages/mycheckin/MyCheckinPage';
import UserListPage from '../pages/user/UserListPage';
import TeamListPage from '../pages/team/TeamListPage';
import LoginPage from '../pages/login/LoginPage';
import { requestAxios } from '../api/Axios';
import URL from 'constants/url';

// 퍼블리싱 파일 라우터 셋팅
import Guide from 'pages/guide/Guide';
import Orgchart01 from 'pages/publishing/pages/orgchart/Orgchart01';
import Orgchart02 from 'pages/publishing/pages/orgchart/Orgchart02';
import Orgchart03 from 'pages/publishing/pages/orgchart/Orgchart03';
import Orgchart04 from 'pages/publishing/pages/orgchart/Orgchart04';
import Orgchart05 from 'pages/publishing/pages/orgchart/Orgchart05';
import Orgchart06 from 'pages/publishing/pages/orgchart/Orgchart06';
import Orgchart08 from 'pages/publishing/pages/orgchart/Orgchart08';
import Orgchart09 from 'pages/publishing/pages/orgchart/Orgchart09';
import Orgchart10 from 'pages/publishing/pages/orgchart/Orgchart10';
import Orgchart11 from 'pages/publishing/pages/orgchart/Orgchart11';

const { Header, Sider, Content } = Layout;

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to={URL.LOGIN} replace />;
};

const RootRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate(URL.MYCHECKIN);
  };

  const handleLogout = async () => {
    requestAxios(
      '/logout1',
      { method: 'POST' },
      (response) => {
        console.log('Logged out successfully');
        localStorage.removeItem('isAuthenticated');
        navigate(URL.LOGIN);
      },
      (error) => {
        console.error('There was an error logging out:', error);
      }
    );
  };

  return (
    <Routes>
      {/* 인증이 필요하지 않은 라우트 */}
      <Route path={URL.LOGIN} element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/Orgchart01" element={<Orgchart01 />} />
      <Route path="/Orgchart02" element={<Orgchart02 />} />
      <Route path="/Orgchart03" element={<Orgchart03 />} />
      <Route path="/Orgchart04" element={<Orgchart04 />} />
      <Route path="/Orgchart05" element={<Orgchart05 />} />
      <Route path="/Orgchart06" element={<Orgchart06 />} />
      <Route path="/Orgchart08" element={<Orgchart08 />} />
      <Route path="/Orgchart09" element={<Orgchart09 />} />
      <Route path="/Orgchart10" element={<Orgchart10 />} />
      <Route path="/Orgchart11" element={<Orgchart11 />} />
      <Route path="/guide/*" element={<Guide />} /> {/* Guide 라우트 추가 */}
      {/* 인증이 필요한 라우트 */}
      <Route
        element={
          <PrivateRoute>
            <Layout style={{ minHeight: '100vh' }}>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={[URL.MYCHECKIN]}
                  selectedKeys={[window.location.pathname]}
                  onClick={({ key }) => navigate(key)}
                  items={[
                    {
                      key: URL.MYCHECKIN,
                      icon: <HomeOutlined />,
                      label: '마이체크인',
                    },
                    {
                      key: URL.USER,
                      icon: <TeamOutlined />,
                      label: '사용자 리스트',
                    },
                    {
                      key: URL.TEAM,
                      icon: <ApartmentOutlined />,
                      label: '팀 리스트',
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
                    <Route path={URL.MYCHECKIN} element={<MyCheckinPage />} />
                    <Route path={URL.USER} element={<UserListPage />} />
                    <Route path={URL.TEAM} element={<TeamListPage />} />
                    <Route path="*" element={<Navigate to={URL.MYCHECKIN} replace />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </PrivateRoute>
        }
      />
      {/* 기본 리디렉션 */}
      <Route path="*" element={<Navigate to={URL.LOGIN} replace />} />
    </Routes>
  );
};

export default RootRoutes;
