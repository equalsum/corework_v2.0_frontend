import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';

const CustomDropdown = ({
  items = [],
  placement = 'bottomRight',
  triggerType = ['click'],
  className = '',
  size = 'medium',
  labelText = '멤버',
  SecLabelText = '명',
  icon = null, // 커스텀 아이콘
  disabled = false, // 드롭다운 비활성화 여부
  overlayStyle = {}, // 오버레이 스타일
  buttonStyle = {}, // 버튼 스타일
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onOpenChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = items.map((item) => ({
    key: item.value,
    label: item.label,
    onClick: item.onClick,
  }));

  const sizeStyles = {
    small: { width: '10rem', maxHeight: '10rem' },
    medium: { width: '12rem', maxHeight: '12rem' },
    large: { width: '17rem', maxHeight: '17rem' },
  };

  const dropdownStyle = { ...(sizeStyles[size] || sizeStyles.medium), ...overlayStyle };

  return (
    <Dropdown
      menu={{
        items: menuItems,
        className: `${className}`,
        style: dropdownStyle,
      }}
      placement={placement}
      trigger={triggerType}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      <p className="team-members" style={{ ...buttonStyle, cursor: disabled ? 'not-allowed' : 'pointer' }}>
        {icon || <UserOutlined />} {/* 커스텀 아이콘 또는 기본 아이콘 */}
        {labelText}{' '}
        <span>
          {items.length} {SecLabelText}{' '}
        </span>
        {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
      </p>
    </Dropdown>
  );
};

export default CustomDropdown;
