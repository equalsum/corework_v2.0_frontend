import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const CustomDropdown = ({
  items = [],
  placement = 'bottomRight',
  triggerType = ['click'],
  className = '',
  size = 'medium',
  labelText = '멤버',
  SecLabelText = '명',
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

  // 크기에 따른 스타일 정의 (rem 단위 사용)
  const sizeStyles = {
    small: { width: '10rem', maxHeight: '10rem' },
    medium: { width: '12rem', maxHeight: '12rem' },
    large: { width: '17rem', maxHeight: '17rem' },
  };

  const dropdownStyle = sizeStyles[size] || sizeStyles.medium;

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
    >
      <p className="team-members">
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
