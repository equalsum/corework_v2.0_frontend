import React, { useState, useEffect } from 'react';
import sidebarMenu from 'constants/sidebarMenu';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(sidebarMenu[0].id);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    // Set the first submenu as active by default
    if (sidebarMenu[0].submenu && sidebarMenu[0].submenu.length > 0) {
      setActiveSubmenu(sidebarMenu[0].submenu[0].title);
    }
  }, []);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // Reset active submenu when changing main menu
    const clickedMenu = sidebarMenu.find((menu) => menu.id === menuId);
    if (clickedMenu.submenu && clickedMenu.submenu.length > 0) {
      setActiveSubmenu(clickedMenu.submenu[0].title);
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (submenuTitle) => {
    setActiveSubmenu(submenuTitle);
  };

  return (
    <aside className="admin-sidebar">
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

      <div className="admin-sidebar-content">
        <nav className="main-nav">
          {activeMenu && (
            <ul>
              <li className="first">설정</li>
              {sidebarMenu
                .find((menu) => menu.id === activeMenu)
                ?.submenu.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#none"
                      onClick={() => handleSubmenuClick(item.title)}
                      className={activeSubmenu === item.title ? 'active' : ''}
                    >
                      <span>{item.title}</span>
                    </a>
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
