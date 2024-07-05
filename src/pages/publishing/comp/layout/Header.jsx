import React from 'react';
import { Button, Avatar } from 'antd';
import { MailOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';

const Header = ({ showDrawer }) => {
  return (
    <div className='main-header'>
      <div style={{ float: 'left', margin: '16px 24px 16px 0' }}>로고</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button icon={<MailOutlined />} style={{ marginRight: 16 }}>
          이메일
        </Button>
        <Button icon={<BellOutlined />} style={{ marginRight: 16 }}>
          알림
        </Button>
        <Avatar style={{ backgroundColor: '#87d068', marginRight: 8 }}>MK</Avatar>
        <span>진미경</span>
        <Button style={{ marginLeft: 16 }}>로그아웃</Button>
        <Button icon={<MenuOutlined />} style={{ marginLeft: 16 }} onClick={showDrawer} />
      </div>
    </div>
  );
};

export default Header;
