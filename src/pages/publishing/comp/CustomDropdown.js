import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const CustomDropdown = ({
  items = [],
  placement = 'bottomRight',
  triggerType = ['click'],
  className = '',
  size = 'medium',
  children,
  onOpenChange,
  labelText = '멤버',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleVisibleChange = (visible) => {
    setIsDropdownOpen(visible);
  };

  const menuItems = items.map((item) => ({
    key: item.value,
    label: item.label,
    onClick: item.onClick,
  }));

  // 크기에 따른 스타일 정의 (rem 단위 사용)
  const sizeStyles = {
    small: { width: '10rem', maxHeight: '10rem' },
    medium: { width: '12rem', maxHeight: '12rem' },
    large: { width: '17rem', maxHeight: '17rem' },
  };

  const dropdownStyle = sizeStyles[size] || sizeStyles.medium;

  // 기본 트리거 엘리먼트
  const defaultTrigger = (
    <p className="team-members">
      {labelText} <span>{items.length}명</span>
      {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
    </p>
  );

  return (
    <Dropdown
      menu={{
        items: menuItems,
        className: `${className}`,
        style: dropdownStyle,
      }}
      placement={placement}
      trigger={triggerType}
      onOpenChange={handleVisibleChange}
    >
      {children || defaultTrigger}
    </Dropdown>
  );
};

export default CustomDropdown;
