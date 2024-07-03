import React, { useState } from 'react';
import sidebarMenu from 'constants/sidebarMenu'; // 메뉴 가져오기

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId === activeMenu ? null : menuId);
  };

  return (
    <aside className='admin-sidebar'>
      {/* 왼쪽 대메뉴 */}
      <div className='admin-sidebar-left-menu'>
        <div className='admin-sidebar-top'>
          <div className='square-button'>1</div>
          <nav className='nav-buttons'>
         {/* 1Depth 메뉴 */}
          {sidebarMenu.map((item) => (
            <button
              className={`nav-button ${activeMenu === item.id ? 'active' : ''}`}
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className={item.icon}></span>
              <span>{item.title}</span>
            </button>
          ))}
          {/* 1Depth 메뉴 EEE */}
          </nav>
        </div>

        {/* 프로필 */}
        <div className='admin-sidebar-bottom'>
          <div className='profile-icon'>{/* <img src='profile-image.jpg' alt='Profile' /> */}</div>
        </div>
        {/* 프로필 EEE  */}

      </div>
      {/* 왼쪽 대메뉴 EEE */}

      {/* 메뉴 2Depth , 3Depth */}
      <div className='admin-sidebar-content'>
        <nav className='main-nav'>
          {activeMenu && (
            <ul>
              <li className='first'>설정</li>
              {sidebarMenu
                .find((menu) => menu.id === activeMenu)
                ?.submenu.map((item, idx) => (
                  // 2Depth 메뉴
                  <li key={idx}>
                    <a href='#none'>
                      <span>{item.title}</span>
                    </a>
                    {/* // 3Depth 메뉴 */}
                    {item.subSubmenu && (
                      <ul className='submenu'>
                        {item.subSubmenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <a href='#none'>
                              <span>{subItem.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </nav>
      </div>
      {/* 메뉴 2Depth , 3Depth EEE */}
    </aside>
  );
};

export default SideBar;
