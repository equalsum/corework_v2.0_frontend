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
import Orgchart07 from 'pages/publishing/pages/orgchart/Orgchart07';
import Orgchart08 from 'pages/publishing/pages/orgchart/Orgchart08';
import Orgchart09 from 'pages/publishing/pages/orgchart/Orgchart09';
import Orgchart10 from 'pages/publishing/pages/orgchart/Orgchart10';
import Menage01 from 'pages/publishing/pages/menage/Menage01';
import Menage02 from 'pages/publishing/pages/menage/Menage02';
import Menage03 from 'pages/publishing/pages/menage/Menage03';
// import Menage04 from 'pages/publishing/pages/menage/Menage04';
// import Menage05 from 'pages/publishing/pages/menage/Menage05';
// import Menage06 from 'pages/publishing/pages/menage/Menage06';
// import Menage07 from 'pages/publishing/pages/menage/Menage07';
// import Menage08 from 'pages/publishing/pages/menage/Menage08';
// import Menage09 from 'pages/publishing/pages/menage/Menage09';

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
      <Route path="/Orgchart07" element={<Orgchart07 />} />
      <Route path="/Orgchart08" element={<Orgchart08 />} />
      <Route path="/Orgchart09" element={<Orgchart09 />} />
      <Route path="/Orgchart10" element={<Orgchart10 />} />
      <Route path="/Menage01" element={<Menage01 />} />
      <Route path="/Menage02" element={<Menage02 />} />
      <Route path="/Menage03" element={<Menage03 />} />
      {/* <Route path="/Menage04" element={<Menage04 />} /> */}
      <Route path="/guide/*" element={<Guide />} /> {/* Guide 라우트 추가 */}
    </Routes>
  );
};

export default RootRoutes;
