import React from 'react';
import { Layout } from 'antd';
// import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

const AdminLayout = ({ breadcrumbItems, children , pageClass  }) => {
  function adjustSidebarHeight() {
    const $mainNav = document.querySelector('.main-nav');
    const $leftMenu = document.querySelector('.admin-sidebar-left-menu');
    const $sideCnt = document.querySelector('.admin-sidebar-content');

    $leftMenu.style.minHeight = `${$mainNav.clientHeight + 50}px`;
    $sideCnt.style.minHeight = `${$mainNav.clientHeight + 50}px`;
  }

  // 페이지 로드 시 실행
  window.addEventListener('load', adjustSidebarHeight);

  // 창 크기가 변경될 때마다 실행
  window.addEventListener('resize', adjustSidebarHeight); 

  return (
    <Layout className={`admin-layout ${pageClass}`}>
      {/* Header */}

      {/* <Header className='admin-header' /> */}
      {/* Header EEE */}

      <div className='admin-body-container'>
        {/* SideBar */}
        <Sidebar className='admin-sidebar' />
        {/* SideBar EEE */}

        {/* Content */}
        <div className='admin-content-wrapper'>
          <Breadcrumb breadcrumbItems={breadcrumbItems} className='admin-breadcrumb' />
          {/* 메인 콘텐츠가 여기에 들어갑니다 */}
          <div className='admin-main-content'>{children}</div>
          {/* 메인 콘텐츠가 여기에 들어갑니다 EEE */}
        </div>
        {/* Content EEE */}
      </div>
    </Layout>
  );
};

export default AdminLayout;
