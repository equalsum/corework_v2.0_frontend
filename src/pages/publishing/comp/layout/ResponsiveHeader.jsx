import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Input, FloatButton } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const ResponsiveHeader = ({
  title,
  menuItems,
  primaryAction,
  secondaryActions,
  searchPlaceholder,
  onSearch,
  mobileBreakpoint = 992,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileBreakpoint);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= mobileBreakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint]);

  const menu = (
    <Menu>
      {menuItems.map((item, index) => (
        <Menu.Item key={index} icon={<i className={item.icon} />} onClick={item.onClick}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <header className="responsive-header flex jcb aic">
        {isMobile ? (
          <>
            <div className="mobile-actions">
              <Dropdown overlay={menu} trigger={['click']}>
                <Button size="large" type="default" icon={<DownOutlined />}>
                  {title}
                </Button>
              </Dropdown>
              <Button
                size="large"
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>
            {showSearch && (
              <div className="search-container">
                <Search
                  placeholder={searchPlaceholder}
                  allowClear
                  enterButton="검색"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="left-actions flex aic gap8">
              {secondaryActions.map((action, index) => (
                <Button key={index} size="large" type={action.type} onClick={action.onClick}>
                  <i className={action.icon}></i> {action.label}
                </Button>
              ))}
            </div>
            <div className="right-actions flex aic gap16">
              <Search
                placeholder={searchPlaceholder}
                allowClear
                prefix={<i className="icon-search" style={{ marginRight: 8 }} />}
                enterButton={
                  <Button type="primary" size="large">
                    검색
                  </Button>
                }
                size="large"
                onSearch={onSearch}
              />
            </div>
          </>
        )}
      </header>
      {isMobile && primaryAction && (
        <FloatButton
          icon={primaryAction.icon}
          type="primary"
          style={{ right: 24, bottom: 24 }}
          tooltip={primaryAction.label}
          onClick={primaryAction.onClick}
        />
      )}
    </>
  );
};

export default ResponsiveHeader;
