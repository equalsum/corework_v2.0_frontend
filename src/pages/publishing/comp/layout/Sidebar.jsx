import React, { useState, useEffect } from 'react';
import sidebarMenu from 'constants/sidebarMenu';
import { Link } from 'react-router-dom';

const SideBar = () => {
  // 상태 관리: 활성 메뉴와 서브메뉴
  const [activeMenu, setActiveMenu] = useState(sidebarMenu[0].id);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    // 초기 로드 시 첫 번째 서브메뉴를 기본적으로 활성화
    if (sidebarMenu[0].submenu && sidebarMenu[0].submenu.length > 0) {
      setActiveSubmenu(sidebarMenu[0].submenu[0].title);
    }
  }, []);

  // 메인 메뉴 클릭 핸들러
  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // 메인 메뉴 변경 시 서브메뉴 초기화
    const clickedMenu = sidebarMenu.find((menu) => menu.id === menuId);
    if (clickedMenu.submenu && clickedMenu.submenu.length > 0) {
      setActiveSubmenu(clickedMenu.submenu[0].title);
    } else {
      setActiveSubmenu(null);
    }
  };

  // 서브메뉴 클릭 핸들러
  const handleSubmenuClick = (submenuTitle) => {
    setActiveSubmenu(submenuTitle);
  };

  return (
    <aside className="admin-sidebar">
      {/* 왼쪽 사이드바: 메인 메뉴 버튼 */}
      <div className="admin-sidebar-left-menu">
        <div className="admin-sidebar-top">
          <div className="square-button">1</div>
          <nav className="nav-buttons">
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
          </nav>
        </div>
        <div className="admin-sidebar-bottom">
          <div className="profile-icon"></div>
        </div>
      </div>

      {/* 오른쪽 사이드바: 서브메뉴 및 서브-서브메뉴 */}
      <div className="admin-sidebar-content">
        <nav className="main-nav">
          {activeMenu && (
            <ul>
              <li className="first">설정</li>
              {sidebarMenu
                .find((menu) => menu.id === activeMenu)
                ?.submenu.map((item, idx) => (
                  <li key={idx}>
                    {/* 서브메뉴 아이템 */}
                    <a
                      href="#none"
                      onClick={() => handleSubmenuClick(item.title)}
                      className={activeSubmenu === item.title ? 'active' : ''}
                    >
                      <span>{item.title}</span>
                    </a>
                    {/* 서브-서브메뉴 (있는 경우에만 렌더링) */}
                    {item.subSubmenu && activeSubmenu === item.title && (
                      <ul className="submenu">
                        {item.subSubmenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link to={subItem.path}>
                              <span>{subItem.title}</span>
                            </Link>
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
    </aside>
  );
};

export default SideBar;
